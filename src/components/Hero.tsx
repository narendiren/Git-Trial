"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-20 sm:px-10"
    >
      <motion.div
        aria-hidden
        style={{ y }}
        className="pointer-events-none absolute -top-40 right-[-10%] z-0 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[120px] sm:h-[640px] sm:w-[640px]"
      />

      <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 text-sm font-medium tracking-[0.2em] text-accent uppercase"
        >
          Web Design Studio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-5xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-7xl md:text-8xl"
        >
          Websites built for your
          <br className="hidden sm:block" /> exact customer, not a
          template.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-lg text-fg-muted sm:text-xl"
        >
          I design and build conversion-focused websites for businesses
          that need more than a theme.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent/90"
          >
            Start a project
          </a>

          <a
            href="#services"
            className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors group-hover:border-fg-muted">
              <span
                className="block h-2 w-2 -translate-y-0.5 border-b border-r border-current transition-transform duration-300 group-hover:translate-y-0.5"
                style={{ transform: "rotate(45deg)" }}
              />
            </span>
            Scroll to explore
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
