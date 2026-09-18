import { CCR_CYCLE_TARGET, TalentTriangleArea } from "@/lib/events";
import { AreaBadge } from "./AreaBadge";

interface PduTrackerProps {
  totalPdus: number;
  pdusByArea: Record<TalentTriangleArea, number>;
}

export function PduTracker({ totalPdus, pdusByArea }: PduTrackerProps) {
  const pct = Math.min(100, Math.round((totalPdus / CCR_CYCLE_TARGET) * 100));

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold">If you attend every event this year</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            You&apos;d earn <span className="font-semibold">{totalPdus} PDUs</span> toward
            PMI&apos;s 60-PDU / 3-year certification cycle.
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{totalPdus}</div>
          <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            of {CCR_CYCLE_TARGET} PDU cycle
          </div>
        </div>
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {Object.entries(pdusByArea).map(([area, pdus]) => (
          <div
            key={area}
            className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60"
          >
            <AreaBadge area={area as TalentTriangleArea} />
            <span className="text-sm font-semibold">{pdus} PDU</span>
          </div>
        ))}
      </div>
    </section>
  );
}
