"use client";

import { MemoryCard } from "@/components/memory-card";
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/animate-in";

interface Memory {
  id: string;
  summary: string | null;
  rawInput: string;
  category: string | null;
  createdAt: Date;
}

export function MemoryList({ memories }: { memories: Memory[] }) {
  if (memories.length === 0) return null;

  return (
    <AnimateIn delay={0.3}>
      <section className="mt-8">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-text-secondary">
          Memories
        </h2>
        <StaggerContainer className="space-y-3">
          {memories.map((memory) => (
            <StaggerItem key={memory.id}>
              <MemoryCard {...memory} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </AnimateIn>
  );
}
