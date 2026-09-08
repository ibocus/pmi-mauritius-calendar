import Link from "next/link";
import { EventCard } from "@/components/EventCard";
import { PduTracker } from "@/components/PduTracker";
import { events, YEAR } from "@/lib/events";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <section className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
          Member proposal · {YEAR} chapter calendar
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          One calendar, shared in advance, with PDUs attached to every event
        </h1>
        <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
          Instead of announcing workshops one at a time, the chapter publishes the full
          year up front — so members can block dates, plan their PMP/PgMP renewal around
          confirmed PDU totals, and tell the committee what they actually want to see
          before the schedule is locked in.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/suggest"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Suggest a workshop topic
          </Link>
          <a
            href="#calendar"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            View the {YEAR} calendar
          </a>
        </div>
      </section>

      <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            title: "Planned a year ahead",
            body: "Published before the year starts, so members can request leave, budget training funds, and avoid clashes.",
          },
          {
            title: "PDUs attached upfront",
            body: "Every event lists its Talent Triangle area and PDU value, so members can map the calendar straight onto their renewal cycle.",
          },
          {
            title: "Shaped by member input",
            body: "The \"Suggest a workshop\" form feeds directly into the committee's planning backlog for next year's calendar.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.body}</p>
          </div>
        ))}
      </section>

      <section className="mb-10">
        <PduTracker />
      </section>

      <section id="calendar" className="scroll-mt-20">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-xl font-bold">{YEAR} workshop &amp; event calendar</h2>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {events.length} events · sample dates, confirm with the committee
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
