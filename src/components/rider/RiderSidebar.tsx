"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Banknote, User, X } from "lucide-react";
import { clsx } from "clsx";
import { useRider } from "@/context/RiderContext";

const NAV = [
  { href: "/rider",          label: "Dashboard", icon: LayoutDashboard },
  { href: "/rider/orders",   label: "My Orders", icon: Package          },
  { href: "/rider/earnings", label: "Earnings",  icon: Banknote         },
  { href: "/rider/profile",  label: "My Profile",icon: User             },
];

interface Props { open: boolean; onClose: () => void; }

export function RiderSidebar({ open, onClose }: Props) {
  const pathname = usePathname();
  const { isOnline, orders } = useRider();
  const pendingCount = orders.filter(o => o.status === "pending").length;

  return (
    <>
      {open && <div className="lg:hidden fixed inset-0 z-[199] bg-neutral-900/50" onClick={onClose} />}
      <aside className={clsx(
        "fixed top-0 left-0 z-[200] w-60 min-h-screen bg-neutral-900 flex flex-col transition-transform duration-300 lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Rider info */}
        <div className="px-4 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="w-11 h-11 rounded-full bg-primary-600 flex items-center justify-center font-heading font-bold text-white text-lg">EO</div>
              <span className={clsx(
                "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-neutral-900",
                isOnline ? "bg-green-500" : "bg-neutral-500"
              )} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-heading font-bold text-white text-sm">Emeka Okafor</p>
              <p className="text-[10px] text-neutral-500">Lagos Express Co.</p>
              <p className={clsx("text-[10px] font-semibold mt-0.5", isOnline ? "text-green-400" : "text-neutral-500")}>
                ● {isOnline ? "Online" : "Offline"}
              </p>
            </div>
            <button onClick={onClose} className="lg:hidden text-neutral-500 hover:text-neutral-300"><X className="w-4 h-4" /></button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5 mt-2">
          <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest px-3 mb-2">Rider</p>
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} onClick={onClose}
                className={clsx(
                  "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all",
                  active ? "bg-primary-600/15 text-primary-400 font-semibold" : "text-neutral-400 hover:bg-white/6 hover:text-neutral-200"
                )}>
                <Icon className={clsx("w-[1.125rem] h-[1.125rem] flex-shrink-0", active ? "text-primary-600" : "text-neutral-600")} />
                {label}
                {href === "/rider/orders" && pendingCount > 0 && (
                  <span className="ml-auto bg-primary-600/20 text-primary-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{pendingCount}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold">EO</div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white">Emeka Okafor</p>
              <p className="text-[10px] text-neutral-500">Motorcycle · Lagos</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
