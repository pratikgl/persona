import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface RecentMemory {
  id: string;
  personId: string;
  personName: string;
  summary: string | null;
  rawInput: string;
  createdAt: Date;
}

export function RecentMemories({ memories }: { memories: RecentMemory[] }) {
  if (memories.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-text-secondary">
        Little things you&apos;ve remembered
      </h2>
      <div className="space-y-2">
        {memories.map((memory) => (
          <Link
            key={memory.id}
            href={`/app/people/${memory.personId}`}
            className="block rounded-2xl border border-border bg-surface p-4 transition-transform active:scale-[0.99]"
          >
            <p className="text-sm text-text-secondary">{memory.personName}</p>
            <p className="mt-1">{memory.summary || memory.rawInput}</p>
            <p className="mt-2 text-xs text-text-secondary">
              {formatDate(memory.createdAt)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
