import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

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

async function fileGithubIssue(body: SuggestionPayload) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return;

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

  await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      title: `Suggestion: ${body.topic.trim()}`,
      body: lines.join("\n\n"),
      labels: ["member-suggestion"],
    }),
  }).catch(() => {});
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

  const { error } = await getSupabase().from("pmi_suggestions").insert({
    topic: body.topic.trim(),
    area: body.area || null,
    format: body.format || null,
    month: body.month || null,
    name: body.name?.trim() || null,
    email: body.email?.trim() || null,
    comments: body.comments?.trim() || null,
  });

  if (error) {
    return NextResponse.json(
      { error: "Could not submit the suggestion right now. Please try again later." },
      { status: 502 }
    );
  }

  await fileGithubIssue(body);

  return NextResponse.json({ ok: true }, { status: 201 });
}
