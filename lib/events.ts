export type TalentTriangleArea = "Ways of Working" | "Power Skills" | "Business Acumen";

export type EventFormat = "In-person" | "Virtual" | "Hybrid";

export interface ChapterEvent {
  id: string;
  month: string;
  date: string; // ISO, placeholder — edit once real dates are confirmed
  title: string;
  description: string;
  format: EventFormat;
  location: string;
  area: TalentTriangleArea;
  pdus: number;
  flagship?: boolean;
}

// Sample 2027 calendar — a realistic placeholder shape for a PMI chapter year.
// Swap titles/dates/PDU values once the committee + member input finalize the real plan.
export const YEAR = 2027;

export const events: ChapterEvent[] = [
  {
    id: "jan-kickoff",
    month: "January",
    date: "2027-01-16",
    title: "Chapter Kickoff & Annual Calendar Preview",
    description:
      "Open the year with the board: walk through the full 2027 calendar, gather live feedback on topics, and preview the PDU plan for the year.",
    format: "In-person",
    location: "Port Louis",
    area: "Power Skills",
    pdus: 1.5,
  },
  {
    id: "feb-agile",
    month: "February",
    date: "2027-02-13",
    title: "Agile Ways of Working Workshop",
    description:
      "Hands-on session on Scrum, Kanban, and hybrid delivery models for teams operating in regulated or client-facing environments.",
    format: "In-person",
    location: "Ebène",
    area: "Ways of Working",
    pdus: 3,
  },
  {
    id: "mar-risk",
    month: "March",
    date: "2027-03-13",
    title: "Practical Risk Management",
    description:
      "Case-study driven session on risk registers, quantitative risk analysis, and escalation practices that hold up under audit.",
    format: "Virtual",
    location: "Online",
    area: "Ways of Working",
    pdus: 2,
  },
  {
    id: "apr-leadership",
    month: "April",
    date: "2027-04-17",
    title: "Leadership & Stakeholder Communication",
    description:
      "Building influence without authority — communicating up, down, and across matrixed organizations.",
    format: "In-person",
    location: "Port Louis",
    area: "Power Skills",
    pdus: 2,
  },
  {
    id: "may-pmp-bootcamp",
    month: "May",
    date: "2027-05-15",
    title: "PMP Exam Prep Bootcamp",
    description:
      "Full-day intensive covering the exam content outline, practice questions, and study planning for members pursuing certification.",
    format: "In-person",
    location: "Ebène",
    area: "Ways of Working",
    pdus: 6,
  },
  {
    id: "jun-business-acumen",
    month: "June",
    date: "2027-06-12",
    title: "Business Acumen: Strategic Alignment & ROI",
    description:
      "Connecting project delivery to business value — benefits realization, ROI framing, and portfolio prioritization.",
    format: "Virtual",
    location: "Online",
    area: "Business Acumen",
    pdus: 2,
  },
  {
    id: "jul-ai-pm",
    month: "July",
    date: "2027-07-17",
    title: "AI & Automation in Project Management",
    description:
      "Practical look at AI-assisted scheduling, reporting, and risk analysis tools, with a live demo and Q&A.",
    format: "Hybrid",
    location: "Ebène + Online",
    area: "Ways of Working",
    pdus: 2.5,
  },
  {
    id: "aug-mixer",
    month: "August",
    date: "2027-08-14",
    title: "Mid-Year Networking Mixer & Career Panel",
    description:
      "Informal networking followed by a panel of senior PMs and sponsors on career growth in Mauritius and the region.",
    format: "In-person",
    location: "Port Louis",
    area: "Power Skills",
    pdus: 1,
  },
  {
    id: "sep-agile-portfolio",
    month: "September",
    date: "2027-09-18",
    title: "Agile Portfolio Management Deep Dive",
    description:
      "Scaling agile practices beyond the team level — portfolio Kanban, capacity planning, and governance trade-offs.",
    format: "In-person",
    location: "Ebène",
    area: "Ways of Working",
    pdus: 3,
  },
  {
    id: "oct-pm-day",
    month: "October",
    date: "2027-10-16",
    title: "PM Day — Annual Conference",
    description:
      "The chapter's flagship full-day event: keynote speakers, breakout tracks across all three Talent Triangle areas, and the AGM.",
    format: "In-person",
    location: "Port Louis",
    area: "Business Acumen",
    pdus: 8,
    flagship: true,
  },
  {
    id: "nov-negotiation",
    month: "November",
    date: "2027-11-13",
    title: "Negotiation & Conflict Resolution",
    description:
      "Techniques for resolving scope, resource, and priority conflicts without damaging stakeholder relationships.",
    format: "Virtual",
    location: "Online",
    area: "Power Skills",
    pdus: 2,
  },
  {
    id: "dec-review",
    month: "December",
    date: "2027-12-11",
    title: "Year in Review & Volunteer Recognition",
    description:
      "Closing the year: chapter achievements, volunteer recognition, and a first look at member priorities for next year's calendar.",
    format: "In-person",
    location: "Port Louis",
    area: "Business Acumen",
    pdus: 1.5,
  },
];

export const totalPdus = events.reduce((sum, e) => sum + e.pdus, 0);

export const pdusByArea = events.reduce<Record<TalentTriangleArea, number>>(
  (acc, e) => {
    acc[e.area] = (acc[e.area] ?? 0) + e.pdus;
    return acc;
  },
  { "Ways of Working": 0, "Power Skills": 0, "Business Acumen": 0 }
);

// PMI's continuing certification requirement for PMP holders: 60 PDUs per 3-year cycle.
export const CCR_CYCLE_TARGET = 60;
