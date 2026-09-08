import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PMI Mauritius Chapter — Yearly Workshop Calendar",
  description:
    "A yearly plan of PMI Mauritius Chapter workshops and events, with PDU values, shared in advance so members can plan their certification renewal.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <header className="border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="font-semibold tracking-tight">
              PMI Mauritius Chapter
              <span className="ml-2 hidden text-sm font-normal text-slate-500 dark:text-slate-400 sm:inline">
                Yearly Calendar
              </span>
            </Link>
            <nav className="flex gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                Calendar
              </Link>
              <Link href="/suggest" className="hover:text-blue-600 dark:hover:text-blue-400">
                Suggest a workshop
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          Proposal built for PMI Mauritius Chapter members. Not an official PMI, Inc. publication.
        </footer>
      </body>
    </html>
  );
}
