"use client";
import { clsx } from "clsx";

export type BadgeVariant =
  | "active" | "suspended" | "pending" | "local" | "interstate"
  | "delivered" | "transit" | "processing" | "assigned" | "confirmed"
  | "online" | "offline" | "rejected" | "picked";

const VARIANTS: Record<BadgeVariant, string> = {
  active:      "bg-green-100 text-green-800",
  suspended:   "bg-red-100 text-red-800",
  pending:     "bg-amber-100 text-amber-800",
  local:       "bg-blue-100 text-blue-800",
  interstate:  "bg-violet-100 text-violet-800",
  delivered:   "bg-green-100 text-green-700",
  transit:     "bg-blue-100 text-blue-700",
  processing:  "bg-orange-100 text-orange-700",
  assigned:    "bg-violet-100 text-violet-700",
  confirmed:   "bg-blue-100 text-blue-700",
  online:      "bg-green-100 text-green-700",
  offline:     "bg-neutral-100 text-neutral-500",
  rejected:    "bg-red-100 text-red-700",
  picked:      "bg-amber-100 text-amber-700",
};

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span className={clsx(
      "inline-flex items-center gap-1 px-2.5 py-[3px] rounded-full text-[0.7rem] font-semibold whitespace-nowrap",
      VARIANTS[variant] ?? "bg-neutral-100 text-neutral-600",
      className
    )}>
      {children}
    </span>
  );
}
