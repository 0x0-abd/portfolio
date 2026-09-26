/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site: `next build` writes plain HTML/JS to ./out (works on GitHub Pages and Vercel).
  output: "export",
  // Static export has no image server; images in public/ are already resized WebP.
  images: { unoptimized: true },
};

export default nextConfig;
