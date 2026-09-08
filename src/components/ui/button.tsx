import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "success" | "dark" | "white";
type Size = "sm" | "md" | "lg" | "xl";

const variants: Record<Variant, string> = {
  primary:
    "bg-teal-500 text-white hover:bg-teal-600 shadow-[0_4px_14px_rgba(8,168,138,0.35)]",
  secondary:
    "bg-navy-700 text-white hover:bg-navy-800 shadow-[0_4px_14px_rgba(6,59,112,0.35)]",
  outline:
    "border border-line bg-white text-navy-700 hover:border-navy-300 hover:bg-navy-50",
  ghost: "text-navy-700 hover:bg-navy-50",
  success: "bg-teal-500 text-white hover:bg-teal-600",
  dark: "bg-slate-700 text-white hover:bg-slate-800",
  white: "bg-white text-navy-700 hover:bg-teal-50",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-[15px] gap-2",
  xl: "h-14 px-8 text-base gap-2.5",
};

const base =
  "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: Size; href: string }) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Link>
  );
}

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: "neutral" | "success" | "warning" | "danger" | "safety" | "navy";
  className?: string;
  children: ReactNode;
}) {
  const tones = {
    neutral: "bg-slate-50 text-slate-700 border-slate-200",
    success: "bg-teal-50 text-teal-700 border-teal-100",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
    danger: "bg-accent-50 text-accent-600 border-accent-100",
    safety: "bg-teal-50 text-teal-700 border-teal-100",
    navy: "bg-navy-700 text-white",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none border",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
