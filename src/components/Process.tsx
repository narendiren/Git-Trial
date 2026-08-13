"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We start by understanding your business, your audience, and what success actually looks like for you.",
    yourInput: true,
  },
  {
    number: "02",
    title: "Plan",
    description:
      "Your site gets mapped end to end: structure, content, and the path that turns visitors into customers.",
    yourInput: false,
  },
  {
    number: "03",
    title: "Design",
    description:
      "The visual direction comes together: look, feel, and personality, all built around your brand.",
    yourInput: true,
  },
  {
    number: "04",
    title: "Build",
    description:
      "The real thing gets built, then refined together until it's exactly right and ready for your approval.",
    yourInput: true,
  },
  {
    number: "05",
    title: "Launch",
    description:
      "Your site goes live, tested across every device, ready for the world to see.",
    yourInput: false,
  },
];

export default function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.4"],
  });

  return (
    <section id="process" className="px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <p className="mb-16 text-sm font-medium tracking-[0.2em] text-accent uppercase">
            Process
          </p>
        </ScrollReveal>

        <div ref={trackRef} className="relative">
          <div className="absolute top-2 bottom-2 left-8 w-px bg-border sm:left-12" />
          <motion.div
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="absolute top-2 bottom-2 left-8 w-px bg-accent sm:left-12"
          />

          <div className="flex flex-col gap-16 sm:gap-20">
            {steps.map((step, i) => {
              const base = i * 0.08;
              return (
                <div key={step.number} className="relative z-10 flex gap-6 sm:gap-10">
                  <div className="flex w-16 shrink-0 justify-center sm:w-24">
                    <ScrollReveal delay={base}>
                      <span className="step-number font-heading text-5xl font-bold sm:text-7xl">
                        {step.number}
                      </span>
                    </ScrollReveal>
                  </div>

                  <div className="min-w-0 pt-1 sm:pt-3">
                    <ScrollReveal delay={base + 0.12}>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-heading text-2xl font-semibold text-fg sm:text-3xl">
                          {step.title}
                        </h3>
                        {step.yourInput && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-medium tracking-wide text-accent uppercase">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                            Your input
                          </span>
                        )}
                      </div>
                    </ScrollReveal>
                    <ScrollReveal delay={base + 0.24}>
                      <p className="mt-3 max-w-md text-fg-muted">{step.description}</p>
                    </ScrollReveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
