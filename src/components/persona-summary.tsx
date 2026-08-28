interface PersonaSummaryProps {
  summary: string | null;
  name: string;
}

export function PersonaSummary({ summary, name }: PersonaSummaryProps) {
  if (!summary) return null;

  return (
    <section className="mt-8">
      <h2 className="mb-2 text-sm font-medium uppercase tracking-wider text-text-secondary">
        About {name}
      </h2>
      <p className="leading-relaxed text-foreground/90">{summary}</p>
    </section>
  );
}
