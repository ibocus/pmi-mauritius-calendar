"use client";

import { useState } from "react";

interface WalletButtonsProps {
  name: string;
  memberId: string;
}

export function WalletButtons({ name, memberId }: WalletButtonsProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleGoogleWallet() {
    setStatus("loading");
    setError(null);
    try {
      const params = new URLSearchParams({ name, memberId });
      const res = await fetch(`/api/wallet/google?${params.toString()}`);
      const body = await res.json();
      if (!res.ok || !body.saveUrl) {
        throw new Error(body.error ?? "Google Wallet isn't connected yet.");
      }
      window.location.href = body.saveUrl;
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled
          title="Coming soon — requires the chapter's Apple Developer account"
          className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white opacity-50 dark:bg-slate-100 dark:text-slate-900"
        >
          <AppleLogo />
          Add to Apple Wallet
        </button>

        <button
          type="button"
          onClick={handleGoogleWallet}
          disabled={status === "loading"}
          className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        >
          <GoogleLogo />
          {status === "loading" ? "Preparing…" : "Add to Google Wallet"}
        </button>
      </div>

      {status === "error" && (
        <p className="text-sm text-amber-600 dark:text-amber-400" role="alert">
          {error} This is expected until the chapter's Google Wallet issuer account is set up.
        </p>
      )}
    </div>
  );
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.415 2.02-1.244 2.833-.914.905-2.007 1.427-3.19 1.33-.062-1.09.42-2.18 1.24-2.964.86-.83 2.13-1.35 3.194-1.2zM20.5 17.2c-.55 1.24-.82 1.795-1.53 2.9-1 1.57-2.4 3.52-4.14 3.535-1.55.014-1.95-1.005-4.06-1.005-2.1 0-2.55 0.99-4.1 1.02-1.66.03-2.93-1.68-3.93-3.24-2.03-3.19-3.59-9.02-1.5-12.96 1.03-1.94 2.86-3.16 4.86-3.19 1.62-.03 2.65 1.09 4.05 1.09 1.4 0 1.97-1.09 4.06-1.06 1.03.02 2.65.36 3.94 2.29-3.9 2.38-3.27 7.08.34 9.62z" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09A6.98 6.98 0 0 1 5.44 12c0-.73.13-1.43.36-2.09V7.07H2.18A11.97 11.97 0 0 0 1 12c0 1.93.46 3.76 1.18 5.35z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.65l3.66 2.84c.87-2.6 3.3-4.11 6.16-4.11z"
      />
    </svg>
  );
}
