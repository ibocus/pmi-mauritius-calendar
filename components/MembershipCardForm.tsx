"use client";

import { useState } from "react";
import { MembershipCard } from "./MembershipCard";
import { WalletButtons } from "./WalletButtons";

const DEFAULT_NAME = "Sample Member";
const DEFAULT_MEMBER_ID = "PMI-MU-000000";

export function MembershipCardForm() {
  const [name, setName] = useState("");
  const [memberId, setMemberId] = useState("");

  const displayName = name.trim() || DEFAULT_NAME;
  const displayMemberId = memberId.trim() || DEFAULT_MEMBER_ID;

  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
      <div className="w-full max-w-sm space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Your name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
            placeholder="e.g. Priya Naidoo"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <div>
          <label htmlFor="memberId" className="block text-sm font-medium">
            PMI membership ID <span className="text-slate-400">(optional)</span>
          </label>
          <input
            id="memberId"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            maxLength={20}
            placeholder="e.g. 1234567"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          This is a concept preview — nothing here is checked against a real
          member list, so type whatever you like to see how your own card
          would look.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 sm:items-start">
        <MembershipCard
          name={displayName}
          memberId={displayMemberId}
          memberSince="2024"
          validThru="Dec 2027"
        />

        <div>
          <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">
            Try it — the Google Wallet button is wired up for real, the Apple
            Wallet button is a placeholder until the chapter has an Apple
            Developer account.
          </p>
          <WalletButtons name={displayName} memberId={displayMemberId} />
        </div>
      </div>
    </div>
  );
}
