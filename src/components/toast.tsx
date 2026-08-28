"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  visible: boolean;
  onDone: () => void;
}

export function Toast({ message, visible, onDone }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onDone, 2000);
      return () => clearTimeout(t);
    }
  }, [visible, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="fixed bottom-28 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-foreground px-5 py-3 text-sm font-medium text-background shadow-soft md:bottom-8"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
