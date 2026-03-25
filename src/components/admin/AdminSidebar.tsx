"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Building2, Package, Bike, BarChart2, Settings, LogOut, X,
} from "lucide-react";
import { clsx } from "clsx";

const NAV = [
  { href: "/admin",           label: "Dashboard",  icon: LayoutDashboard, section: "overview" },
  { href: "/admin/companies", label: "Companies",  icon: Building2,       section: "overview", badge: "12" },
  { href: "/admin/deliveries",label: "Deliveries", icon: Package,         section: "overview" },
  { href: "/admin/riders",    label: "All Riders", icon: Bike,            section: "overview" },
  { href: "/admin/analytics", label: "Analytics",  icon: BarChart2,       section: "system"   },
  { href: "/admin/settings",  label: "Settings",   icon: Settings,        section: "system"   },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-[199] bg-neutral-900/55 cursor-pointer" onClick={onClose} />
      )}

      <aside className={clsx(
        "fixed top-0 left-0 z-[200] w-60 min-h-screen bg-neutral-900 flex flex-col transition-transform duration-300",
        "lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="px-4 py-5 border-b border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center text-white font-heading font-bold text-base flex-shrink-0">A</div>
          <div>
            <p className="font-heading font-bold text-white text-sm">AhiaGlobal</p>
            <p className="text-[10px] text-neutral-500">Super Admin</p>
          </div>
          <button onClick={onClose} className="lg:hidden ml-auto text-neutral-500 hover:text-neutral-300">
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 mt-2 space-y-0.5">
          {["overview", "system"].map(section => {
            const items = NAV.filter(n => n.section === section);
            return (
              <div key={section}>
                <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest px-3 mb-2 mt-2">
                  {section}
                </p>
                {items.map(({ href, label, icon: Icon, badge }) => {
                  const active = pathname === href;
                  return (
                    <Link key={href} href={href} onClick={onClose}
                      className={clsx(
                        "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all",
                        active ? "bg-primary-600/18 text-primary-400 font-semibold" : "text-neutral-400 hover:bg-white/7 hover:text-neutral-200"
                      )}>
                      <Icon className={clsx("w-[1.1rem] h-[1.1rem] flex-shrink-0", active ? "text-primary-600" : "text-neutral-600")} />
                      {label}
                      {badge && (
                        <span className="ml-auto bg-primary-600/20 text-primary-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold">SA</div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">Super Admin</p>
              <p className="text-[10px] text-neutral-500">admin@ahiaglobal.com</p>
            </div>
            <button className="text-neutral-500 hover:text-neutral-300"><LogOut className="w-4 h-4" /></button>
          </div>
        </div>
      </aside>
    </>
  );
}
