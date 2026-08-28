"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { saveRawMemory } from "@/actions/memories";
import { Toast } from "@/components/toast";
import { useRouter, useSearchParams } from "next/navigation";

interface AddMemoryModalProps {
  personId: string;
  personName: string;
}

export function AddMemoryModal({ personId, personName }: AddMemoryModalProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isOpen = searchParams.get("addMemory") === "true";
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  const close = useCallback(() => {
    router.replace(`/app/people/${personId}`, { scroll: false });
  }, [router, personId]);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setStatus("saving");
    setErrorMsg("");

    const formData = new FormData();
    formData.set("personId", personId);
    formData.set("rawInput", input.trim());

    const result = await saveRawMemory(formData);

    if (result?.error) {
      setStatus("error");
      setErrorMsg(result.error);
      return;
    }

    if (result?.memoryId) {
      try {
        await fetch("/api/ai/process", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            personId,
            memoryId: result.memoryId,
          }),
        });
      } catch {
        // AI failed but memory is saved — that's fine
      }
    }

    setInput("");
    setStatus("idle");
    close();
    setShowToast(true);
    router.refresh();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
              onClick={close}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-surface p-6 pb-10 shadow-soft md:inset-auto md:left-1/2 md:top-1/2 md:w-full md:max-w-lg md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:pb-6"
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border md:hidden" />

              <h2 className="font-serif text-xl">
                What did {personName} tell you?
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                Don&apos;t worry about organizing it. Just say it naturally.
              </p>

              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`${personName} mentioned that she's been wanting to visit Japan and loves small coffee shops...`}
                rows={4}
                className="mt-4 w-full resize-none rounded-xl border-none bg-background p-4 text-foreground placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent/20"
              />

              {status === "error" && (
                <p className="mt-2 text-sm text-destructive">
                  {errorMsg || "I couldn't quite make sense of that. Your note is safe — try again."}
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={!input.trim() || status === "saving"}
                className="mt-4 w-full rounded-xl bg-accent py-3 font-medium text-white transition-transform active:scale-[0.97] disabled:opacity-50"
              >
                {status === "saving" ? "Thinking..." : "Remember this"}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Toast
        message="Got it. ❤️"
        visible={showToast}
        onDone={() => setShowToast(false)}
      />
    </>
  );
}
