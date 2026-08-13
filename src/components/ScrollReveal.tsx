"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  y,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={y === undefined ? "hidden" : { opacity: 0, y }}
      whileInView={y === undefined ? "visible" : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      variants={y === undefined ? variants : undefined}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
