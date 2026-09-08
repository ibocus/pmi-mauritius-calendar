"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const AREAS = ["Ways of Working", "Power Skills", "Business Acumen"] as const;
const FORMATS = ["In-person", "Virtual", "Hybrid", "No preference"] as const;
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function SuggestionForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      topic: String(data.get("topic") ?? ""),
      area: String(data.get("area") ?? ""),
      format: String(data.get("format") ?? ""),
      month: String(data.get("month") ?? ""),
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      comments: String(data.get("comments") ?? ""),
    };

    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-green-900 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300">
        <h2 className="font-semibold">Thanks — your suggestion was submitted.</h2>
        <p className="mt-2 text-sm">
          The chapter committee reviews suggestions when planning next year&apos;s calendar.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium underline"
        >
          Submit another suggestion
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium">
          Workshop topic <span className="text-red-500">*</span>
        </label>
        <input
          id="topic"
          name="topic"
          required
          maxLength={200}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          placeholder="e.g. Earned Value Management for non-finance PMs"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="area" className="block text-sm font-medium">
            Talent Triangle area
          </label>
          <select
            id="area"
            name="area"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <option value="">No preference</option>
            {AREAS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="format" className="block text-sm font-medium">
            Preferred format
          </label>
          <select
            id="format"
            name="format"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          >
            {FORMATS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="month" className="block text-sm font-medium">
            Preferred month
          </label>
          <select
            id="month"
            name="month"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <option value="">No preference</option>
            {MONTHS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="comments" className="block text-sm font-medium">
          Anything else the committee should know?
        </label>
        <textarea
          id="comments"
          name="comments"
          rows={3}
          maxLength={1000}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name <span className="text-slate-400">(optional)</span>
          </label>
          <input
            id="name"
            name="name"
            maxLength={100}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email <span className="text-slate-400">(optional, for follow-up)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            maxLength={200}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Submit suggestion"}
      </button>
    </form>
  );
}
