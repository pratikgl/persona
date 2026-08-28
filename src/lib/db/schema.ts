import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
  jsonb,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const relationshipEnum = pgEnum("relationship", [
  "partner",
  "friend",
  "family",
  "other",
]);

export const memoryCategoryEnum = pgEnum("memory_category", [
  "likes",
  "dislikes",
  "interests",
  "goals",
  "experiences",
  "preferences",
  "important",
  "other",
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const people = pgTable("people", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  relationship: relationshipEnum("relationship").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const memories = pgTable("memories", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  personId: uuid("person_id")
    .references(() => people.id, { onDelete: "cascade" })
    .notNull(),
  rawInput: text("raw_input").notNull(),
  summary: text("summary"),
  category: memoryCategoryEnum("category"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const personaSummaries = pgTable(
  "persona_summaries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    personId: uuid("person_id")
      .references(() => people.id, { onDelete: "cascade" })
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    summary: text("summary").notNull(),
    structuredData: jsonb("structured_data").$type<{
      likes?: string[];
      dislikes?: string[];
      interests?: string[];
      goals?: string[];
      importantThings?: string[];
      recentMentions?: string[];
    }>(),
    generatedAt: timestamp("generated_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    uniquePerson: uniqueIndex("unique_person_summary").on(table.personId),
  })
);
