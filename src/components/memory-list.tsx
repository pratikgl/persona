import { MemoryCard } from "@/components/memory-card";

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
    <section className="mt-8">
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-text-secondary">
        Memories
      </h2>
      <div className="space-y-3">
        {memories.map((memory) => (
          <MemoryCard key={memory.id} {...memory} />
        ))}
      </div>
    </section>
  );
}
