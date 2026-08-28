import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { memories, people, personaSummaries } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { extractMemory, generatePersona } from "@/lib/ai";
import { z } from "zod";

const requestSchema = z.object({
  personId: z.string().uuid(),
  memoryId: z.string().uuid(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const body = await req.json();
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { personId, memoryId } = parsed.data;

  // Verify person belongs to user
  const [person] = await db
    .select()
    .from(people)
    .where(and(eq(people.id, personId), eq(people.userId, userId)))
    .limit(1);

  if (!person) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Verify memory belongs to user
  const [memory] = await db
    .select()
    .from(memories)
    .where(and(eq(memories.id, memoryId), eq(memories.userId, userId)))
    .limit(1);

  if (!memory) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    // Step 1: Extract structured memories from raw input
    const extracted = await extractMemory(memory.rawInput, person.name);

    // Step 2: Update the original memory with the first extraction
    if (extracted.length > 0) {
      const first = extracted[0];
      await db
        .update(memories)
        .set({
          summary: first.summary,
          category: first.category,
          updatedAt: new Date(),
        })
        .where(eq(memories.id, memoryId));

      // Step 3: Create additional memory rows for extra extractions
      for (let i = 1; i < extracted.length; i++) {
        await db.insert(memories).values({
          userId,
          personId,
          rawInput: memory.rawInput,
          summary: extracted[i].summary,
          category: extracted[i].category,
        });
      }
    }

    // Step 4: Regenerate persona summary from ALL memories
    const allMemories = await db
      .select()
      .from(memories)
      .where(and(eq(memories.personId, personId), eq(memories.userId, userId)));

    const summaries = allMemories.map((m) => m.summary || m.rawInput);
    const personaResult = await generatePersona(summaries, person.name);

    // Step 5: Upsert persona summary
    const existing = await db
      .select({ id: personaSummaries.id })
      .from(personaSummaries)
      .where(eq(personaSummaries.personId, personId))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(personaSummaries)
        .set({
          summary: personaResult.summary,
          structuredData: personaResult.structuredData,
          updatedAt: new Date(),
        })
        .where(eq(personaSummaries.id, existing[0].id));
    } else {
      await db.insert(personaSummaries).values({
        personId,
        userId,
        summary: personaResult.summary,
        structuredData: personaResult.structuredData,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("AI processing failed:", error);
    // Return success anyway — raw memory is saved, AI just couldn't process it
    return NextResponse.json({ success: true, aiProcessed: false });
  }
}
