"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const EASE = [0.16, 1, 0.3, 1] as const;
const TESTIMONIAL_COUNT = 3;

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d={direction === "left" ? "M14.5 5.5 8 12l6.5 6.5" : "M9.5 5.5 16 12l-6.5 6.5"} />
    </svg>
  );
}

export default function Work() {
  const [index, setIndex] = useState(0);

  const goTo = (next: number) => setIndex(((next % TESTIMONIAL_COUNT) + TESTIMONIAL_COUNT) % TESTIMONIAL_COUNT);

  return (
    <section id="work" className="px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="mb-16 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-sm font-medium tracking-[0.2em] text-accent uppercase">
              Work
            </p>
            <p className="text-sm text-fg-muted">
              [PLACEHOLDER, replace with real client testimonials]
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex flex-col sm:flex-row"
              >
                <div
                  aria-hidden="true"
                  className="aspect-[4/3] w-full shrink-0 border-b border-border bg-bg-raised sm:aspect-auto sm:w-64 sm:border-r sm:border-b-0"
                />
                <div className="flex flex-1 items-center px-8 py-10 sm:px-10">
                  <p className="text-lg text-fg-muted">Testimonial coming soon.</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {Array.from({ length: TESTIMONIAL_COUNT }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-accent" : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-fg-muted hover:text-fg"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-fg-muted hover:text-fg"
              >
                <ChevronIcon direction="right" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
