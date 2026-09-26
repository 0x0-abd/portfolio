"use client";

import { useEffect, useRef } from "react";

export default function WebGpuBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Without WebGPU the static fallback (bg.webp on the wrapper) shows and the renderer is never downloaded.
    if (!("gpu" in navigator)) {
      canvas.style.display = "none";
      return;
    }

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    import("../lib/bg")
      .then(({ startWebGpuBackground }) => startWebGpuBackground(canvas))
      .then((stop) => {
        if (cancelled) stop();
        else cleanup = stop;
      })
      .catch((error) => {
        console.error("WebGPU background failed to start:", error);
        canvas.style.display = "none";
      });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div className="canvas-wrap bg-fallback z-0 fixed top-0 left-0 h-full w-full opacity-0">
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
