import { NextRequest, NextResponse } from "next/server";
import { buildGoogleWalletSaveUrl, getGoogleWalletConfig } from "@/lib/google-wallet";

const DEFAULT_NAME = "Sample Member";
const DEFAULT_MEMBER_ID = "PMI-MU-000000";

// Google Wallet object identifiers only allow letters, digits, '.', '_', '-'.
function sanitizeMemberId(raw: string): string {
  const cleaned = raw.trim().replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 20);
  return cleaned || DEFAULT_MEMBER_ID;
}

function sanitizeName(raw: string): string {
  const trimmed = raw.trim().slice(0, 60);
  return trimmed || DEFAULT_NAME;
}

export async function GET(request: NextRequest) {
  const config = getGoogleWalletConfig();
  if (!config) {
    return NextResponse.json(
      { error: "Google Wallet isn't configured yet." },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const name = sanitizeName(searchParams.get("name") ?? "");
  const memberId = sanitizeMemberId(searchParams.get("memberId") ?? "");

  const saveUrl = buildGoogleWalletSaveUrl(config, {
    memberId,
    name,
    memberSince: "2024",
    validThru: "Dec 2027",
  });

  return NextResponse.json({ saveUrl });
}
