"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, Sparkles } from "lucide-react";

import type { Outreach } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generateSummaryAction } from "@/app/actions/outreach";

const formSchema = z.object({
  institution: z.string().min(2, "Institution is required."),
  contactPerson: z.string().min(2, "Contact person is required."),
  topic: z.string().min(3, "Topic is required."),
  scheduledAt: z.date({ required_error: "A date is required." }),
  notes: z.string().min(10, "Notes must be at least 10 characters.").max(2000),
  summary: z.string().optional(),
});

type OutreachFormValues = z.infer<typeof formSchema>;

type OutreachFormProps = {
  outreach: Outreach | null;
  onSave: (data: OutreachFormValues) => void;
  onCancel: () => void;
};

export function OutreachForm({ outreach, onSave, onCancel }: OutreachFormProps) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = React.useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = React.useState(false);

  const defaultValues: Partial<OutreachFormValues> = outreach
    ? {
        ...outreach,
        scheduledAt: new Date(outreach.scheduledAt),
      }
    : {
        institution: "",
        contactPerson: "",
        topic: "",
        notes: "",
        summary: "",
      };

  const form = useForm<OutreachFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  
  const notesValue = form.watch("notes");

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    const { summary, error } = await generateSummaryAction(notesValue);
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
      });
    } else if (summary) {
      form.setValue("summary", summary);
      toast({
        title: "Success",
        description: "AI summary has been generated.",
      });
    }
    setIsGeneratingSummary(false);
  };

  async function onSubmit(data: OutreachFormValues) {
    setIsSaving(true);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    onSave({
      ...data,
      scheduledAt: data.scheduledAt.toISOString()
    } as any);
    toast({
        title: outreach ? "Outreach Updated" : "Outreach Added",
        description: "The outreach record has been saved successfully.",
    });
    setIsSaving(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., St. Jude Hospital" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactPerson"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Person</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Dr. Evelyn Reed" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Research Collaboration" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="scheduledAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Summarize the conversation and next steps..."
                  className="resize-y min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
             <FormItem>
                <div className="flex items-center justify-between">
                    <FormLabel>AI Summary</FormLabel>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleGenerateSummary}
                        disabled={isGeneratingSummary || !notesValue}
                    >
                        {isGeneratingSummary ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        Generate Summary
                    </Button>
                </div>
                <FormControl>
                    <Textarea
                        readOnly
                        placeholder="AI-generated summary will appear here..."
                        className="resize-none bg-muted/50"
                        {...field}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
