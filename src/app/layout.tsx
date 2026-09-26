import type { Metadata } from "next";
import { Figtree, Inter } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import AppShell from "./components/AppShell";
import "./globals.css";

// FontAwesome's CSS is imported at the top of globals.css, so stop it injecting a copy at runtime.
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });
const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-figtree',
});

export const metadata: Metadata = {
  title: {
    default: "Abhyuday Shukla",
    template: "Abhyuday Shukla | %s",
  },
  description: "Abhyuday Shukla — software developer working on web technologies and cloud.",
};

// Runs before hydration so a repeat visit (or reduced motion) never flashes the splash.
const skipSplashScript = `try{if(sessionStorage.getItem("splash-seen")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.setAttribute("data-skip-splash","")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: skipSplashScript }} />
      </head>
      <body className={`${inter.className} ${figtree.variable}`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
