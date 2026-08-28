import { z } from "zod";

export const extractedMemorySchema = z.object({
  summary: z.string(),
  category: z.enum([
    "likes",
    "dislikes",
    "interests",
    "goals",
    "experiences",
    "preferences",
    "important",
    "other",
  ]),
});

export const extractionResultSchema = z.object({
  memories: z.array(extractedMemorySchema),
});

export const personaSummarySchema = z.object({
  summary: z.string(),
  structuredData: z.object({
    likes: z.array(z.string()).optional(),
    dislikes: z.array(z.string()).optional(),
    interests: z.array(z.string()).optional(),
    goals: z.array(z.string()).optional(),
    importantThings: z.array(z.string()).optional(),
    recentMentions: z.array(z.string()).optional(),
  }),
});

export type ExtractedMemory = z.infer<typeof extractedMemorySchema>;
export type ExtractionResult = z.infer<typeof extractionResultSchema>;
export type PersonaSummaryResult = z.infer<typeof personaSummarySchema>;
