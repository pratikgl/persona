"use client";

import { AnimateIn } from "@/components/animate-in";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <AnimateIn>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="font-serif text-2xl">{title}</h2>
        <p className="mt-2 max-w-xs text-text-secondary">{description}</p>
        {action && <div className="mt-6">{action}</div>}
      </div>
    </AnimateIn>
  );
}
