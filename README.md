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

- **`/`** — the yearly calendar (currently a sample year defined in
  `lib/events.ts` to illustrate the format), plus a running PDU total against
  PMI's 60-PDU / 3-year continuing certification cycle.
- **`/suggest`** — a form members can use to propose workshop topics, which
  files each submission as a GitHub issue (label `member-suggestion`) on this
  repo, so the committee has a running backlog to plan from.

Edit `lib/events.ts` to replace the sample calendar with the chapter's actual
confirmed dates, topics, and PDU values.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuring the suggestion form

The `/api/suggestions` route files a GitHub issue for each submission. It
needs a token with `Issues: write` access on this repo, set as `GITHUB_TOKEN`
in the Vercel project's environment variables (Settings → Environment
Variables) — **this is already configured on the live deployment.**

Without `GITHUB_TOKEN` set, the form returns a clear "not configured yet"
error instead of failing silently, so if suggestions stop working, check
there first (e.g. the PAT expired — fine-grained tokens have an expiry date
set at creation).

To rotate the token: create a new fine-grained PAT scoped to this repo with
**Issues: Read and write**, then replace the `GITHUB_TOKEN` value in Vercel
and redeploy (`vercel deploy --prod`) so the new value takes effect.

## Deploying

Already deployed and linked — see [Live links](#live-links) above. To deploy
manually: `npx vercel deploy --prod` from the project root (requires being
logged into the `ibocus` Vercel account via `vercel login`).
