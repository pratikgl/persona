"use client";

import { useActionState, useState } from "react";
import { addPerson } from "@/actions/people";

const relationships = [
  { value: "partner", label: "Partner", emoji: "❤️" },
  { value: "friend", label: "Friend", emoji: "👋" },
  { value: "family", label: "Family", emoji: "🏠" },
  { value: "other", label: "Other", emoji: "✨" },
] as const;

export function AddPersonForm() {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<string>("friend");
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | undefined, formData: FormData) => {
      return await addPerson(formData);
    },
    undefined
  );

  return (
    <form action={formAction} className="space-y-8">
      <div>
        <label htmlFor="person-name" className="sr-only">Name</label>
        <input
          id="person-name"
          name="name"
          type="text"
          required
          placeholder="Their name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-b border-border bg-transparent py-3 font-serif text-2xl text-foreground placeholder:text-text-secondary/40 focus:border-accent focus:outline-none"
        />
      </div>

      <div>
        <p className="mb-3 text-sm text-text-secondary">They are your...</p>
        <div className="flex flex-wrap gap-2">
          {relationships.map((rel) => (
            <label
              key={rel.value}
              className={`cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                selected === rel.value
                  ? "border-accent bg-accent-light text-accent"
                  : "border-border bg-surface text-text-secondary hover:border-accent/30"
              }`}
            >
              <input
                type="radio"
                name="relationship"
                value={rel.value}
                checked={selected === rel.value}
                onChange={() => setSelected(rel.value)}
                className="sr-only"
              />
              {rel.emoji} {rel.label}
            </label>
          ))}
        </div>
      </div>

      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending || !name.trim()}
        className="w-full rounded-xl bg-accent py-3 font-medium text-white transition-transform active:scale-[0.97] disabled:opacity-50"
      >
        {pending ? "..." : name.trim() ? `Add ${name}` : "Add someone"}
      </button>
    </form>
  );
}
