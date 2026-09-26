// Dark translucent (dithered) overlay over the WebGPU background, shared by the inner pages.
// A plain element (not an SVG mask) so the browser can pulse its opacity without repainting.
// The home page keeps its SVG mask because the logo and name are cut out of it.
export default function PageShade() {
  return <div aria-hidden="true" className="page-shade fixed inset-0 z-10 pointer-events-none" />;
}
