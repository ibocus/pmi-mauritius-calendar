import type { Metadata } from "next";
import { MembershipCardForm } from "@/components/MembershipCardForm";

export const metadata: Metadata = {
  title: "Digital membership card — PMI Mauritius Chapter",
};

export default function MembershipCardPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
        Concept preview
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
        A digital membership card members can save to their phone
      </h1>
      <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
        ISACA recently rolled out a digital membership card that adds to Apple
        Wallet or Google Wallet — instant access to member details from the
        lock screen, no more digging for a login or a PDF. This page is a
        concept preview of what the same idea could look like for the PMI
        Mauritius Chapter, to gauge member interest before the committee
        commits to building it for real.
      </p>

      <div className="mt-10">
        <MembershipCardForm />
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        <h2 className="font-semibold text-slate-900 dark:text-slate-100">
          What it would take to ship this for real
        </h2>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>
            A member roster (name, PMI ID, status, renewal date) the card can
            pull from instead of the sample data shown here.
          </li>
          <li>
            A way for a member to prove who they are before they get a card
            (e.g. a login, or a one-time link emailed to their PMI address).
          </li>
          <li>
            Google Wallet: a free Google Wallet Issuer account for the
            chapter (self-service, no yearly fee).
          </li>
          <li>
            Apple Wallet: an Apple Developer Program membership for the
            chapter ($99/year) plus a signing certificate.
          </li>
        </ul>
      </div>
    </div>
  );
}
