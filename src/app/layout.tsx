import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import ParticleBackground from "@/components/ParticleBackground";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

// Runs before hydration so the stored theme preference applies on first
// paint (without this, the page would flash dark, the default, before
// React mounts and corrects it to a stored "light" preference), and turns
// off the browser's own history scroll-restoration before it has a chance
// to jump the page to a previously-scrolled position on reload.
const THEME_INIT_SCRIPT = `
try {
  if (localStorage.getItem("theme") === "light") {
    document.documentElement.classList.remove("dark");
  }
} catch (e) {}
try {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
} catch (e) {}
`;

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const TITLE = "Plug.Studio, websites built to convert, not templates";
const DESCRIPTION =
  "Plug.Studio is a solo-operator studio building custom, conversion-focused websites tuned to your exact customer.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Plug.Studio",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-fg font-body">
        <ScrollToTop />
        <ThemeProvider>
          <ParticleBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
