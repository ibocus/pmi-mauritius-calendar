import type { Metadata } from "next";
import { SuggestionForm } from "@/components/SuggestionForm";

export const metadata: Metadata = {
  title: "Suggest a workshop — PMI Mauritius Chapter",
};

export default function SuggestPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Suggest a workshop</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Tell the committee what you&apos;d like to see next year — a topic, a
        speaker idea, a format you prefer. Suggestions feed directly into the
        planning backlog for the next yearly calendar.
      </p>

      <div className="mt-8">
        <SuggestionForm />
      </div>
    </div>
  );
}
