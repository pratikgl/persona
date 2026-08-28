import { formatDate } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  likes: "bg-green-50 text-green-700",
  dislikes: "bg-red-50 text-red-700",
  interests: "bg-blue-50 text-blue-700",
  goals: "bg-purple-50 text-purple-700",
  experiences: "bg-yellow-50 text-yellow-700",
  preferences: "bg-orange-50 text-orange-700",
  important: "bg-pink-50 text-pink-700",
  other: "bg-stone-100 text-stone-600",
};

interface MemoryCardProps {
  summary: string | null;
  rawInput: string;
  category: string | null;
  createdAt: Date;
}

export function MemoryCard({ summary, rawInput, category, createdAt }: MemoryCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <p>{summary || rawInput}</p>
      <div className="mt-2 flex items-center gap-2">
        {category && (
          <span className={`rounded-lg px-2 py-0.5 text-xs font-medium ${categoryColors[category] || categoryColors.other}`}>
            {category}
          </span>
        )}
        <span className="text-xs text-text-secondary">{formatDate(createdAt)}</span>
      </div>
    </div>
  );
}
