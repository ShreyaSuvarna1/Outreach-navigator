"use server";

import { summarizeOutreachNotes } from "@/ai/flows/summarize-outreach-notes";

export async function generateSummaryAction(notes: string): Promise<{ summary: string | null; error: string | null; }> {
  if (!notes.trim()) {
    return { summary: null, error: "Notes cannot be empty." };
  }

  try {
    const result = await summarizeOutreachNotes({ notes });
    return { summary: result.summary, error: null };
  } catch (error) {
    console.error("Error generating summary:", error);
    return { summary: null, error: "Failed to generate summary. Please try again." };
  }
}
