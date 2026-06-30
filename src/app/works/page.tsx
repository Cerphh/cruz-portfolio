import type { Metadata } from "next";
import Link from "next/link";

import { WorksShowcase } from "@/components/works-showcase";

export const metadata: Metadata = {
  title: "Selected Works | Paul Oliver Cruz",
  description: "Selected case studies by Paul Oliver Cruz highlighting practical product and frontend work.",
};

export default function WorksPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between border-b border-white/10 pb-5 text-sm text-white/70">
          <div>
            <p className="text-base font-semibold tracking-[0.3em] text-white/90 uppercase">
              Paul Oliver Cruz
            </p>
            <p className="mt-1 text-white/50">Selected works / case studies</p>
          </div>
          <Link
            href="/"
            className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:border-white/25 hover:bg-white/10"
          >
            Back home
          </Link>
        </header>

        <WorksShowcase />
      </div>
    </main>
  );
}