"use client";
import { usePathname } from "next/navigation";
import { Menu, Bell } from "lucide-react";
import { useCompany } from "@/context/CompanyContext";
import { useToast } from "@/components/ui/Toast";
import { clsx } from "clsx";

const PAGE_TITLES: Record<string, string> = {
  "/company":          "Overview",
  "/company/orders":   "Orders",
  "/company/riders":   "Riders",
  "/company/earnings": "Earnings",
  "/company/settings": "Settings",
};

interface Props { onMenuClick: () => void; }

export function CompanyHeader({ onMenuClick }: Props) {
  const pathname = usePathname();
  const { companyType, setCompanyType } = useCompany();
  const showToast = useToast();
  const title = PAGE_TITLES[pathname] ?? "Overview";

  function switchType(t: "local" | "interstate") {
    setCompanyType(t);
    showToast("info", "Mode Switched", `Switched to ${t === "local" ? "Local" : "Interstate"} operations view.`);
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-100 px-4 lg:px-6 py-3.5 flex items-center gap-4">
      <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors">
        <Menu className="w-5 h-5 text-neutral-600" />
      </button>
      <div className="flex-1 min-w-0">
        <h1 className="font-heading font-bold text-neutral-900 text-base">{title}</h1>
        <p className="text-xs text-neutral-400">Company / {title}</p>
      </div>
      <div className="hidden sm:flex items-center gap-1 bg-neutral-100 rounded-full p-1">
        {(["local", "interstate"] as const).map(t => (
          <button key={t} onClick={() => switchType(t)}
            className={clsx(
              "px-3 py-1.5 rounded-full text-[0.8125rem] font-semibold border-2 transition-all",
              companyType === t && t === "local"      ? "bg-blue-100 text-blue-800 border-blue-300" :
              companyType === t && t === "interstate" ? "bg-violet-100 text-violet-800 border-violet-300" :
              "border-transparent text-neutral-500 hover:text-neutral-700"
            )}>
            {t === "local" ? "🏙 Local" : "🛣 Interstate"}
          </button>
        ))}
      </div>
      <button className="relative p-2 rounded-full hover:bg-neutral-100 transition-colors flex-shrink-0">
        <Bell className="w-5 h-5 text-neutral-600" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-600 rounded-full" />
      </button>
    </header>
  );
}
