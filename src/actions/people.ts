"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { people } from "@/lib/db/schema";
import { addPersonSchema } from "@/lib/validators";
import { redirect } from "next/navigation";

export async function addPerson(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const parsed = addPersonSchema.safeParse({
    name: formData.get("name"),
    relationship: formData.get("relationship"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const [person] = await db
    .insert(people)
    .values({
      userId: session.user.id,
      name: parsed.data.name,
      relationship: parsed.data.relationship,
    })
    .returning({ id: people.id });

  redirect(`/app/people/${person.id}`);
}
