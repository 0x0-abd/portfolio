/// <reference types="@webgpu/types" />

// Background look:
//  "mosaic" – a fixed jagged pattern of small tiles (triangles, quads, pentagons), each one flat colour.
//  "smooth" – a continuous gradient rendered small and stretched by the browser.
// Change this one word to switch.
const STYLE = "smooth" as "mosaic" | "smooth";

// Colour field shared by both styles. `pos` is clip space + 1 (0..2 on x and y).
const colorWgsl = `
struct Uniforms {
    // sin(t / 5s): slowly swings -1..1 and drives every colour channel.
    phase: f32,
}

@binding(0) @group(0) var<uniform> uniforms: Uniforms;

fn getRed(pos: vec3<f32>) -> f32 {
    let ans = f32(0.70 + 0.30*cos(((pos.x*pos.x)-(pos.y*pos.y)) + uniforms.phase * 20));
    return ans;
}

fn getGreen(pos: vec3<f32>) -> f32 {
    let ans = f32(0.70 + 0.30*sin((pos.x*pos.x*cos(uniforms.phase * 20/4)) + (pos.y*pos.y*sin(uniforms.phase*20/2))));
    return ans;
}

fn getBlue(pos: vec3<f32>) -> f32 {
    let ans = f32(0.70 + 0.30*sin((5*sin(uniforms.phase*20/9))+ ((pos.x*pos.x)+(pos.y*pos.y))/1));
    return ans;
}

// 0.9 keeps the brightness the old cursor-ripple mix (10% towards black) produced.
fn fieldColor(pos: vec3<f32>) -> vec3<f32> {
    return vec3<f32>(getRed(pos), getGreen(pos), getBlue(pos)) * 0.9;
}`

// Smooth: the colour is evaluated per pixel.
const smoothVertWgsl = `
struct VSOut {
    @builtin(position) Position: vec4<f32>,
    @location(0) color: vec3<f32>
};

@vertex
fn main(@location(0) inPos: vec2<f32>) -> VSOut {
    var vsOut: VSOut;
    vsOut.Position = vec4<f32>(inPos, 0.0, 1.0);
    vsOut.color = vec3<f32>(inPos.x+1, inPos.y+1, 1);
    return vsOut;
}`
const smoothFragWgsl = colorWgsl + `
@fragment
fn main(@location(0) inColor: vec3<f32>) -> @location(0) vec4<f32> {
    return vec4<f32>(fieldColor(inColor), 1.0);
}`

// Mosaic, step 1 (compute): one invocation per tile works out that tile's colour at its centre.
const MOSAIC_WORKGROUP = 64;
const mosaicComputeWgsl = colorWgsl + `
@group(0) @binding(1) var<storage, read> centres: array<vec2<f32>>;
@group(0) @binding(2) var<storage, read_write> colors: array<vec4<f32>>;

@compute @workgroup_size(${MOSAIC_WORKGROUP})
fn main(@builtin(global_invocation_id) id: vec3<u32>) {
    let tile = id.x;
    if (tile >= arrayLength(&centres)) {
        return;
    }
    colors[tile] = vec4<f32>(fieldColor(vec3<f32>(centres[tile] + vec2<f32>(1.0, 1.0), 1.0)), 1.0);
}`

// Mosaic, step 2 (draw): each vertex just looks up its tile's colour; pixels copy it unchanged.
const mosaicVertWgsl = `
@group(0) @binding(0) var<storage, read> colors: array<vec4<f32>>;

struct VSOut {
    @builtin(position) Position: vec4<f32>,
    @location(0) @interpolate(flat) color: vec3<f32>
};

@vertex
fn main(@location(0) inPos: vec2<f32>, @location(1) tile: u32) -> VSOut {
    var vsOut: VSOut;
    vsOut.Position = vec4<f32>(inPos, 0.0, 1.0);
    vsOut.color = colors[tile].rgb;
    return vsOut;
}`
const mosaicFragWgsl = `
@fragment
fn main(@location(0) @interpolate(flat) color: vec3<f32>) -> @location(0) vec4<f32> {
    return vec4<f32>(color, 1.0);
}`

const TILE = 32;     // CSS px between grid points, so tiles are roughly this size
const JITTER = 0.23; // max point offset as a fraction of TILE; below 0.25 every tile stays convex

// Deterministic 0..1 hash, so the pattern is identical on every visit and after resizes.
function rand(i: number, j: number, k: number) {
    let h = Math.imul(i, 374761393) ^ Math.imul(j, 668265263) ^ Math.imul(k, 1274126177);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
}

type Point = [number, number];

interface Geometry {
    vertices: ArrayBuffer; // per vertex: clip x, y (f32) and, for the mosaic, a tile index (u32)
    stride: number;        // bytes per vertex
    vertexCount: number;
    centres?: Float32Array; // mosaic only: clip-space centre of each tile
}

// Jittered grid; each cell becomes a quad, two triangles, or a triangle notch plus a pentagon.
// Cells only ever share whole edges, so there are no cracks between tiles.
function buildMosaic(width: number, height: number): Geometry {
    const cols = Math.ceil(width / TILE) + 1;
    const rows = Math.ceil(height / TILE) + 1;
    // Points on the top/left edges stay on the edge so tiles always reach the screen corner.
    const point = (i: number, j: number): Point => [
        i * TILE + (i === 0 ? 0 : (rand(i, j, 1) - 0.5) * 2 * JITTER * TILE),
        j * TILE + (j === 0 ? 0 : (rand(i, j, 2) - 0.5) * 2 * JITTER * TILE),
    ];
    const toClip = ([x, y]: Point): Point => [(x / width) * 2 - 1, 1 - (y / height) * 2];
    const positions: number[] = [];
    const tileIds: number[] = [];
    const centres: number[] = [];

    const addTile = (shape: Point[]) => {
        const tile = centres.length / 2;
        centres.push(...toClip([
            shape.reduce((sum, p) => sum + p[0], 0) / shape.length,
            shape.reduce((sum, p) => sum + p[1], 0) / shape.length,
        ]));
        // Fan from the first point; every shape below is visible in full from it.
        for (let k = 1; k + 1 < shape.length; k++) {
            for (const p of [shape[0], shape[k], shape[k + 1]]) {
                positions.push(...toClip(p));
                tileIds.push(tile);
            }
        }
    };

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            // Rotate the corners so the split direction / notched edge varies per cell.
            const turn = Math.floor(rand(i, j, 4) * 4);
            const corners = [point(i, j), point(i + 1, j), point(i + 1, j + 1), point(i, j + 1)];
            const [a, b, c, d] = [0, 1, 2, 3].map((n) => corners[(n + turn) % 4]);
            const kind = rand(i, j, 3);

            if (kind < 0.4) {
                addTile([a, b, c, d]);
            } else if (kind < 0.8) {
                addTile([a, b, c]);
                addTile([a, c, d]);
            } else {
                // Notch point halfway between edge a-b's midpoint and the cell centre.
                const p: Point = [
                    (a[0] + b[0]) / 4 + (a[0] + b[0] + c[0] + d[0]) / 8,
                    (a[1] + b[1]) / 4 + (a[1] + b[1] + c[1] + d[1]) / 8,
                ];
                addTile([p, a, b]);
                addTile([p, b, c, d, a]);
            }
        }
    }

    const stride = 12;
    const vertices = new ArrayBuffer(tileIds.length * stride);
    const asFloat = new Float32Array(vertices);
    const asUint = new Uint32Array(vertices);
    for (let v = 0; v < tileIds.length; v++) {
        asFloat[v * 3] = positions[v * 2];
        asFloat[v * 3 + 1] = positions[v * 2 + 1];
        asUint[v * 3 + 2] = tileIds[v];
    }
    return { vertices, stride, vertexCount: tileIds.length, centres: new Float32Array(centres) };
}

// Smooth: one full-screen quad (two triangles).
const FULLSCREEN: Geometry = {
    vertices: new Float32Array([-1, -1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1]).buffer,
    stride: 8,
    vertexCount: 6,
};

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

    // Resources
    uniformBuffer!: GPUBuffer;
    positionBuffer?: GPUBuffer;
    private centreBuffer?: GPUBuffer; // mosaic: tile centres (fixed until the next resize)
    private colorBuffer?: GPUBuffer;  // mosaic: tile colours, rewritten by the compute pass each frame
    private vertexCount = 0;
    private tileCount = 0;
    pipeline!: GPURenderPipeline;
    private computePipeline?: GPUComputePipeline;
    private renderBindGroup?: GPUBindGroup;
    private computeBindGroup?: GPUBindGroup;

    startTime: number;

    private animationFrameId: number | null = null;
    private timerId: ReturnType<typeof setTimeout> | null = null;
    private isDestroyed = false;
    private needsResize = true;
    private resizeObserver: ResizeObserver;
    private readonly colorUniformData = new Float32Array(4);
    private readonly onResize = () => {
        this.needsResize = true;
        // Reduced motion only draws one frame, so redraw it at the new size.
        if (this.reducedMotion && !this.framePending() && !this.isDestroyed) {
            this.animationFrameId = requestAnimationFrame(this.render);
        }
    };
    private readonly onVisibilityChange = () => {
        if (!document.hidden && !this.isDestroyed && !this.framePending()) {
            this.render();
        }
    };

    private framePending() {
        return this.animationFrameId !== null || this.timerId !== null;
    }

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.startTime = 0;
        this.resizeObserver = new ResizeObserver(this.onResize);
        this.resizeObserver.observe(this.canvas);
        window.addEventListener("resize", this.onResize);
        document.addEventListener("visibilitychange", this.onVisibilityChange);
    }

    async start() {
        if (await this.initialiseAPI()) {
            this.device.lost.then((info) => {
                if (this.isDestroyed) return;
                console.warn("WebGPU device lost:", info.message);
                this.canvas.style.display = "none";
                this.destroy();
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
        this.uniformBuffer = this.device.createBuffer({
            size: 4 * 4,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        const mosaic = STYLE === "mosaic";
        const attributes: GPUVertexAttribute[] = [{ shaderLocation: 0, offset: 0, format: 'float32x2' }]; // clip position
        if (mosaic) attributes.push({ shaderLocation: 1, offset: 4 * 2, format: 'uint32' });             // tile index
        const vertexLayout: GPUVertexBufferLayout = { attributes, arrayStride: mosaic ? 12 : 8, stepMode: 'vertex' };

        this.pipeline = this.device.createRenderPipeline({
            layout: 'auto',
            vertex: {
                module: this.device.createShaderModule({ code: mosaic ? mosaicVertWgsl : smoothVertWgsl }),
                entryPoint: 'main',
                buffers: [vertexLayout],
            },
            fragment: {
                module: this.device.createShaderModule({ code: mosaic ? mosaicFragWgsl : smoothFragWgsl }),
                entryPoint: 'main',
                targets: [{ format: this.canvasFormat, writeMask: GPUColorWrite.ALL }],
            },
            primitive: { topology: 'triangle-list', cullMode: 'none' },
        });

        if (mosaic) {
            this.computePipeline = this.device.createComputePipeline({
                layout: 'auto',
                compute: { module: this.device.createShaderModule({ code: mosaicComputeWgsl }), entryPoint: 'main' },
            });
        }

        this.createBindGroups();
    }

    // Bind groups point at specific buffers, so they are recreated whenever the geometry is rebuilt.
    private createBindGroups() {
        if (!this.pipeline) return;
        if (STYLE === "mosaic") {
            this.computeBindGroup = this.device.createBindGroup({
                layout: this.computePipeline!.getBindGroupLayout(0),
                entries: [
                    { binding: 0, resource: { buffer: this.uniformBuffer } },
                    { binding: 1, resource: { buffer: this.centreBuffer! } },
                    { binding: 2, resource: { buffer: this.colorBuffer! } },
                ],
            });
            this.renderBindGroup = this.device.createBindGroup({
                layout: this.pipeline.getBindGroupLayout(0),
                entries: [{ binding: 0, resource: { buffer: this.colorBuffer! } }],
            });
        } else {
            this.renderBindGroup = this.device.createBindGroup({
                layout: this.pipeline.getBindGroupLayout(0),
                entries: [{ binding: 0, resource: { buffer: this.uniformBuffer } }],
            });
        }
    }

    private getRenderSize() {
        const cssWidth = this.canvas.clientWidth;
        const cssHeight = this.canvas.clientHeight;

        if (STYLE === "smooth") {
            // The gradient is so smooth that ~1 shaded pixel per 8x8 CSS pixels is indistinguishable
            // once the browser stretches it, e.g. 48x105 on a phone instead of ~470x1000.
            return {
                width: Math.max(16, Math.ceil(cssWidth / 8)),
                height: Math.max(16, Math.ceil(cssHeight / 8)),
            };
        }

        // Mosaic needs real resolution for crisp tile edges, but each pixel only copies its tile's colour.
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const maxPixels = 2560 * 1440; // never render more than 1440p ("2K"), even on 4K screens
        const cap = Math.min(1, Math.sqrt(maxPixels / Math.max(1, cssWidth * cssHeight * dpr * dpr)));
        return {
            width: Math.max(1, Math.floor(cssWidth * dpr * cap)),
            height: Math.max(1, Math.floor(cssHeight * dpr * cap)),
        };
    }

    private createFilledBuffer(data: ArrayBuffer, usage: number) {
        const buffer = this.device.createBuffer({ size: data.byteLength, usage, mappedAtCreation: true });
        new Uint8Array(buffer.getMappedRange()).set(new Uint8Array(data));
        buffer.unmap();
        return buffer;
    }

    // Tile geometry is laid out in CSS pixels, so it is rebuilt whenever the canvas size changes.
    private uploadGeometry() {
        if (STYLE === "smooth" && this.positionBuffer) return;
        const geometry = STYLE === "mosaic"
            ? buildMosaic(Math.max(1, this.canvas.clientWidth), Math.max(1, this.canvas.clientHeight))
            : FULLSCREEN;

        this.positionBuffer?.destroy();
        this.positionBuffer = this.createFilledBuffer(geometry.vertices, GPUBufferUsage.VERTEX);
        this.vertexCount = geometry.vertexCount;

        if (geometry.centres) {
            this.centreBuffer?.destroy();
            this.colorBuffer?.destroy();
            this.tileCount = geometry.centres.length / 2;
            this.centreBuffer = this.createFilledBuffer(geometry.centres.buffer as ArrayBuffer, GPUBufferUsage.STORAGE);
            this.colorBuffer = this.device.createBuffer({ size: this.tileCount * 16, usage: GPUBufferUsage.STORAGE });
            this.createBindGroups();
        }
    }

    // The canvas is stretched by CSS to fill the screen.
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

        this.uploadGeometry();
    }

    encodeCommands(now: number) {
        this.updateUniforms(now);
        this.queue.writeBuffer(this.uniformBuffer, 0, this.colorUniformData);

        const encoder = this.device.createCommandEncoder();

        if (this.computePipeline) {
            const compute = encoder.beginComputePass();
            compute.setPipeline(this.computePipeline);
            compute.setBindGroup(0, this.computeBindGroup!);
            compute.dispatchWorkgroups(Math.ceil(this.tileCount / MOSAIC_WORKGROUP));
            compute.end();
        }

        const target: GPURenderPassColorAttachment = {
            view: this.colorTextureView,
            clearValue: { r: 0, g: 0, b: 0, a: 1 },
            loadOp: 'clear',
            storeOp: 'store',
        };
        const pass = encoder.beginRenderPass({ colorAttachments: [target] });
        pass.setPipeline(this.pipeline);
        pass.setBindGroup(0, this.renderBindGroup!);
        pass.setViewport(0, 0, this.canvas.width, this.canvas.height, 0, 1);
        pass.setScissorRect(0, 0, this.canvas.width, this.canvas.height);
        pass.setVertexBuffer(0, this.positionBuffer!);
        pass.draw(this.vertexCount, 1);
        pass.end();

        this.queue.submit([encoder.finish()]);
    }

    private updateUniforms(now: number) {
        this.colorUniformData[0] = Math.sin(now / 5000);
    }

    private nextFrameAt = 0;
    private readonly reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The colours take ~30s to cycle, so 20fps is plenty smooth.
    private readonly interval = 1000 / 20;
    // Wake this much before a frame is due; the requestAnimationFrame that follows lands on the next
    // vsync (<= 16.7ms at 60Hz), so on average frames arrive on time instead of up to a vsync late.
    private readonly wakeEarly = 8;

    // Sleep on a timer until the next frame is due, then draw on the following vsync. Polling with
    // requestAnimationFrame instead would wake up on every refresh (up to 144/s) just to skip it.
    private scheduleNextFrame() {
        const delay = Math.max(0, this.nextFrameAt - performance.now() - this.wakeEarly);
        this.timerId = setTimeout(() => {
            this.timerId = null;
            this.animationFrameId = requestAnimationFrame(this.render);
        }, delay);
    }

    render = () => {
        this.animationFrameId = null;
        // pipeline is unset until start() finishes; a visibility/resize event can arrive before that.
        if (this.isDestroyed || document.hidden || !this.pipeline) return;

        const now = performance.now();
        // Keep a fixed 20fps schedule; after a stall (e.g. the tab was hidden) restart it from now.
        this.nextFrameAt = now - this.nextFrameAt > this.interval ? now + this.interval : this.nextFrameAt + this.interval;

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

        if (!this.reducedMotion) this.scheduleNextFrame();
    };

    destroy() {
        this.isDestroyed = true;

        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        if (this.timerId !== null) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }

        this.resizeObserver.disconnect();
        window.removeEventListener("resize", this.onResize);
        document.removeEventListener("visibilitychange", this.onVisibilityChange);

        this.uniformBuffer?.destroy();
        this.positionBuffer?.destroy();
        this.centreBuffer?.destroy();
        this.colorBuffer?.destroy();
        this.device?.destroy();
    }
}

export async function startWebGpuBackground(canvas: HTMLCanvasElement) {
  const renderer = new Renderer(canvas);
  await renderer.start();

  return () => renderer.destroy?.();
}
