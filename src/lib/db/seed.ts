import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config();

async function seed() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });

  console.log("Seeding database...");

  const passwordHash = await bcrypt.hash("demo1234", 12);
  const [user] = await db
    .insert(schema.users)
    .values({
      name: "Demo User",
      email: "demo@persona.app",
      passwordHash,
    })
    .returning();

  const [diksha] = await db
    .insert(schema.people)
    .values({
      userId: user.id,
      name: "Diksha",
      relationship: "partner",
    })
    .returning();

  const seedMemories = [
    { raw: "Diksha loves flowers, especially lilies", summary: "Loves lilies", category: "likes" as const },
    { raw: "She loves horror movies", summary: "Loves horror movies", category: "likes" as const },
    { raw: "She likes dark chocolate", summary: "Likes dark chocolate", category: "likes" as const },
    { raw: "Diksha hates overly sweet things", summary: "Hates overly sweet things", category: "dislikes" as const },
    { raw: "She's been wanting to visit Japan", summary: "Wants to visit Japan", category: "goals" as const },
    { raw: "Diksha mentioned wanting to watch The Conjuring", summary: "Wants to watch The Conjuring", category: "interests" as const },
  ];

  for (const m of seedMemories) {
    await db.insert(schema.memories).values({
      userId: user.id,
      personId: diksha.id,
      rawInput: m.raw,
      summary: m.summary,
      category: m.category,
    });
  }

  await db.insert(schema.personaSummaries).values({
    personId: diksha.id,
    userId: user.id,
    summary:
      "Diksha seems to love thoughtful little experiences — she's especially into flowers (lilies are her favorite) and enjoys horror movies. She has a soft spot for dark chocolate but isn't a fan of things that are overly sweet. She's been talking about visiting Japan and has mentioned wanting to watch The Conjuring.",
    structuredData: {
      likes: ["🌸 Lilies", "🎬 Horror movies", "🍫 Dark chocolate"],
      dislikes: ["🍰 Overly sweet things"],
      goals: ["🇯🇵 Visit Japan"],
      recentMentions: ["🎥 Watch The Conjuring"],
    },
  });

  console.log("Seed complete. Login: demo@persona.app / demo1234");
}

seed().catch(console.error);
