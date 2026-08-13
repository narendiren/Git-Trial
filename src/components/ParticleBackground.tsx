"use client";

import { useEffect, useMemo, useState } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "./ThemeProvider";

const ACCENT = "#e8703a"; // unchanged in both modes
const DOT_COLOR_DARK = "#f5f4f0"; // matches dark mode's --fg
const DOT_COLOR_LIGHT = "#0a0a0a"; // near-black, fully opaque
const LINK_COLOR_LIGHT = "#000000"; // pure black — links have no glow to lean on, unlike dark mode
const SPARK_SVG_URL = "/shapes/spark.svg"; // 200x200 viewBox/width/height

// Referenced by identity in ParticlesProvider — must stay a stable module-level function,
// the provider throws if it ever sees a different callback after the engine has loaded.
async function initEngine(engine: Engine): Promise<void> {
  await loadSlim(engine);
  await loadPolygonMaskPlugin(engine);
}

function computeParticleCount(viewportWidth: number): number {
  const clamped = Math.min(Math.max(viewportWidth, 320), 1920);
  // 95 (narrow) -> 155 (wide) — another 25% up from the 75 -> 125 range.
  const scaled = 95 + ((clamped - 320) / (1920 - 320)) * 60;
  return Math.round(viewportWidth < 640 ? scaled / 2 : scaled);
}

function buildOptions({
  count,
  reducedMotion,
  morphed,
  polygonScale,
  theme,
}: {
  count: number;
  reducedMotion: boolean;
  morphed: boolean;
  polygonScale: number;
  theme: "dark" | "light";
}) {
  const isDark = theme === "dark";
  const dotColor = isDark ? DOT_COLOR_DARK : DOT_COLOR_LIGHT;
  // Dark mode links keep matching the dot color (the glow filter carries
  // them). Light mode links get their own pure-black constant — no glow
  // to lean on there, so color and opacity both have to do real work.
  const linkColor = isDark ? dotColor : LINK_COLOR_LIGHT;
  // Dark stays near-solid at its peak (the glow filter below does the
  // rest of the "starlight" work). Light mode dots are fully opaque, flat
  // black, high contrast against the new background — no fade range.
  const dotOpacity = isDark ? { min: 0.45, max: 0.95 } : 1;
  // This is the *ceiling* tsParticles fades down from as two linked dots
  // move apart (built-in distance-based falloff, not something set here)
  // — a low ceiling means even close-together dots never get very
  // visible. 0.4 was still landing faint with no glow to help it. Pushed
  // hard so lines are unmistakable up close, then still fade with
  // distance same as before.
  const linkOpacity = isDark ? 0.32 : 0.85;
  const linkWidth = isDark ? 1 : 1.5;

  return {
    fullScreen: { enable: false },
    fpsLimit: 60,
    detectRetina: true,
    background: { color: { value: "transparent" } },
    particles: {
      number: { value: count },
      color: {
        value: morphed
          ? [ACCENT, ACCENT, dotColor, dotColor, dotColor]
          : [dotColor, dotColor, dotColor, dotColor, dotColor, dotColor, dotColor, dotColor, ACCENT],
      },
      opacity: {
        value: morphed ? { min: 0.4, max: 0.85 } : dotOpacity,
      },
      size: {
        value: morphed ? { min: 1.5, max: 3 } : { min: 1, max: 2.5 },
      },
      links: {
        enable: !morphed,
        distance: 120,
        color: linkColor,
        opacity: linkOpacity,
        width: linkWidth,
      },
      move: {
        enable: !reducedMotion,
        speed: morphed ? 0.3 : 0.4,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "bounce" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: !reducedMotion, mode: ["repulse", "bubble"] },
        onClick: { enable: false },
        resize: { enable: true },
      },
      modes: {
        repulse: { distance: 70, duration: 0.4, speed: 0.6, easing: "ease-out-quad" },
        bubble: { distance: 90, size: 3, opacity: 0.9, duration: 0.4 },
      },
    },
    polygon: morphed
      ? {
          enable: true,
          type: "inline",
          url: SPARK_SVG_URL,
          scale: polygonScale,
          position: { x: 68, y: 60 },
          inline: { arrangement: "equidistant" },
          move: { type: "path", radius: 8 },
          draw: { enable: false },
        }
      : { enable: false },
  };
}

export default function ParticleBackground() {
  const { theme } = useTheme();
  const [count, setCount] = useState(100);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [dimmed, setDimmed] = useState(false);
  // Pinned false: the only code that ever flipped this was the disabled
  // trigger effect below. No section is wired as the morph target, so the
  // background must always render the free-floating network. See that
  // block for why + how to re-enable.
  const morphed = false;

  // The theme actually being rendered (colors, glow, the Particles `key`)
  // lags one beat behind the real `theme`. Swapping the key immediately
  // on toggle was destroying the old dark-themed canvas and mounting the
  // new one while both the CSS background transition and the old canvas's
  // last frame (bright, glow-filtered, still drifting) were visible at
  // once — that overlap is what read as smeared/comet-shaped particles.
  // Fading out first, swapping while invisible, then fading in removes
  // the overlap instead of trying to time around it.
  const [renderTheme, setRenderTheme] = useState(theme);
  // Derived, not stored: flips true/false the instant theme and renderTheme
  // diverge or realign, including an immediate revert if the user toggles
  // back before the swap below ever fires.
  const themeFading = theme !== renderTheme;

  useEffect(() => {
    if (theme === renderTheme) return;
    const timeout = window.setTimeout(() => {
      setRenderTheme(theme);
    }, 300);
    return () => window.clearTimeout(timeout);
  }, [theme, renderTheme]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motionQuery.matches);
    updateMotion();
    motionQuery.addEventListener("change", updateMotion);

    // Fixed + inset-0 means the canvas is always viewport-sized, never
    // document-sized — count scales off window width only, same as before.
    const updateCount = () => setCount(computeParticleCount(window.innerWidth));
    updateCount();
    window.addEventListener("resize", updateCount);

    return () => {
      motionQuery.removeEventListener("change", updateMotion);
      window.removeEventListener("resize", updateCount);
    };
  }, []);

  useEffect(() => {
    // Dim behind the text-dense sections (Process onward) so body copy
    // stays readable; Hero and the Capabilities tag-cloud keep full
    // opacity. Plain scroll position rather than IntersectionObserver on
    // purpose — a section-visibility observer is what caused the
    // premature shape-morph firing bug previously, and this only needs one
    // scroll boundary, not per-section enter/exit tracking.
    const processEl = document.getElementById("process");
    if (!processEl) return;

    const update = () => {
      const rect = processEl.getBoundingClientRect();
      setDimmed(rect.top <= window.innerHeight * 0.6);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // --- Shape-morph trigger: disabled --------------------------------------
  // This effect is what flips `morphed` to true. It was previously wired to
  // observe the hero section itself rather than a dedicated later section —
  // and because IntersectionObserver always fires its callback once
  // immediately on `.observe()` with the target's *current* on-screen
  // fraction, a hero taller than the viewport (short windows, mobile
  // chrome, wrapped headline text, etc.) could already read a ratio under
  // the threshold at load, firing the morph with zero scrolling. Disabled
  // until a real target section exists further down the page.
  //
  // To re-enable: give the target section its own ref (this component is
  // now mounted at the layout level, not inside any one section, so that
  // ref has to be passed in as a prop or read via document.getElementById
  // the same way the dimming effect above does), change `morphed` above
  // back to `useState(false)`, add a sibling `morphFading` state (the
  // `themeFading` state above is now dedicated to theme swaps — combine
  // both in the opacity style below as `themeFading || morphFading`), and
  // uncomment this block.
  //
  // const busyRef = useRef(false);
  //
  // useEffect(() => {
  //   const el = /* the real target section's element */;
  //   if (!el || reducedMotion) return;
  //
  //   const triggerMorph = (next: boolean) => {
  //     busyRef.current = true;
  //     setMorphFading(true);
  //     window.setTimeout(() => {
  //       setMorphed(next);
  //       window.setTimeout(() => {
  //         setMorphFading(false);
  //         busyRef.current = false;
  //       }, 260);
  //     }, 260);
  //   };
  //
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (!entry || busyRef.current) return;
  //       if (entry.intersectionRatio <= 0.7) {
  //         setMorphed((current) => {
  //           if (!current) triggerMorph(true);
  //           return current;
  //         });
  //       } else if (entry.intersectionRatio >= 0.9) {
  //         setMorphed((current) => {
  //           if (current) triggerMorph(false);
  //           return current;
  //         });
  //       }
  //     },
  //     { threshold: [0, 0.7, 0.9, 1] },
  //   );
  //
  //   observer.observe(el);
  //   return () => observer.disconnect();
  // }, [reducedMotion]);

  // Inert while shape-morph is disabled — recompute as
  // targetSize / 200 (the SVG's own width/height) from the target
  // section's own size when re-enabling (see block above).
  const polygonScale = 1;

  const options = useMemo(
    () => buildOptions({ count, reducedMotion, morphed: morphed && !reducedMotion, polygonScale, theme: renderTheme }),
    [count, reducedMotion, morphed, polygonScale, renderTheme],
  );

  // tsParticles has no per-particle glow of its own, so the "starlight"
  // look is a CSS drop-shadow on the canvas wrapper instead: unlike blur()
  // (which would smear the whole layer) drop-shadow traces the actual
  // alpha shape of every dot and link, so each one gets its own soft halo.
  // Layering a tight core + a wider, softer ring reads more like a glow
  // than a single shadow does. Light mode skips this: dark dots don't
  // read as "glowing" against white, and it isn't part of that spec.
  const glowFilter =
    renderTheme === "dark"
      ? "drop-shadow(0 0 2px rgba(245, 244, 240, 0.9)) drop-shadow(0 0 7px rgba(245, 244, 240, 0.5))"
      : undefined;

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <ParticlesProvider init={initEngine}>
        <div
          className="h-full w-full transition-opacity duration-300 ease-out"
          style={{ opacity: themeFading ? 0 : dimmed ? 0.72 : 1, filter: glowFilter }}
        >
          <Particles
            // Keying on renderTheme forces React to fully unmount the old
            // Particles instance (running its effect cleanup, which
            // destroys the tsParticles container) and mount a fresh one on
            // every switch, rather than relying on the library's own
            // options-reference diffing inside a persisted instance. An
            // explicit, guaranteed full reinit rather than an implicit one.
            // renderTheme (not theme) so the swap happens only once the
            // fade-out above has already hidden it.
            key={renderTheme}
            id="site-particles"
            className="h-full w-full"
            options={options as ISourceOptions}
          />
        </div>
      </ParticlesProvider>
    </div>
  );
}
