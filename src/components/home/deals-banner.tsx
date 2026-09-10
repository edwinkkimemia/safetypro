import Link from "next/link";
import { ArrowRight, BadgePercent } from "lucide-react";

export function DealsBanner() {
  return (
    <section className="bg-white pb-16 lg:pb-20" aria-label="Deals">
      <div className="mx-auto max-w-shell px-4 lg:px-8">
        <Link
          href="/deals"
          className="group relative block overflow-hidden rounded-3xl bg-gradient-to-r from-navy-900 via-danger to-amber-500 shadow-deal"
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:20px_20px]" />
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
          <div className="absolute right-8 top-4 hidden rotate-3 rounded-2xl bg-white px-4 py-2 text-center shadow-xl lg:block">
            <p className="text-[10px] font-bold uppercase tracking-widest text-danger">Save up to</p>
            <p className="font-display text-2xl font-extrabold text-navy-900">35% OFF</p>
          </div>
          <div className="relative flex flex-col items-start gap-6 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-danger shadow-md">
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-danger" /></span>
                <BadgePercent className="h-3.5 w-3.5" /> Flash Sale
              </span>
              <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                Safety Week Mega Sale
                <br className="hidden sm:block" /> Up to 35% off bulk orders
              </h2>
              <p className="mt-2 text-sm text-white/90">
                Helmets, gloves, boots, respirators & first aid — <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-navy-900">78% claimed</span>
              </p>
              <div className="mt-3 hidden items-center gap-2 sm:flex">
                <span className="rounded-lg bg-black/20 px-2 py-1 font-mono text-xs font-bold text-white backdrop-blur">04</span>
                <span className="text-white/60">:</span>
                <span className="rounded-lg bg-black/20 px-2 py-1 font-mono text-xs font-bold text-white backdrop-blur">21</span>
                <span className="text-white/60">:</span>
                <span className="rounded-lg bg-black/20 px-2 py-1 font-mono text-xs font-bold text-white backdrop-blur">33</span>
                <span className="ml-2 text-xs font-bold text-white/80">left</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-navy-900 shadow-lg">
                🔥 Ends Sunday
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-navy-900 shadow-xl transition-all group-hover:scale-105">
                Shop Deals <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
