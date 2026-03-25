"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Banknote, User } from "lucide-react";
import { clsx } from "clsx";

const TABS = [
  { href: "/rider",          label: "Home",     icon: LayoutDashboard },
  { href: "/rider/orders",   label: "Orders",   icon: Package         },
  { href: "/rider/earnings", label: "Earnings", icon: Banknote        },
  { href: "/rider/profile",  label: "Profile",  icon: User            },
];

export function RiderMobileNav() {
  const pathname = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-100 z-50 grid grid-cols-4 py-2"
      style={{ boxShadow: "0 -4px 20px -4px rgba(15,23,42,.1)" }}>
      {TABS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href}
            className={clsx("flex flex-col items-center gap-1 py-1 transition-colors", active ? "text-primary-600" : "text-neutral-400")}>
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-semibold">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
