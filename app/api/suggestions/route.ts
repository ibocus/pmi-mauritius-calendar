import { NextRequest, NextResponse } from "next/server";

const GITHUB_REPO = process.env.SUGGESTIONS_REPO ?? "ibocus/pmi-mauritius-calendar";

interface SuggestionPayload {
  topic: string;
  area?: string;
  format?: string;
  month?: string;
  name?: string;
  email?: string;
  comments?: string;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: NextRequest) {
  let body: SuggestionPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isNonEmptyString(body.topic)) {
    return NextResponse.json({ error: "A workshop topic is required." }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Suggestions are not configured yet. Set GITHUB_TOKEN in the deployment environment." },
      { status: 503 }
    );
  }

  const title = `Suggestion: ${body.topic.trim()}`;
  const lines = [
    `**Topic:** ${body.topic.trim()}`,
    body.area && `**Talent Triangle area:** ${body.area}`,
    body.format && `**Preferred format:** ${body.format}`,
    body.month && `**Preferred month:** ${body.month}`,
    body.comments && `**Comments:** ${body.comments.trim()}`,
    "---",
    body.name ? `Submitted by: ${body.name.trim()}` : "Submitted anonymously",
    body.email && `Contact: ${body.email.trim()}`,
  ].filter(Boolean);

  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      title,
      body: lines.join("\n\n"),
      labels: ["member-suggestion"],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    return NextResponse.json(
      { error: "Could not submit the suggestion right now. Please try again later.", detail },
      { status: 502 }
    );
  }

  const issue = await res.json();
  return NextResponse.json({ ok: true, url: issue.html_url }, { status: 201 });
}
