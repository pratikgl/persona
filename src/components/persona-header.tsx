import { getInitials } from "@/lib/utils";

const relationshipLabels: Record<string, { label: string; emoji: string }> = {
  partner: { label: "Partner", emoji: "❤️" },
  friend: { label: "Friend", emoji: "👋" },
  family: { label: "Family", emoji: "🏠" },
  other: { label: "", emoji: "✨" },
};

interface PersonaHeaderProps {
  name: string;
  relationship: string;
}

export function PersonaHeader({ name, relationship }: PersonaHeaderProps) {
  const rel = relationshipLabels[relationship] || relationshipLabels.other;

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-light text-lg font-medium text-accent">
        {getInitials(name)}
      </div>
      <div>
        <h1 className="font-serif text-3xl">
          {name} {rel.emoji}
        </h1>
        {rel.label && (
          <p className="mt-0.5 text-sm text-text-secondary">{rel.label}</p>
        )}
      </div>
    </div>
  );
}
