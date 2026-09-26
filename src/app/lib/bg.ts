/// <reference types="@webgpu/types" />

// 🟦 Shaders
const vertWgsl = `
struct VSOut {
    @builtin(position) Position: vec4<f32>,
    @location(0) color: vec3<f32>,
    @location(1) uv: vec2<f32>
};

@vertex
fn main(@location(0) inPos: vec3<f32>) -> VSOut {
    var vsOut: VSOut;
    vsOut.Position = vec4<f32>(inPos, 1.0);
    vsOut.uv = (inPos.xy * 0.5) + vec2<f32>(0.5, 0.5);
    vsOut.color = vec3<f32>(inPos.x+1, inPos.y+1, 1);
    return vsOut;
}`
const fragWgsl = `

struct Uniforms {
    colorChangeMatrix: vec3<f32>,
    time: f32,
}

@binding(0) @group(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var<uniform> mousePos : vec4<f32>;

fn getRed(pos: vec3<f32>) -> f32 {
    let ans = f32(0.70 + 0.30*cos(((pos.x*pos.x)-(pos.y*pos.y)) + uniforms.colorChangeMatrix.x * 20));
    return ans;
}

fn getGreen(pos: vec3<f32>) -> f32 {
    let ans = f32(0.70 + 0.30*sin((pos.x*pos.x*cos(uniforms.colorChangeMatrix.x * 20/4)) + (pos.y*pos.y*sin(uniforms.colorChangeMatrix.x*20/2))));
    return ans;
}

fn getBlue(pos: vec3<f32>) -> f32 {
    let ans = f32(0.70 + 0.30*sin((5*sin(uniforms.colorChangeMatrix.x*20/9))+ ((pos.x*pos.x)+(pos.y*pos.y))/1));
    return ans;
}

fn animatedDither(pos: vec2<f32>, time: f32) -> f32 {
    return fract(sin(dot(pos.xy + time ,vec2<f32>(12.9898,78.233))) * 43758.5453);
}

fn getMouseDist(uv: vec2<f32>) -> f32 {
    let dx = (uv.x-mousePos.x)*mousePos.z;
    let dy = (uv.y-mousePos.y);
    return sqrt(dx*dx + dy*dy);
}

@fragment
fn main(@location(0) inColor: vec3<f32>,
        @location(1) uv: vec2<f32>) -> @location(0) vec4<f32> {

    let baseColor = vec3<f32>(
        getRed(inColor),
        getGreen(inColor),
        getBlue(inColor)
    );
    let dist = getMouseDist(uv);
    let pulses = array<vec4<f32>, 3>(
        vec4<f32>(0.0,  2.0, 8.0, 3.0),
        vec4<f32>(0.3,  2.5, 4.0, 4.0),
        vec4<f32>(0.6,  3.0,  3.0, 5.0)
    );
    var wave: f32 = 0.0;
    let wavenoise = sin(uv.x * 50.0 + uniforms.time * 2.0) * sin(uv.y * 50.0 + uniforms.time * 1.5);
    let deform = 1.0 + 0.15 * wavenoise;
    let distortedDist = dist * deform;
    for (var i = 0u; i < 3u; i = i + 1u) {
        let p = pulses[i];
        // t_p = normalized time since this pulse “fired”
        let t_p = uniforms.time * p.y - p.x;
        // only contribute when t_p > d (wavefront has passed)
        if (t_p > distortedDist) {
            let phase = (distortedDist * p.z) - (uniforms.time * p.y);
            let envelope = exp(-distortedDist * p.w);
            wave = wave + sin(phase) * envelope;
        }
    }
    let noise = animatedDither(inColor.xy, uniforms.time) * 0.05; // small noise

    let finalColor = mix(baseColor, vec3<f32>(0.3, 0.6, 0.9) * wave, 0.1) + noise;
    return vec4<f32>(finalColor, 1.0);
}`

const positions = new Float32Array([
    1.0, 1.0, 0.0,
    -1.0, 1.0, 0.0,
    1.0, -1.0, 0.0,
    -1.0, -1.0, 0.0
]);

class Renderer {
    canvas: HTMLCanvasElement;

    // API Data Structure
    adapter: GPUAdapter | null = null;
    device!: GPUDevice;
    queue!: GPUQueue;

    // Frame Backings
    context: GPUCanvasContext | null = null;
    canvasFormat!: GPUTextureFormat;
    colorTexture!: GPUTexture;
    colorTextureView!: GPUTextureView;

    // Bing Group
    uniformBindGroup!: GPUBindGroup;

    // Resources
    uniformBuffer!: GPUBuffer;
    mouseMovementBuffer!: GPUBuffer;
    positionBuffer!: GPUBuffer;
    vertModule!: GPUShaderModule;
    fragModule!: GPUShaderModule;
    pipeline!: GPURenderPipeline;

    startTime: number;
    mouse: [number, number];

    commandEncoder!: GPUCommandEncoder;
    passEncoder!: GPURenderPassEncoder;

    private animationFrameId: number | null = null;
    private isDestroyed = false;
    private needsResize = true;
    private resizeObserver: ResizeObserver;
    private readonly colorUniformData = new Float32Array(4);
    private readonly mouseUniformData = new Float32Array(4);
    private readonly onResize = () => {
        this.needsResize = true;
        // Reduced motion only draws one frame, so redraw it at the new size.
        if (this.reducedMotion && this.animationFrameId === null && !this.isDestroyed) {
            this.animationFrameId = requestAnimationFrame(this.render);
        }
    };
    private readonly onVisibilityChange = () => {
        if (!document.hidden && !this.isDestroyed && this.animationFrameId === null) {
            this.render();
        }
    };
    private onMouseMove?: (event: MouseEvent) => void;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.startTime = 0;
        this.resizeObserver = new ResizeObserver(this.onResize);
        this.resizeObserver.observe(this.canvas);
        window.addEventListener("resize", this.onResize);
        document.addEventListener("visibilitychange", this.onVisibilityChange);

        let mouse = this.mouse = [0.5, 0.5];
        let lastUpdate = 0;

        if (window.matchMedia("(min-width: 768px)").matches) {
            this.onMouseMove = e => {
                if (!this.canvas) return;
                const now = performance.now();
                if (now - lastUpdate < 50) return;
                lastUpdate = now;

                const rect = this.canvas.getBoundingClientRect();
                mouse[0] = (e.clientX - rect.left) / rect.width;
                mouse[1] = 1.0 - (e.clientY - rect.top) / rect.height;
                // console.log(`X: ${this.mouse[0]}, Y: ${this.mouse[1]}`)
            };
            document.addEventListener("mousemove", this.onMouseMove, { passive: true });
        }
    }

    async start() {
        if (await this.initialiseAPI()) {
            this.device.lost.then((info) => {
                if (this.isDestroyed) return;
                console.warn("WebGPU device lost:", info.message);
                this.canvas.style.display = "none";
            });
            this.resizeBackings();

            await this.initialiseResources();

            this.render();

        } else {
            this.canvas.style.display = "none";
            console.warn("WebGPU is not available in this browser.");
        }
    }

    async initialiseAPI(): Promise<boolean> {
        try {
            const entry: GPU = navigator.gpu;
            if (!entry) {
                console.log('this browser does not support WebGPU');
                return false;
            }

            this.adapter = await entry.requestAdapter();
            if (!this.adapter) {
                console.warn('this browser supports webgpu but it appears disabled');
                return false;
            }

            this.device = await this.adapter.requestDevice();
            this.queue = this.device.queue;

        } catch (e) {
            console.error(e);
            return false;
        }
        return true;
    }

    async initialiseResources() {
        // Buffers
        let createBuffer = (arr: Float32Array | Uint16Array, usage: number) => {
            let desc = {
                size: (arr.byteLength + 3) & ~3,
                usage,
                mappedAtCreation: true
            };
            let buffer = this.device.createBuffer(desc);
            const writeArray = arr instanceof Uint16Array ? new Uint16Array(buffer.getMappedRange()) : new Float32Array(buffer.getMappedRange());
            writeArray.set(arr);
            buffer.unmap();
            return buffer;
        };
        const uniformBufferSize = 4 * 4;
        this.uniformBuffer = this.device.createBuffer({
            size: uniformBufferSize,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        const mouseMovementBufferSize = 4 * 4;
        this.mouseMovementBuffer = this.device.createBuffer({
            size: mouseMovementBufferSize,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        this.positionBuffer = createBuffer(positions, GPUBufferUsage.VERTEX);

        const vsmDesc: any = {
            code: vertWgsl
        };
        this.vertModule = this.device.createShaderModule(vsmDesc);

        const fsmDesc: any = {
            code: fragWgsl
        };
        this.fragModule = this.device.createShaderModule(fsmDesc);

        // Graphics Pipelining

        // Input Assembly
        const positionAttributeDesc: GPUVertexAttribute = {
            shaderLocation: 0,
            offset: 0,
            format: 'float32x3'
        };
        const positionBufferDesc: GPUVertexBufferLayout = {
            attributes: [positionAttributeDesc],
            arrayStride: 4 * 3,
            stepMode: 'vertex'
        };
        // Uniform Data
        const bindGroupLayout = this.device.createBindGroupLayout({
            entries: [{
                binding: 0,
                visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                buffer: {}
            }, {
                binding: 1,
                visibility: GPUShaderStage.FRAGMENT,
                buffer: {}
            }]
        })

        const pipelineLayoutDesc = { bindGroupLayouts: [bindGroupLayout] };
        const layout = this.device.createPipelineLayout(pipelineLayoutDesc);

        // Shader Stages
        const vertex: GPUVertexState = {
            module: this.vertModule,
            entryPoint: 'main',
            buffers: [positionBufferDesc]
        };

        // Color/Blend State
        const colorState: GPUColorTargetState = {
            format: this.canvasFormat,
            writeMask: GPUColorWrite.ALL
        }
        const fragment: GPUFragmentState = {
            module: this.fragModule,
            entryPoint: 'main',
            targets: [colorState]
        }

        // Rasterisation
        const primitive: GPUPrimitiveState = {
            frontFace: 'cw',
            cullMode: 'none',
            topology: 'triangle-strip'
        };

        const pipelineDesc: GPURenderPipelineDescriptor = {
            layout,

            vertex,
            fragment,

            primitive
        };

        this.pipeline = this.device.createRenderPipeline(pipelineDesc);

        // Create bind group once here so encodeCommands can reuse it every frame
        this.uniformBindGroup = this.device.createBindGroup({
            layout: this.pipeline.getBindGroupLayout(0),
            entries: [
                {
                    binding: 0,
                    resource: { buffer: this.uniformBuffer },
                },
                {
                    binding: 1,
                    resource: { buffer: this.mouseMovementBuffer },
                },
            ]
        });
    }

    private getRenderSize() {
        const cssWidth = this.canvas.clientWidth;
        const cssHeight = this.canvas.clientHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const baseScale = window.innerWidth > 768 ? 0.6 : 0.8;
        const desiredScale = baseScale * dpr;
        const maxPixels = 2_000_000;
        const desiredPixels = cssWidth * cssHeight * desiredScale * desiredScale;
        const cap = desiredPixels > maxPixels ? Math.sqrt(maxPixels / desiredPixels) : 1;
        const scale = desiredScale * cap;

        return {
            width: Math.max(1, Math.floor(cssWidth * scale)),
            height: Math.max(1, Math.floor(cssHeight * scale)),
        };
    }

    // The canvas is stretched by CSS; its backing store is deliberately capped.
    resizeBackings() {
        const { width, height } = this.getRenderSize();
        this.canvas.width = width;
        this.canvas.height = height;
        this.needsResize = false;

        if (!this.context) {
            this.context = this.canvas.getContext('webgpu');
            if (!this.context) throw new Error("Unable to create a WebGPU canvas context.");

            this.canvasFormat = navigator.gpu.getPreferredCanvasFormat();
            this.context.configure({
                device: this.device,
                alphaMode: "opaque",
                format: this.canvasFormat,
                usage: GPUTextureUsage.RENDER_ATTACHMENT,
            });
        }
    }

    encodeCommands(now: number) {
        let colorAttachment: GPURenderPassColorAttachment = {
            view: this.colorTextureView,
            clearValue: { r: 0, g: 0, b: 0, a: 1 },
            loadOp: 'clear',
            storeOp: 'store'
        };

        const renderPassDesc: GPURenderPassDescriptor = {
            colorAttachments: [colorAttachment]
        }

        this.updateUniforms(now);

        this.queue.writeBuffer(
            this.uniformBuffer,
            0,
            this.colorUniformData
        );

        this.queue.writeBuffer(
            this.mouseMovementBuffer,
            0,
            this.mouseUniformData
        );

        this.commandEncoder = this.device.createCommandEncoder();

        // Encoding draw commands
        this.passEncoder = this.commandEncoder.beginRenderPass(renderPassDesc);
        this.passEncoder.setPipeline(this.pipeline);
        this.passEncoder.setBindGroup(0, this.uniformBindGroup);
        this.passEncoder.setViewport(
            0,
            0,
            this.canvas.width,
            this.canvas.height,
            0,
            1
        );

        this.passEncoder.setScissorRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
        this.passEncoder.setVertexBuffer(0, this.positionBuffer);
        this.passEncoder.draw(4, 1);
        this.passEncoder.end();

        this.queue.submit([this.commandEncoder.finish()]);
    }

    private updateUniforms(now: number) {
        this.colorUniformData[0] = Math.sin(now / 5000);
        this.colorUniformData[1] = Math.sin(2 * Math.PI / 3 + now / 300);
        this.colorUniformData[2] = Math.sin(4 * Math.PI / 3 + now / 600);
        this.colorUniformData[3] = now / 1000;

        const aspect = this.canvas.clientWidth / Math.max(1, this.canvas.clientHeight);
        this.mouseUniformData[0] = this.mouse[0];
        this.mouseUniformData[1] = this.mouse[1];
        this.mouseUniformData[2] = aspect;
        this.mouseUniformData[3] = 0;
    }

    private lastFrame = 0;
    private readonly reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    private readonly interval = 1000 / 24;

    render = () => {
        this.animationFrameId = null;
        // pipeline is unset until start() finishes; a visibility/resize event can arrive before that.
        if (this.isDestroyed || document.hidden || !this.pipeline) return;

        const now = performance.now();

        if (!this.reducedMotion && now - this.lastFrame < this.interval) {
            this.animationFrameId = requestAnimationFrame(this.render);
            return;
        }

        this.lastFrame = now;

        if (!this.startTime)
            this.startTime = now;

        // Reduced motion gets a single still frame instead of an animation.
        const time = this.reducedMotion ? 0 : now - this.startTime;

        if (this.needsResize) {
            this.resizeBackings();
        }

        if (this.context)
            this.colorTexture = this.context.getCurrentTexture();

        this.colorTextureView = this.colorTexture.createView();

        this.encodeCommands(time);

        if (!this.reducedMotion) this.animationFrameId = requestAnimationFrame(this.render);
    };

    destroy() {
        this.isDestroyed = true;

        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }

        this.resizeObserver.disconnect();
        window.removeEventListener("resize", this.onResize);
        document.removeEventListener("visibilitychange", this.onVisibilityChange);
        if (this.onMouseMove) {
            document.removeEventListener("mousemove", this.onMouseMove);
        }

        this.uniformBuffer?.destroy();
        this.mouseMovementBuffer?.destroy();
        this.positionBuffer?.destroy();
        this.device?.destroy();
    }
}

export async function startWebGpuBackground(canvas: HTMLCanvasElement) {
  const renderer = new Renderer(canvas);
  await renderer.start();

  return () => renderer.destroy?.();
}

// export {}
