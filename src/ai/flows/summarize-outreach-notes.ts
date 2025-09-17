'use server';

/**
 * @fileOverview Summarizes outreach notes using AI.
 *
 * - summarizeOutreachNotes - A function that summarizes the outreach notes.
 * - SummarizeOutreachNotesInput - The input type for the summarizeOutreachNotes function.
 * - SummarizeOutreachNotesOutput - The return type for the summarizeOutreachNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeOutreachNotesInputSchema = z.object({
  notes: z.string().describe('The outreach notes to summarize.'),
});
export type SummarizeOutreachNotesInput = z.infer<typeof SummarizeOutreachNotesInputSchema>;

const SummarizeOutreachNotesOutputSchema = z.object({
  summary: z.string().describe('The summary of the outreach notes.'),
});
export type SummarizeOutreachNotesOutput = z.infer<typeof SummarizeOutreachNotesOutputSchema>;

export async function summarizeOutreachNotes(input: SummarizeOutreachNotesInput): Promise<SummarizeOutreachNotesOutput> {
  return summarizeOutreachNotesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeOutreachNotesPrompt',
  input: {schema: SummarizeOutreachNotesInputSchema},
  output: {schema: SummarizeOutreachNotesOutputSchema},
  prompt: `Summarize the following outreach notes in a concise and informative manner:\n\n{{{notes}}}`,
});

const summarizeOutreachNotesFlow = ai.defineFlow(
  {
    name: 'summarizeOutreachNotesFlow',
    inputSchema: SummarizeOutreachNotesInputSchema,
    outputSchema: SummarizeOutreachNotesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
