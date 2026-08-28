import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";
import { people, memories, personaSummaries } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { PersonaHeader } from "@/components/persona-header";
import { PersonaSummary } from "@/components/persona-summary";
import { PersonaSections } from "@/components/persona-sections";
import { MemoryList } from "@/components/memory-list";
import { EmptyState } from "@/components/empty-state";
import Link from "next/link";

export default async function PersonaProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { id } = await params;
  const userId = session.user.id;

  const [person] = await db
    .select()
    .from(people)
    .where(and(eq(people.id, id), eq(people.userId, userId)))
    .limit(1);

  if (!person) notFound();

  const [personaMemories, persona] = await Promise.all([
    db
      .select()
      .from(memories)
      .where(and(eq(memories.personId, id), eq(memories.userId, userId)))
      .orderBy(desc(memories.createdAt)),
    db
      .select()
      .from(personaSummaries)
      .where(
        and(
          eq(personaSummaries.personId, id),
          eq(personaSummaries.userId, userId)
        )
      )
      .limit(1)
      .then((rows) => rows[0] || null),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-8 pb-32">
      <PersonaHeader name={person.name} relationship={person.relationship} />

      {personaMemories.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            title="Nothing here yet."
            description={`Tell Persona something about ${person.name}.`}
            action={
              <Link
                href={`/app/people/${id}?addMemory=true`}
                className="rounded-xl bg-accent px-6 py-3 font-medium text-white transition-transform active:scale-[0.97]"
              >
                + Tell Persona about {person.name}
              </Link>
            }
          />
        </div>
      ) : (
        <>
          <PersonaSummary summary={persona?.summary ?? null} name={person.name} />
          <PersonaSections
            name={person.name}
            structuredData={persona?.structuredData ?? null}
          />
          <MemoryList memories={personaMemories} />
        </>
      )}

      {personaMemories.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-4 md:static md:mt-8 md:px-0">
          <Link
            href={`/app/people/${id}?addMemory=true`}
            className="block w-full rounded-xl bg-accent py-3 text-center font-medium text-white transition-transform active:scale-[0.97]"
          >
            + Tell Persona about {person.name}
          </Link>
        </div>
      )}
    </div>
  );
}
