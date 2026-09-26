"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SplashScreen from "../SplashScreen";
import AnimatedTabs from "./navbar";
import WebGpuBackground from "./WebGpuBackground";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const isHome = usePathname() === "/";
  // Only a visit that starts on the home page gets the splash.
  const [showSplash, setShowSplash] = useState(isHome);

  useEffect(() => {
    if (document.documentElement.hasAttribute("data-skip-splash")) setShowSplash(false);
  }, []);

  const finishSplash = useCallback(() => {
    try {
      sessionStorage.setItem("splash-seen", "1");
    } catch {}
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onFinish={finishSplash} />}
      {/* Rendered (but hidden) under the splash so the HTML has real content and WebGPU starts early. */}
      <div className={`app-content realbody relative h-full w-full ${showSplash ? "hidden" : ""}`}>
        <AnimatedTabs />
        <WebGpuBackground />
        {children}
      </div>
    </>
  );
}
