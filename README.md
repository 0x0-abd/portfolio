## [Portfolio Page](https://0x0abd.vercel.app/)

Personal portfolio built with Next.js (App Router, static export), Tailwind CSS and a WebGPU shader background.

## Structure

- `src/app/page.tsx`, `about/`, `projects/` — the three pages
- `src/app/components/AppShell.tsx` — splash screen, navbar and background shared by every page
- `src/app/lib/bg.ts` — WebGPU renderer for the animated background (loaded on demand; `public/bg.webp` is the fallback when WebGPU is unavailable)
- `public/` — project screenshots (WebP) and tech-stack icons

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site written to ./out
```

When adding a project screenshot, export it as WebP around 1200px wide; the site is a static export, so images are served as-is.
