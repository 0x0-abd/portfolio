/// <reference types="@webgpu/types" />

// import * as dat from 'dat.gui'

const bgcanvas: HTMLCanvasElement = document.querySelector('canvas') as HTMLCanvasElement;
bgcanvas.width = bgcanvas.height = 640;
// var gui = new dat.GUI({name: 'Configure Background'})

// 🟦 Shaders
const vertWgsl = `
struct VSOut {
    @builtin(position) Position: vec4<f32>,
    @location(0) color: vec3<f32>,
    @location(1) uv: vec2<f32>
};

@vertex
fn main(@location(0) inPos: vec3<f32>,
        @location(1) inColor: vec3<f32>) -> VSOut {
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
@group(0) @binding(2) var<uniform> mousePos : vec4<f32>;

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

const colors = new Float32Array([
    1.0, 0.0, 0.0, // 🔴
    0.0, 1.0, 0.0, // 🟢
    0.0, 0.0, 1.0,  // 🔵
    0.5, 1.0, 0.0
]);

const indices = new Uint16Array([0, 1, 2, 3]);

class Renderer {
    canvas: HTMLCanvasElement;

    // API Data Structure
    adapter: GPUAdapter | null;
    device: GPUDevice;
    queue: GPUQueue;

    // Frame Backings
    context: GPUCanvasContext | null;
    colorTexture: GPUTexture;
    colorTextureView: GPUTextureView;
    depthTexture: GPUTexture;
    depthTextureView: GPUTextureView;

    // Bing Group
    uniformBindGroup: GPUBindGroup;

    // Resources
    uniformBuffer: GPUBuffer;
    mouseMovementBuffer: GPUBuffer;
    heightWidthUniformBuffer: GPUBuffer;
    positionBuffer: GPUBuffer;
    colorBuffer: GPUBuffer;
    indexBuffer: GPUBuffer;
    vertModule: GPUShaderModule;
    fragModule: GPUShaderModule;
    pipeline: GPURenderPipeline;

    startTime: number;
    mouse: [number, number];

    commandEncoder: GPUCommandEncoder;
    passEncoder: GPURenderPassEncoder;

    constructor(canvas) {
        this.canvas = canvas;
        this.startTime = 0;
        let mouse = this.mouse = [0.5, 0.5];
        if(window.matchMedia("(min-width: 768px)").matches) {
            document.addEventListener("mousemove", e => {
                if (!this.canvas) return;
                const rect = this.canvas.getBoundingClientRect();
                mouse[0] = (e.clientX - rect.left) / rect.width;
                mouse[1] = 1.0 - (e.clientY - rect.top) / rect.height;
                // console.log(`X: ${this.mouse[0]}, Y: ${this.mouse[1]}`)
            });
        }

        this.render = this.render.bind(this);
    }

    async start() {
        if (await this.initialiseAPI()) {
            console.log("yo1")
            this.resizeBackings();
            console.log("yo2")

            await this.initialiseResources();
            console.log("yo3")

            this.render();
            console.log("yo4")

        } else {
            bgcanvas!.style.display = "none";
            document.getElementById("error")!.innerHTML = `
            <p>Doesn't look like your browser supports WebGPU.</p>
            <p>Try using any chromium browser's canary build and go to <code>about:flags</code> to <code>enable-unsafe-webgpu</code>.</p>`
        }
    }

    async initialiseAPI(): Promise<Boolean> {
        try {
            const entry: GPU = navigator.gpu;
            if (!entry) {
                console.log('this browser does not support WebGPU');
                return false;
            }

            this.adapter = await entry.requestAdapter();
            if (!this.adapter) {
                alert('this browser supports webgpu but it appears disabled');
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

        const heightWidthUniformBufferSize = 2 * 4;
        this.heightWidthUniformBuffer = this.device.createBuffer({
            size: heightWidthUniformBufferSize,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        })


        this.positionBuffer = createBuffer(positions, GPUBufferUsage.VERTEX);
        this.colorBuffer = createBuffer(colors, GPUBufferUsage.VERTEX);
        this.indexBuffer = createBuffer(indices, GPUBufferUsage.INDEX);

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
        const colorAttributeDesc: GPUVertexAttribute = {
            shaderLocation: 1,
            offset: 0,
            format: 'float32x3'
        };
        const positionBufferDesc: GPUVertexBufferLayout = {
            attributes: [positionAttributeDesc],
            arrayStride: 4 * 3,
            stepMode: 'vertex'
        };
        const colorBufferDesc: GPUVertexBufferLayout = {
            attributes: [colorAttributeDesc],
            arrayStride: 4 * 3,
            stepMode: 'vertex'
        };

        // Depth
        const depthStencil: GPUDepthStencilState = {
            depthWriteEnabled: true,
            depthCompare: 'less',
            format: 'depth24plus-stencil8'
        };

        // Uniform Data
        const bindGroupLayout = this.device.createBindGroupLayout({
            entries: [{
                binding: 0,
                visibility: GPUShaderStage.VERTEX | GPUShaderStage.COMPUTE | GPUShaderStage.FRAGMENT,
                buffer: {}
            }, {
                binding: 1,
                visibility: GPUShaderStage.COMPUTE | GPUShaderStage.FRAGMENT,
                buffer: {}
            },{
                binding: 2,
                visibility: GPUShaderStage.COMPUTE | GPUShaderStage.FRAGMENT,
                buffer: {}
            }]
        })

        const pipelineLayoutDesc = { bindGroupLayouts: [bindGroupLayout] };
        const layout = this.device.createPipelineLayout(pipelineLayoutDesc);

        // Shader Stages
        const vertex: GPUVertexState = {
            module: this.vertModule,
            entryPoint: 'main',
            buffers: [positionBufferDesc, colorBufferDesc]
        };

        // Color/Blend State
        const colorState: GPUColorTargetState = {
            format: 'bgra8unorm',
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

            primitive,
            depthStencil
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
                    resource: { buffer: this.heightWidthUniformBuffer },
                },
                {
                    binding: 2,
                    resource: { buffer: this.mouseMovementBuffer },
                },
            ]
        });
    }

    // Resizing canvas, frame buffer attachments
    resizeBackings() {
        // Canvas Context!
        let cheight = this.canvas.clientHeight;
        let cwidth = this.canvas.clientWidth;
        this.canvas.width = cwidth;
        this.canvas.height = cheight;



        if (!this.context) {
            this.context = this.canvas.getContext('webgpu');
            const canvasConfig: GPUCanvasConfiguration = {
                device: this.device,
                alphaMode: "opaque",
                format: 'bgra8unorm',
                usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC
            };
            this.context?.configure(canvasConfig);
        }
        const depthTextureDesc: GPUTextureDescriptor = {
            size: [this.canvas.width, this.canvas.height, 1],
            dimension: '2d',
            format: 'depth24plus-stencil8',
            usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC
        };
        this.depthTexture = this.device.createTexture(depthTextureDesc);
        this.depthTextureView = this.depthTexture.createView();
    }

    encodeCommands(now: number) {
        let colorAttachment: GPURenderPassColorAttachment = {
            view: this.colorTextureView,
            clearValue: { r: 0, g: 0, b: 0, a: 1 },
            loadOp: 'clear',
            storeOp: 'store'
        };

        const depthAttachment: GPURenderPassDepthStencilAttachment = {
            view: this.depthTextureView,
            depthClearValue: 1,
            depthLoadOp: 'clear',
            depthStoreOp: 'store',
            stencilClearValue: 0,
            stencilLoadOp: 'clear',
            stencilStoreOp: 'store'
        };

        const renderPassDesc: GPURenderPassDescriptor = {
            colorAttachments: [colorAttachment],
            depthStencilAttachment: depthAttachment
        }

        const colorChangeMatrix = this.getColorChangeMatrix(now);
        const mouseMovementData = this.updateMouseUniform();

        this.queue.writeBuffer(
            this.uniformBuffer,
            0,
            colorChangeMatrix.buffer,
            colorChangeMatrix.byteOffset,
            colorChangeMatrix.byteLength
        );

        this.queue.writeBuffer(
            this.mouseMovementBuffer,
            0,
            mouseMovementData.buffer,
            mouseMovementData.byteOffset,
            mouseMovementData.byteLength
        );

        // console.log(colorChangeMatrix);

        const heightWidthMatrix = new Float32Array([(this.canvas.clientHeight), (this.canvas.clientWidth)]);
        this.queue.writeBuffer(
            this.heightWidthUniformBuffer,
            0,
            heightWidthMatrix.buffer,
            heightWidthMatrix.byteOffset,
            heightWidthMatrix.byteLength
        );
        // console.log(heightWidthMatrix);

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
        this.passEncoder.setVertexBuffer(1, this.colorBuffer);
        this.passEncoder.setIndexBuffer(this.indexBuffer, 'uint16');
        this.passEncoder.draw(4, 1);
        this.passEncoder.end();

        this.queue.submit([this.commandEncoder.finish()]);
    }

    updateMouseUniform() {
        let width = this.canvas.clientWidth;
        let height = this.canvas.clientHeight;

        let vwidth;
        let vheight;
        let aspect = width / height;
        if (aspect < 1.0) {
            vwidth = aspect;
            vheight = 1.0;
        } else {
            vwidth = 1.0;
            vheight = 1.0 / aspect;
        }

        return new Float32Array([
            this.mouse[0],
            this.mouse[1],
            aspect,
            0
        ]);
    }

    getColorChangeMatrix(now: number) {
        // console.log('omg')
        return new Float32Array([Math.sin(now / 5000), Math.sin(2 * Math.PI / 3 + now / 300), Math.sin(4 * Math.PI / 3 + now / 600), now / 1000])
    }

    render = () => {


        let now = window.performance.now();
        if (!this.startTime)
            this.startTime = now;
        now -= this.startTime;

        // Acquire next image from context
        if (this.context !== null) this.colorTexture = this.context.getCurrentTexture();
        this.colorTextureView = this.colorTexture.createView();

        let cheight = this.canvas.clientHeight;
        let cwidth = this.canvas.clientWidth;
        // console.log(height, width)

        let resized = this.canvas.width != cwidth || this.canvas.height != cheight;
        //  ^?
        if (resized) {
            this.resizeBackings();
        }


        // Write and encode commands
        this.encodeCommands(now);
        // console.log(window.performance.now())

        // Refreshing canvas
        requestAnimationFrame(this.render);
    };
}


const renderer = new Renderer(bgcanvas);
renderer.start()

// export {}