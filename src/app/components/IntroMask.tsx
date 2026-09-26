// Dark translucent overlay over the WebGPU background, shared by the inner pages.
// The home page renders its own variant with the logo and name cut out of the mask.
export default function IntroMask() {
  return (
    <div id="intro">
      <svg xmlns="http://www.w3.org/2000/svg" className="fixed z-10 top-0 left-0 bottom-0 right-0 fill-none pointer-events-none h-full w-full" baseProfile="full" version="1.1">
        <defs>
          <mask id="mask-main-dark-inner" className="force-dark">
            <rect className="fill-black w-screen h-screen"></rect>
            <g className="intro-fadeout">
              <rect className="mask-main-bg w-screen h-screen fill-white"></rect>
            </g>
            <g className="intro-wrap intro-fadeout"></g>
          </mask>
        </defs>
        <g className="intro-masked-wrap">
          <rect className="intro-masked lght" width="100%" height="100%" mask="url(#mask-main-lght)"></rect>
          <rect className="intro-masked dark" width="100%" height="100%" mask="url(#mask-main-dark-inner)"></rect>
        </g>
      </svg>
    </div>
  );
}
