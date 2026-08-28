"use client";

import { motion } from "framer-motion";

interface AnimateInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function AnimateIn({ children, delay = 0, className }: AnimateInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 200,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 8 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", damping: 25, stiffness: 200 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
