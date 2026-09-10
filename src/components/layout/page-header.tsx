import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function PageHeader({
  bg,
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  children,
  className,
}: {
  bg: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  breadcrumb?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden bg-navy-900", className)}>
      <Image
        src={bg}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-800/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
      <div className="absolute right-0 top-0 hidden h-full w-1/3 bg-gradient-to-l from-amber-500/10 to-transparent lg:block" />
      <div className="relative mx-auto max-w-shell px-4 py-14 lg:px-8 lg:py-16">
        {breadcrumb && (
          <nav className="mb-4 flex items-center gap-2 text-xs" aria-label="Breadcrumb">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-white/80 backdrop-blur">{breadcrumb}</span>
          </nav>
        )}
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-white shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-white pulse-dot" />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-white lg:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
}
