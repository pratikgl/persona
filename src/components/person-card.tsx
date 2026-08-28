import Link from "next/link";
import { getInitials } from "@/lib/utils";

const relationshipEmoji: Record<string, string> = {
  partner: "❤️",
  friend: "👋",
  family: "🏠",
  other: "",
};

interface PersonCardProps {
  id: string;
  name: string;
  relationship: string;
}

export function PersonCard({ id, name, relationship }: PersonCardProps) {
  return (
    <Link
      href={`/app/people/${id}`}
      className="flex flex-col items-center gap-1.5"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-light text-sm font-medium text-accent">
        {getInitials(name)}
      </div>
      <span className="text-sm font-medium">
        {name} {relationshipEmoji[relationship] || ""}
      </span>
    </Link>
  );
}
