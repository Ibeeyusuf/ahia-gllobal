"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, ShoppingBag, Users, BarChart2,
  Wallet, Star, Truck, Store, Headphones, LogOut, X,
} from "lucide-react";
import { clsx } from "clsx";
import { useVendor } from "@/context/VendorContext";

const NAV = [
  { section:"Main",     href:"/vendor",           label:"Dashboard",       icon:LayoutDashboard },
  { section:"Main",     href:"/vendor/products",  label:"Products",        icon:Package,   badge:"24"  },
  { section:"Main",     href:"/vendor/orders",    label:"Orders",          icon:ShoppingBag, badgeKey:"orders" },
  { section:"Main",     href:"/vendor/customers", label:"Customers",       icon:Users             },
  { section:"Insights", href:"/vendor/analytics", label:"Analytics",       icon:BarChart2         },
  { section:"Insights", href:"/vendor/wallet",    label:"Wallet / Earnings",icon:Wallet           },
  { section:"Store",    href:"/vendor/reviews",   label:"Reviews",         icon:Star,  reviewBadge:true },
  { section:"Store",    href:"/vendor/shipping",  label:"Shipping Settings",icon:Truck            },
  { section:"Store",    href:"/vendor/store",     label:"Store Settings",  icon:Store             },
  { section:"Store",    href:"/vendor/support",   label:"Support",         icon:Headphones        },
];

interface Props { open: boolean; onClose: () => void; }

export function VendorSidebar({ open, onClose }: Props) {
  const pathname = usePathname();
  const { orders } = useVendor();
  const pendingCount = orders.pending?.length ?? 0;

  const sections = ["Main", "Insights", "Store"];

  return (
    <>
      {open && <div className="lg:hidden fixed inset-0 z-[199] bg-neutral-900/50" onClick={onClose} />}
      <aside className={clsx(
        "fixed top-0 left-0 z-[200] w-56 h-screen bg-neutral-900 flex flex-col transition-transform duration-300 lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="px-4 py-[18px] border-b border-white/[0.06] flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-heading font-bold text-sm flex-shrink-0">A</div>
          <div>
            <p className="font-heading font-bold text-white text-[0.88rem] leading-tight">AhiaGlobal</p>
            <p className="text-[0.66rem] text-neutral-500 mt-0.5">Vendor Portal</p>
          </div>
          <button onClick={onClose} className="lg:hidden ml-auto text-neutral-500 hover:text-neutral-300"><X className="w-4 h-4" /></button>
        </div>

        {/* Vendor profile strip */}
        <div className="px-4 py-3.5 border-b border-white/[0.06] flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">TH</div>
          <div className="min-w-0 flex-1">
            <p className="text-[0.82rem] font-semibold text-neutral-200 truncate">TechHub Lagos</p>
            <p className="text-[0.68rem] text-neutral-500 mt-0.5">Electronics Store</p>
          </div>
          <span className="w-2 h-2 bg-green-500 rounded-full border-2 border-neutral-900 flex-shrink-0" />
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 flex flex-col gap-px">
          {sections.map(sec => (
            <div key={sec}>
              <p className="text-[0.63rem] font-bold text-neutral-600 uppercase tracking-widest px-3.5 pt-3.5 pb-1">{sec}</p>
              {NAV.filter(n => n.section === sec).map(({ href, label, icon: Icon, badge, badgeKey, reviewBadge }) => {
                const active = pathname === href;
                const badgeNum = badgeKey === "orders" ? pendingCount : reviewBadge ? 3 : null;
                return (
                  <Link key={href} href={href} onClick={onClose}
                    className={clsx(
                      "flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px] text-[0.82rem] font-medium transition-all whitespace-nowrap",
                      active
                        ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-600/30"
                        : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
                    )}>
                    <Icon className="w-[17px] h-[17px] flex-shrink-0" />
                    {label}
                    {(badge || badgeNum != null) && (
                      <span className={clsx(
                        "ml-auto text-[0.63rem] font-bold px-1.5 py-px rounded-full",
                        active ? "bg-white/25 text-white" : reviewBadge ? "bg-amber-500 text-white" : "bg-primary-600 text-white"
                      )}>
                        {badgeNum ?? badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="px-2 pb-3.5 border-t border-white/[0.06] pt-2 flex-shrink-0">
          <button className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px] text-[0.82rem] font-medium text-red-400 hover:bg-neutral-800 w-full transition-all">
            <LogOut className="w-[17px] h-[17px] flex-shrink-0" />Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
