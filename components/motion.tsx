 "use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:.12 }} transition={{ duration: reduce ? 0 : .8, delay, ease:[.22,1,.36,1] }}>{children}</motion.div>;
}
export function PageFade({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return <motion.div initial={reduce ? false : { opacity:0 }} animate={{ opacity:1 }} transition={{ duration:reduce ? 0 : .45 }}>{children}</motion.div>;
}
