# PMI Mauritius Chapter — Yearly Workshop Calendar

A member proposal for the PMI Mauritius Chapter: publish a full yearly plan of
workshops and events in advance, with the PDU value of each event so members
can plan their certification renewal, and a form so members can shape next
year's calendar with their own suggestions.

## Live links

| What | Where |
| --- | --- |
| Live site | https://pmi-mauritius-calendar.vercel.app |
| Member suggestions (GitHub issues, label `member-suggestion`) | https://github.com/ibocus/pmi-mauritius-calendar/issues |
| Visitor analytics (page views, visitors, referrers) | https://vercel.com/ibocus-projects/pmi-mauritius-calendar/analytics |
| Speed Insights (Core Web Vitals) | https://vercel.com/ibocus-projects/pmi-mauritius-calendar/speed-insights |
| Vercel project (deployments, env vars, settings) | https://vercel.com/ibocus-projects/pmi-mauritius-calendar |

Every push to `master` on GitHub auto-deploys to production via the
Vercel ↔ GitHub integration — no manual deploy step needed.

## What's here

- **`/`** — the yearly calendar, backed by the `pmi_events` table in Supabase
  (currently seeded with a sample 2027 year to illustrate the format), plus a
  running PDU total against PMI's 60-PDU / 3-year continuing certification
  cycle.
- **`/suggest`** — a form members can use to propose workshop topics. Each
  submission is stored in the `pmi_suggestions` table in Supabase, and also
  filed as a GitHub issue (label `member-suggestion`) on this repo if
  `GITHUB_TOKEN` is configured, so the committee has a running backlog to
  plan from.

## Database (Supabase)

This project shares a Supabase project ("ibocus's Project") with other
personal apps — tables are prefixed `pmi_` to keep them distinct. Schema and
seed data live in `supabase-schema.sql` at the repo root (run once via the
Supabase SQL editor; safe to re-run, uses `on conflict do nothing`).

- `pmi_events` — the calendar. Public read access (RLS). To update the real
  calendar once the committee confirms dates, edit rows directly in the
  Supabase table editor or via SQL — there's no admin UI in the app itself.
- `pmi_suggestions` — member suggestions. Public insert only (RLS) — no
  public read, so submitter emails aren't exposed; view them in the Supabase
  table editor.

Env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and a
few Postgres/Supabase variants) are synced automatically from Supabase to
this Vercel project's Production, Preview, and Development environments via
the Supabase ↔ Vercel integration. Run `vercel env pull .env.local` to get
them locally.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuring the suggestion form

The `/api/suggestions` route always writes to the `pmi_suggestions` table in
Supabase. If `GITHUB_TOKEN` (a token with `Issues: write` access on this
repo) is also set in the Vercel project's environment variables, it
additionally files a GitHub issue per submission — this is best-effort and
won't fail the request if the token is missing or expired.

To rotate the token: create a new fine-grained PAT scoped to this repo with
**Issues: Read and write**, then replace the `GITHUB_TOKEN` value in Vercel
and redeploy (`vercel deploy --prod`) so the new value takes effect.

## Deploying

Already deployed and linked — see [Live links](#live-links) above. To deploy
manually: `npx vercel deploy --prod` from the project root (requires being
logged into the `ibocus` Vercel account via `vercel login`).
