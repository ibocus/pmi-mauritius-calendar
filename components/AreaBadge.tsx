import type { TalentTriangleArea } from "@/lib/events";

const styles: Record<TalentTriangleArea, string> = {
  "Ways of Working":
    "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  "Power Skills":
    "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
  "Business Acumen":
    "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
};

export function AreaBadge({ area }: { area: TalentTriangleArea }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[area]}`}
    >
      {area}
    </span>
  );
}
