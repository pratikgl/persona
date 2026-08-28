import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { people, memories } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { getGreeting } from "@/lib/utils";
import { PeopleRow } from "@/components/people-row";
import { RecentMemories } from "@/components/recent-memories";
import { EmptyState } from "@/components/empty-state";
import Link from "next/link";

export default async function HomePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const userId = session.user.id;

  const userPeople = await db
    .select()
    .from(people)
    .where(eq(people.userId, userId))
    .orderBy(desc(people.updatedAt));

  const recentMemories = await db
    .select({
      id: memories.id,
      personId: memories.personId,
      personName: people.name,
      summary: memories.summary,
      rawInput: memories.rawInput,
      createdAt: memories.createdAt,
    })
    .from(memories)
    .innerJoin(people, eq(memories.personId, people.id))
    .where(eq(memories.userId, userId))
    .orderBy(desc(memories.createdAt))
    .limit(5);

  if (userPeople.length === 0) {
    return (
      <div className="flex min-h-[80dvh] items-center justify-center px-6">
        <EmptyState
          title="Who matters to you?"
          description="Start with someone you never want to forget the little things about."
          action={
            <Link
              href="/app/people/new"
              className="rounded-xl bg-accent px-6 py-3 font-medium text-white transition-transform active:scale-[0.97]"
            >
              Add someone
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="font-serif text-2xl">
        {getGreeting()}, {session.user.name?.split(" ")[0]}.
      </h1>

      <section className="mt-8">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-text-secondary">
          Your people
        </h2>
        <PeopleRow people={userPeople} />
      </section>

      <div className="mt-10">
        <RecentMemories memories={recentMemories} />
      </div>
    </div>
  );
}
