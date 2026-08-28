import { chatCompletion } from "./openrouter";
import {
  extractionResultSchema,
  personaSummarySchema,
  type ExtractedMemory,
  type PersonaSummaryResult,
} from "./schemas";
import { extractMemoryPrompt, generatePersonaPrompt } from "./prompts";

export async function extractMemory(
  rawInput: string,
  personName: string
): Promise<ExtractedMemory[]> {
  const prompt = extractMemoryPrompt(personName, rawInput);
  const raw = await chatCompletion(prompt);

  const parsed = extractionResultSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) {
    return [{ summary: rawInput, category: "other" }];
  }

  return parsed.data.memories;
}

export async function generatePersona(
  memorySummaries: string[],
  personName: string
): Promise<PersonaSummaryResult> {
  const prompt = generatePersonaPrompt(personName, memorySummaries);
  const raw = await chatCompletion(prompt);

  const parsed = personaSummarySchema.safeParse(JSON.parse(raw));
  if (!parsed.success) {
    return {
      summary: `You've shared some things about ${personName}.`,
      structuredData: {},
    };
  }

  return parsed.data;
}
