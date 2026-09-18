import { NextResponse } from "next/server";
import { buildGoogleWalletSaveUrl, getGoogleWalletConfig } from "@/lib/google-wallet";

export async function GET() {
  const config = getGoogleWalletConfig();
  if (!config) {
    return NextResponse.json(
      { error: "Google Wallet isn't configured yet." },
      { status: 503 }
    );
  }

  const saveUrl = buildGoogleWalletSaveUrl(config, {
    memberId: "PMI-MU-000000",
    name: "Sample Member",
    memberSince: "2024",
    validThru: "Dec 2027",
  });

  return NextResponse.json({ saveUrl });
}
