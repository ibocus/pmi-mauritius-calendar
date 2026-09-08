# PMI Mauritius Chapter — Yearly Workshop Calendar

A member proposal for the PMI Mauritius Chapter: publish a full yearly plan of
workshops and events in advance, with the PDU value of each event so members
can plan their certification renewal, and a form so members can shape next
year's calendar with their own suggestions.

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
needs a token with `Issues: write` access on this repo:

1. Create a fine-grained GitHub PAT scoped to this repo with the **Issues**
   permission set to **Read and write**.
2. Set it as `GITHUB_TOKEN` in your deployment environment (e.g. Vercel
   project → Settings → Environment Variables).

Without `GITHUB_TOKEN` set, the form returns a clear "not configured yet"
error instead of failing silently.

## Deploying

Deploy on [Vercel](https://vercel.com/new) — import this repo, add the
`GITHUB_TOKEN` environment variable, and deploy.
