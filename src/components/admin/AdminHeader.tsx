"use client";
import { usePathname } from "next/navigation";
import { Menu, Search, Bell, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

const TITLES: Record<string, string> = {
  "/admin":            "Dashboard",
  "/admin/companies":  "Companies",
  "/admin/deliveries": "All Deliveries",
  "/admin/riders":     "All Riders",
  "/admin/analytics":  "Analytics",
  "/admin/settings":   "Settings",
};

interface AdminHeaderProps { onMenuClick: () => void; }

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();
  const title = TITLES[pathname] ?? "Dashboard";
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-NG", { weekday:"short", day:"numeric", month:"short", year:"numeric" }));
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-100 px-4 lg:px-6 py-3.5 flex items-center gap-4">
      <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors">
        <Menu className="w-5 h-5 text-neutral-600" />
      </button>

      <div className="flex-1 min-w-0">
        <h1 className="font-heading font-bold text-neutral-900 text-base">{title}</h1>
        <p className="text-xs text-neutral-400">AhiaGlobal / {title}</p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {today && (
          <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-500 bg-white border border-neutral-200 rounded-full px-3 py-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{today}</span>
          </div>
        )}
        <div className="hidden sm:flex items-center gap-2 bg-neutral-100 rounded-full px-3 py-2">
          <Search className="w-3.5 h-3.5 text-neutral-400" />
          <input type="text" placeholder="Search..." className="bg-transparent outline-none w-28 text-neutral-700 text-xs placeholder-neutral-400" />
        </div>
        <button className="relative p-2 rounded-full hover:bg-neutral-100 transition-colors">
          <Bell className="w-5 h-5 text-neutral-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-600 rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold">SA</div>
      </div>
    </header>
  );
}
