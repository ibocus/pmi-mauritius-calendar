create table if not exists pmi_events (
  id text primary key,
  month text not null,
  date date not null,
  title text not null,
  description text not null,
  format text not null check (format in ('In-person','Virtual','Hybrid')),
  location text not null,
  area text not null check (area in ('Ways of Working','Power Skills','Business Acumen')),
  pdus numeric not null,
  flagship boolean not null default false,
  created_at timestamptz not null default now()
);

alter table pmi_events enable row level security;

drop policy if exists "Public read access" on pmi_events;
create policy "Public read access" on pmi_events for select using (true);

create table if not exists pmi_suggestions (
  id uuid primary key default gen_random_uuid(),
  topic text not null,
  area text,
  format text,
  month text,
  name text,
  email text,
  comments text,
  created_at timestamptz not null default now()
);

alter table pmi_suggestions enable row level security;

drop policy if exists "Public insert" on pmi_suggestions;
create policy "Public insert" on pmi_suggestions for insert with check (true);

insert into pmi_events (id, month, date, title, description, format, location, area, pdus, flagship) values
  ('jan-kickoff', 'January', '2027-01-16', 'Chapter Kickoff & Annual Calendar Preview', 'Open the year with the board: walk through the full 2027 calendar, gather live feedback on topics, and preview the PDU plan for the year.', 'In-person', 'Port Louis', 'Power Skills', 1.5, false),
  ('feb-agile', 'February', '2027-02-13', 'Agile Ways of Working Workshop', 'Hands-on session on Scrum, Kanban, and hybrid delivery models for teams operating in regulated or client-facing environments.', 'In-person', 'Ebène', 'Ways of Working', 3, false),
  ('mar-risk', 'March', '2027-03-13', 'Practical Risk Management', 'Case-study driven session on risk registers, quantitative risk analysis, and escalation practices that hold up under audit.', 'Virtual', 'Online', 'Ways of Working', 2, false),
  ('apr-leadership', 'April', '2027-04-17', 'Leadership & Stakeholder Communication', 'Building influence without authority — communicating up, down, and across matrixed organizations.', 'In-person', 'Port Louis', 'Power Skills', 2, false),
  ('may-pmp-bootcamp', 'May', '2027-05-15', 'PMP Exam Prep Bootcamp', 'Full-day intensive covering the exam content outline, practice questions, and study planning for members pursuing certification.', 'In-person', 'Ebène', 'Ways of Working', 6, false),
  ('jun-business-acumen', 'June', '2027-06-12', 'Business Acumen: Strategic Alignment & ROI', 'Connecting project delivery to business value — benefits realization, ROI framing, and portfolio prioritization.', 'Virtual', 'Online', 'Business Acumen', 2, false),
  ('jul-ai-pm', 'July', '2027-07-17', 'AI & Automation in Project Management', 'Practical look at AI-assisted scheduling, reporting, and risk analysis tools, with a live demo and Q&A.', 'Hybrid', 'Ebène + Online', 'Ways of Working', 2.5, false),
  ('aug-mixer', 'August', '2027-08-14', 'Mid-Year Networking Mixer & Career Panel', 'Informal networking followed by a panel of senior PMs and sponsors on career growth in Mauritius and the region.', 'In-person', 'Port Louis', 'Power Skills', 1, false),
  ('sep-agile-portfolio', 'September', '2027-09-18', 'Agile Portfolio Management Deep Dive', 'Scaling agile practices beyond the team level — portfolio Kanban, capacity planning, and governance trade-offs.', 'In-person', 'Ebène', 'Ways of Working', 3, false),
  ('oct-pm-day', 'October', '2027-10-16', 'PM Day — Annual Conference', 'The chapter flagship full-day event: keynote speakers, breakout tracks across all three Talent Triangle areas, and the AGM.', 'In-person', 'Port Louis', 'Business Acumen', 8, true),
  ('nov-negotiation', 'November', '2027-11-13', 'Negotiation & Conflict Resolution', 'Techniques for resolving scope, resource, and priority conflicts without damaging stakeholder relationships.', 'Virtual', 'Online', 'Power Skills', 2, false),
  ('dec-review', 'December', '2027-12-11', 'Year in Review & Volunteer Recognition', 'Closing the year: chapter achievements, volunteer recognition, and a first look at member priorities for next years calendar.', 'In-person', 'Port Louis', 'Business Acumen', 1.5, false)
on conflict (id) do nothing;
