"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { memories, people } from "@/lib/db/schema";
import { addMemorySchema } from "@/lib/validators";
import { eq, and } from "drizzle-orm";

export async function saveRawMemory(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const parsed = addMemorySchema.safeParse({
    personId: formData.get("personId"),
    rawInput: formData.get("rawInput"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const userId = session.user.id;

  const [person] = await db
    .select({ id: people.id })
    .from(people)
    .where(and(eq(people.id, parsed.data.personId), eq(people.userId, userId)))
    .limit(1);

  if (!person) {
    return { error: "Person not found" };
  }

  const [memory] = await db
    .insert(memories)
    .values({
      userId,
      personId: parsed.data.personId,
      rawInput: parsed.data.rawInput,
    })
    .returning({ id: memories.id });

  return { memoryId: memory.id, personId: parsed.data.personId };
}
