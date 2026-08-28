export function extractMemoryPrompt(personName: string, rawInput: string): string {
  return `You are an assistant that extracts distinct pieces of information from a user's note about a person named "${personName}".

Extract each atomic fact as a separate memory. Each memory has:
- "summary": a concise one-line description of the fact
- "category": one of "likes", "dislikes", "interests", "goals", "experiences", "preferences", "important", "other"

If uncertain about a category, use "other".
Never invent information not present in the input.
Return valid JSON only, no markdown.

User's note:
"${rawInput}"

Return JSON in this exact format:
{"memories": [{"summary": "...", "category": "..."}]}`;
}

export function generatePersonaPrompt(
  personName: string,
  memorySummaries: string[]
): string {
  const memoriesList = memorySummaries.map((m, i) => `${i + 1}. ${m}`).join("\n");

  return `You are an assistant that creates a warm, human portrait of a person based on things the user has told you about them.

Person: "${personName}"

What the user has shared:
${memoriesList}

Write a concise, warm narrative summary (2-4 sentences). Synthesize — do not list or concatenate. Only state things supported by the memories. Use hedged language ("seems to", "you mentioned") for uncertain things.

Then categorize each memory into structured data. Omit categories with no items. Use short, natural phrases for each item (e.g., "Lilies" not "Likes lilies").

Return valid JSON only, no markdown, in this format:
{
  "summary": "...",
  "structuredData": {
    "likes": ["..."],
    "dislikes": ["..."],
    "interests": ["..."],
    "goals": ["..."],
    "importantThings": ["..."],
    "recentMentions": ["..."]
  }
}`;
}
