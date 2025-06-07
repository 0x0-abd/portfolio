/// <reference types="@webgpu/types" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// import * as dat from 'dat.gui'
var bgcanvas = document.querySelector('canvas');
bgcanvas.width = bgcanvas.height = 640;
// var gui = new dat.GUI({name: 'Configure Background'})
// 🟦 Shaders
var vertWgsl = "\nstruct VSOut {\n    @builtin(position) Position: vec4<f32>,\n    @location(0) color: vec3<f32>,\n    @location(1) uv: vec2<f32>\n};\n\n@vertex\nfn main(@location(0) inPos: vec3<f32>,\n        @location(1) inColor: vec3<f32>) -> VSOut {\n    var vsOut: VSOut;\n    vsOut.Position = vec4<f32>(inPos, 1.0);\n    vsOut.uv = (inPos.xy * 0.5) + vec2<f32>(0.5, 0.5);\n    vsOut.color = vec3<f32>(inPos.x+1, inPos.y+1, 1);\n    return vsOut;\n}";
var fragWgsl = "\n\nstruct Uniforms {\n    colorChangeMatrix: vec3<f32>,\n    time: f32,\n}\n\n@binding(0) @group(0) var<uniform> uniforms: Uniforms;\n@group(0) @binding(2) var<uniform> mousePos : vec4<f32>;\n\nfn getRed(pos: vec3<f32>) -> f32 {\n    let ans = f32(0.70 + 0.30*cos(((pos.x*pos.x)-(pos.y*pos.y)) + uniforms.colorChangeMatrix.x * 20));\n    return ans;\n}\n\nfn getGreen(pos: vec3<f32>) -> f32 {\n    let ans = f32(0.70 + 0.30*sin((pos.x*pos.x*cos(uniforms.colorChangeMatrix.x * 20/4)) + (pos.y*pos.y*sin(uniforms.colorChangeMatrix.x*20/2))));\n    return ans;\n}\n\nfn getBlue(pos: vec3<f32>) -> f32 {\n    let ans = f32(0.70 + 0.30*sin((5*sin(uniforms.colorChangeMatrix.x*20/9))+ ((pos.x*pos.x)+(pos.y*pos.y))/1));\n    return ans;\n}\n\nfn animatedDither(pos: vec2<f32>, time: f32) -> f32 {\n    return fract(sin(dot(pos.xy + time ,vec2<f32>(12.9898,78.233))) * 43758.5453);\n}\n\nfn getMouseDist(uv: vec2<f32>) -> f32 {\n    let dx = (uv.x-mousePos.x)*mousePos.z;\n    let dy = (uv.y-mousePos.y);\n    return sqrt(dx*dx + dy*dy);\n}\n\n@fragment\nfn main(@location(0) inColor: vec3<f32>,\n        @location(1) uv: vec2<f32>) -> @location(0) vec4<f32> {\n\n    let baseColor = vec3<f32>(\n        getRed(inColor),\n        getGreen(inColor),\n        getBlue(inColor)\n    );\n    let dist = getMouseDist(uv);\n    let pulses = array<vec4<f32>, 3>(\n        vec4<f32>(0.0,  2.0, 8.0, 3.0),\n        vec4<f32>(0.3,  2.5, 4.0, 4.0),\n        vec4<f32>(0.6,  3.0,  3.0, 5.0)\n    );\n    var wave: f32 = 0.0;\n    let wavenoise = sin(uv.x * 50.0 + uniforms.time * 2.0) * sin(uv.y * 50.0 + uniforms.time * 1.5);\n    let deform = 1.0 + 0.15 * wavenoise;\n    let distortedDist = dist * deform;\n    for (var i = 0u; i < 3u; i = i + 1u) {\n        let p = pulses[i];\n        // t_p = normalized time since this pulse \u201Cfired\u201D\n        let t_p = uniforms.time * p.y - p.x;\n        // only contribute when t_p > d (wavefront has passed)\n        if (t_p > distortedDist) {\n            let phase = (distortedDist * p.z) - (uniforms.time * p.y);\n            let envelope = exp(-distortedDist * p.w);\n            wave = wave + sin(phase) * envelope;\n        }\n    }\n    let noise = animatedDither(inColor.xy, uniforms.time) * 0.05; // small noise\n\n    let finalColor = mix(baseColor, vec3<f32>(0.3, 0.6, 0.9) * wave, 0.1) + noise;\n    return vec4<f32>(finalColor, 1.0);\n}";
var positions = new Float32Array([
    1.0, 1.0, 0.0,
    -1.0, 1.0, 0.0,
    1.0, -1.0, 0.0,
    -1.0, -1, 0, 0.0
]);
var colors = new Float32Array([
    1.0, 0.0, 0.0, // 🔴
    0.0, 1.0, 0.0, // 🟢
    0.0, 0.0, 1.0, // 🔵
    0.5, 1.0, 0.0
]);
var indices = new Uint16Array([0, 1, 2, 3]);
var Renderer = /** @class */ (function () {
    function Renderer(canvas) {
        var _this = this;
        this.render = function () {
            var now = window.performance.now();
            if (!_this.startTime)
                _this.startTime = now;
            now -= _this.startTime;
            // Acquire next image from context
            if (_this.context !== null)
                _this.colorTexture = _this.context.getCurrentTexture();
            _this.colorTextureView = _this.colorTexture.createView();
            var cheight = _this.canvas.clientHeight;
            var cwidth = _this.canvas.clientWidth;
            // console.log(height, width)
            var resized = _this.canvas.width != cwidth || _this.canvas.height != cheight;
            //  ^?
            if (resized) {
                _this.resizeBackings();
                _this.render();
            }
            // Write and encode commands
            _this.encodeCommands();
            // console.log(window.performance.now())
            // Refreshing canvas
            requestAnimationFrame(_this.render);
        };
        this.canvas = canvas;
        this.startTime = 0;
        var mouse = this.mouse = [0.5, 0.5];
        if (window.matchMedia("(min-width: 768px)").matches) {
            document.addEventListener("mousemove", function (e) {
                if (!_this.canvas)
                    return;
                var rect = _this.canvas.getBoundingClientRect();
                mouse[0] = (e.clientX - rect.left) / rect.width;
                mouse[1] = 1.0 - (e.clientY - rect.top) / rect.height;
                // console.log(`X: ${this.mouse[0]}, Y: ${this.mouse[1]}`)
            });
        }
        this.render = this.render.bind(this);
    }
    Renderer.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initialiseAPI()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        console.log("yo1");
                        this.resizeBackings();
                        console.log("yo2");
                        return [4 /*yield*/, this.initialiseResources()];
                    case 2:
                        _a.sent();
                        console.log("yo3");
                        this.render();
                        console.log("yo4");
                        return [3 /*break*/, 4];
                    case 3:
                        bgcanvas.style.display = "none";
                        document.getElementById("error").innerHTML = "\n            <p>Doesn't look like your browser supports WebGPU.</p>\n            <p>Try using any chromium browser's canary build and go to <code>about:flags</code> to <code>enable-unsafe-webgpu</code>.</p>";
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Renderer.prototype.initialiseAPI = function () {
        return __awaiter(this, void 0, void 0, function () {
            var entry, _a, _b, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        entry = navigator.gpu;
                        if (!entry) {
                            console.log('this browser does not support WebGPU');
                            return [2 /*return*/, false];
                        }
                        _a = this;
                        return [4 /*yield*/, entry.requestAdapter()];
                    case 1:
                        _a.adapter = _c.sent();
                        if (!this.adapter) {
                            alert('this browser supports webgpu but it appears disabled');
                            return [2 /*return*/, false];
                        }
                        _b = this;
                        return [4 /*yield*/, this.adapter.requestDevice()];
                    case 2:
                        _b.device = _c.sent();
                        this.queue = this.device.queue;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _c.sent();
                        console.error(e_1);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/, true];
                }
            });
        });
    };
    Renderer.prototype.initialiseResources = function () {
        return __awaiter(this, void 0, void 0, function () {
            var createBuffer, uniformBufferSize, mouseMovementBufferSize, heightWidthUniformBufferSize, vsmDesc, fsmDesc, positionAttributeDesc, colorAttributeDesc, positionBufferDesc, colorBufferDesc, depthStencil, bindGroupLayout, pipelineLayoutDesc, layout, vertex, colorState, fragment, primitive, pipelineDesc;
            var _this = this;
            return __generator(this, function (_a) {
                createBuffer = function (arr, usage) {
                    var desc = {
                        size: (arr.byteLength + 3) & ~3,
                        usage: usage,
                        mappedAtCreation: true
                    };
                    var buffer = _this.device.createBuffer(desc);
                    var writeArray = arr instanceof Uint16Array ? new Uint16Array(buffer.getMappedRange()) : new Float32Array(buffer.getMappedRange());
                    writeArray.set(arr);
                    buffer.unmap();
                    return buffer;
                };
                uniformBufferSize = 4 * 4;
                this.uniformBuffer = this.device.createBuffer({
                    size: uniformBufferSize,
                    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
                });
                mouseMovementBufferSize = 4 * 4;
                this.mouseMovementBuffer = this.device.createBuffer({
                    size: mouseMovementBufferSize,
                    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
                });
                heightWidthUniformBufferSize = 2 * 4;
                this.heightWidthUniformBuffer = this.device.createBuffer({
                    size: heightWidthUniformBufferSize,
                    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
                });
                this.positionBuffer = createBuffer(positions, GPUBufferUsage.VERTEX);
                this.colorBuffer = createBuffer(colors, GPUBufferUsage.VERTEX);
                this.indexBuffer = createBuffer(indices, GPUBufferUsage.INDEX);
                vsmDesc = {
                    code: vertWgsl
                };
                this.vertModule = this.device.createShaderModule(vsmDesc);
                fsmDesc = {
                    code: fragWgsl
                };
                this.fragModule = this.device.createShaderModule(fsmDesc);
                positionAttributeDesc = {
                    shaderLocation: 0,
                    offset: 0,
                    format: 'float32x3'
                };
                colorAttributeDesc = {
                    shaderLocation: 1,
                    offset: 0,
                    format: 'float32x3'
                };
                positionBufferDesc = {
                    attributes: [positionAttributeDesc],
                    arrayStride: 4 * 3,
                    stepMode: 'vertex'
                };
                colorBufferDesc = {
                    attributes: [colorAttributeDesc],
                    arrayStride: 4 * 3,
                    stepMode: 'vertex'
                };
                depthStencil = {
                    depthWriteEnabled: true,
                    depthCompare: 'less',
                    format: 'depth24plus-stencil8'
                };
                bindGroupLayout = this.device.createBindGroupLayout({
                    entries: [{
                            binding: 0,
                            visibility: GPUShaderStage.VERTEX | GPUShaderStage.COMPUTE | GPUShaderStage.FRAGMENT,
                            buffer: {}
                        }, {
                            binding: 1,
                            visibility: GPUShaderStage.COMPUTE | GPUShaderStage.FRAGMENT,
                            buffer: {}
                        }, {
                            binding: 2,
                            visibility: GPUShaderStage.COMPUTE | GPUShaderStage.FRAGMENT,
                            buffer: {}
                        }]
                });
                pipelineLayoutDesc = { bindGroupLayouts: [bindGroupLayout] };
                layout = this.device.createPipelineLayout(pipelineLayoutDesc);
                vertex = {
                    module: this.vertModule,
                    entryPoint: 'main',
                    buffers: [positionBufferDesc, colorBufferDesc]
                };
                colorState = {
                    format: 'bgra8unorm',
                    writeMask: GPUColorWrite.ALL
                };
                fragment = {
                    module: this.fragModule,
                    entryPoint: 'main',
                    targets: [colorState]
                };
                primitive = {
                    frontFace: 'cw',
                    cullMode: 'none',
                    topology: 'triangle-strip'
                };
                pipelineDesc = {
                    layout: layout,
                    vertex: vertex,
                    fragment: fragment,
                    primitive: primitive,
                    depthStencil: depthStencil
                };
                this.pipeline = this.device.createRenderPipeline(pipelineDesc);
                return [2 /*return*/];
            });
        });
    };
    // Resizing canvas, frame buffer attachments
    Renderer.prototype.resizeBackings = function () {
        var _a;
        // Canvas Context!
        var cheight = this.canvas.clientHeight;
        var cwidth = this.canvas.clientWidth;
        this.canvas.width = cwidth;
        this.canvas.height = cheight;
        if (!this.context) {
            this.context = this.canvas.getContext('webgpu');
            var canvasConfig = {
                device: this.device,
                alphaMode: "opaque",
                format: 'bgra8unorm',
                usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC
            };
            (_a = this.context) === null || _a === void 0 ? void 0 : _a.configure(canvasConfig);
        }
        var depthTextureDesc = {
            size: [this.canvas.width, this.canvas.height, 1],
            dimension: '2d',
            format: 'depth24plus-stencil8',
            usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC
        };
        this.depthTexture = this.device.createTexture(depthTextureDesc);
        this.depthTextureView = this.depthTexture.createView();
    };
    Renderer.prototype.encodeCommands = function () {
        var colorAttachment = {
            view: this.colorTextureView,
            clearValue: { r: 0, g: 0, b: 0, a: 1 },
            loadOp: 'clear',
            storeOp: 'store'
        };
        var depthAttachment = {
            view: this.depthTextureView,
            depthClearValue: 1,
            depthLoadOp: 'clear',
            depthStoreOp: 'store',
            stencilClearValue: 0,
            stencilLoadOp: 'clear',
            stencilStoreOp: 'store'
        };
        var uniformBindGroup = this.device.createBindGroup({
            layout: this.pipeline.getBindGroupLayout(0),
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: this.uniformBuffer,
                    },
                },
                {
                    binding: 1,
                    resource: {
                        buffer: this.heightWidthUniformBuffer,
                    }
                },
                {
                    binding: 2,
                    resource: {
                        buffer: this.mouseMovementBuffer,
                    }
                }
            ]
        });
        var renderPassDesc = {
            colorAttachments: [colorAttachment],
            depthStencilAttachment: depthAttachment
        };
        var colorChangeMatrix = this.getColorChangeMatrix();
        var mouseMovementData = this.updateMouseUniform();
        this.queue.writeBuffer(this.uniformBuffer, 0, colorChangeMatrix.buffer, colorChangeMatrix.byteOffset, colorChangeMatrix.byteLength);
        this.queue.writeBuffer(this.mouseMovementBuffer, 0, mouseMovementData.buffer, mouseMovementData.byteOffset, mouseMovementData.byteLength);
        // console.log(colorChangeMatrix);
        var heightWidthMatrix = new Float32Array([(this.canvas.clientHeight), (this.canvas.clientWidth)]);
        this.queue.writeBuffer(this.heightWidthUniformBuffer, 0, heightWidthMatrix.buffer, heightWidthMatrix.byteOffset, heightWidthMatrix.byteLength);
        // console.log(heightWidthMatrix);
        this.commandEncoder = this.device.createCommandEncoder();
        // Encoding draw commands
        this.passEncoder = this.commandEncoder.beginRenderPass(renderPassDesc);
        this.passEncoder.setPipeline(this.pipeline);
        this.passEncoder.setBindGroup(0, uniformBindGroup);
        this.passEncoder.setViewport(0, 0, this.canvas.width, this.canvas.height, 0, 1);
        this.passEncoder.setScissorRect(0, 0, this.canvas.width, this.canvas.height);
        this.passEncoder.setVertexBuffer(0, this.positionBuffer);
        this.passEncoder.setVertexBuffer(1, this.colorBuffer);
        this.passEncoder.setIndexBuffer(this.indexBuffer, 'uint16');
        this.passEncoder.draw(4, 1);
        this.passEncoder.end();
        this.queue.submit([this.commandEncoder.finish()]);
    };
    Renderer.prototype.updateMouseUniform = function () {
        var width = this.canvas.clientWidth;
        var height = this.canvas.clientHeight;
        var vwidth;
        var vheight;
        var aspect = width / height;
        if (aspect < 1.0) {
            vwidth = aspect;
            vheight = 1.0;
        }
        else {
            vwidth = 1.0;
            vheight = 1.0 / aspect;
        }
        return new Float32Array([
            this.mouse[0],
            this.mouse[1],
            aspect,
            0
        ]);
    };
    Renderer.prototype.getColorChangeMatrix = function () {
        // console.log('omg')
        var now = performance.now();
        return new Float32Array([Math.sin(now / 5000), Math.sin(2 * Math.PI / 3 + now / 300), Math.sin(4 * Math.PI / 3 + now / 600), now / 1000]);
    };
    return Renderer;
}());
var renderer = new Renderer(bgcanvas);
renderer.start();
// export {}
