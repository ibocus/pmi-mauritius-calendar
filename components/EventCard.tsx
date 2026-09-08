import type { ChapterEvent } from "@/lib/events";
import { AreaBadge } from "./AreaBadge";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function EventCard({ event }: { event: ChapterEvent }) {
  return (
    <article
      className={`relative rounded-xl border p-5 shadow-sm transition hover:shadow-md ${
        event.flagship
          ? "border-blue-300 bg-blue-50/60 dark:border-blue-800 dark:bg-blue-950/30"
          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {event.month} · {formatDate(event.date)}
          </p>
          <h3 className="mt-1 text-lg font-semibold">
            {event.flagship && "🏁 "}
            {event.title}
          </h3>
        </div>
        <div className="shrink-0 rounded-lg bg-slate-900 px-3 py-2 text-center text-white dark:bg-slate-100 dark:text-slate-900">
          <div className="text-lg font-bold leading-none">{event.pdus}</div>
          <div className="text-[10px] uppercase tracking-wide">PDUs</div>
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
        {event.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <AreaBadge area={event.area} />
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {event.format}
        </span>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {event.location}
        </span>
      </div>
    </article>
  );
}
