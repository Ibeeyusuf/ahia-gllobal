"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Bike, Banknote, Settings, LogOut, X } from "lucide-react";
import { clsx } from "clsx";
import { useCompany } from "@/context/CompanyContext";

const NAV = [
  { href:"/company",          label:"Overview",  icon:LayoutDashboard, section:"ops"     },
  { href:"/company/orders",   label:"Orders",    icon:Package,          section:"ops", badge:"18" },
  { href:"/company/riders",   label:"Riders",    icon:Bike,             section:"ops", badge:"12" },
  { href:"/company/earnings", label:"Earnings",  icon:Banknote,         section:"ops"     },
  { href:"/company/settings", label:"Settings",  icon:Settings,         section:"account" },
];

interface Props { open: boolean; onClose: () => void; }

export function CompanySidebar({ open, onClose }: Props) {
  const pathname = usePathname();
  const { companyType, setCompanyType } = useCompany();

  return (
    <>
      {open && <div className="lg:hidden fixed inset-0 z-[199] bg-neutral-900/50" onClick={onClose} />}
      <aside className={clsx(
        "fixed top-0 left-0 z-[200] w-60 min-h-screen bg-neutral-900 flex flex-col transition-transform duration-300 lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="px-4 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center font-heading font-bold text-white text-sm flex-shrink-0">LE</div>
            <div className="min-w-0 flex-1">
              <p className="font-heading font-bold text-white text-sm truncate">Lagos Express Co.</p>
              <span className={clsx("text-[10px] font-bold px-2 py-0.5 rounded-full",
                companyType === "local" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"
              )}>{companyType === "local" ? "LOCAL" : "INTERSTATE"}</span>
            </div>
            <button onClick={onClose} className="lg:hidden text-neutral-500 hover:text-neutral-300"><X className="w-4 h-4" /></button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {["ops","account"].map(sec => (
            <div key={sec}>
              <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest px-3 mb-2 mt-3">
                {sec === "ops" ? "Operations" : "Account"}
              </p>
              {NAV.filter(n=>n.section===sec).map(({ href, label, icon:Icon, badge }) => {
                const active = pathname === href;
                return (
                  <Link key={href} href={href} onClick={onClose}
                    className={clsx("flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all",
                      active ? "bg-primary-600/15 text-primary-400 font-semibold" : "text-neutral-400 hover:bg-white/6 hover:text-neutral-200"
                    )}>
                    <Icon className={clsx("w-[1.125rem] h-[1.125rem] flex-shrink-0", active ? "text-primary-600" : "text-neutral-600")} />
                    {label}
                    {badge && <span className="ml-auto bg-neutral-700 text-neutral-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">CM</div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">Company Manager</p>
              <p className="text-[10px] text-neutral-500 truncate">manager@lagosexpress.ng</p>
            </div>
            <button className="text-neutral-500 hover:text-neutral-300"><LogOut className="w-4 h-4" /></button>
          </div>
        </div>
      </aside>
    </>
  );
}
