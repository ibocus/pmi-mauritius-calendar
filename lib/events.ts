import { getSupabase } from "@/lib/supabase";

export type TalentTriangleArea = "Ways of Working" | "Power Skills" | "Business Acumen";

export type EventFormat = "In-person" | "Virtual" | "Hybrid";

export interface ChapterEvent {
  id: string;
  month: string;
  date: string; // ISO
  title: string;
  description: string;
  format: EventFormat;
  location: string;
  area: TalentTriangleArea;
  pdus: number;
  flagship?: boolean;
}

// PMI's continuing certification requirement for PMP holders: 60 PDUs per 3-year cycle.
export const CCR_CYCLE_TARGET = 60;

export async function getEvents(): Promise<ChapterEvent[]> {
  const { data, error } = await getSupabase()
    .from("pmi_events")
    .select("id, month, date, title, description, format, location, area, pdus, flagship")
    .order("date", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export function totalPdus(events: ChapterEvent[]): number {
  return events.reduce((sum, e) => sum + e.pdus, 0);
}

export function pdusByArea(events: ChapterEvent[]): Record<TalentTriangleArea, number> {
  return events.reduce<Record<TalentTriangleArea, number>>(
    (acc, e) => {
      acc[e.area] = (acc[e.area] ?? 0) + e.pdus;
      return acc;
    },
    { "Ways of Working": 0, "Power Skills": 0, "Business Acumen": 0 }
  );
}

export function calendarYear(events: ChapterEvent[]): number {
  if (events.length === 0) return new Date().getFullYear();
  return new Date(events[0].date).getFullYear();
}
