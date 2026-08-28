interface PersonaSectionsProps {
  name: string;
  structuredData: {
    likes?: string[];
    dislikes?: string[];
    interests?: string[];
    goals?: string[];
    importantThings?: string[];
    recentMentions?: string[];
  } | null;
}

interface SectionConfig {
  key: keyof NonNullable<PersonaSectionsProps["structuredData"]>;
  label: (name: string) => string;
}

const sections: SectionConfig[] = [
  { key: "likes", label: (n) => `${n} likes` },
  { key: "dislikes", label: (n) => `${n} doesn't like` },
  { key: "interests", label: (n) => `${n}'s interests` },
  { key: "goals", label: (n) => `Things ${n} wants to do` },
  { key: "importantThings", label: () => "Important" },
  { key: "recentMentions", label: (n) => `Things ${n} has mentioned` },
];

export function PersonaSections({ name, structuredData }: PersonaSectionsProps) {
  if (!structuredData) return null;

  const nonEmptySections = sections.filter(
    (s) => structuredData[s.key] && structuredData[s.key]!.length > 0
  );

  if (nonEmptySections.length === 0) return null;

  return (
    <div className="mt-8 space-y-6">
      {nonEmptySections.map((section) => (
        <section key={section.key}>
          <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-text-secondary">
            {section.label(name)}
          </h3>
          <div className="flex flex-wrap gap-2">
            {structuredData[section.key]!.map((item, i) => (
              <span
                key={i}
                className="rounded-xl bg-accent-light px-3 py-1.5 text-sm text-accent"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
