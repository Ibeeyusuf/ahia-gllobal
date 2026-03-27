"use client";
import { usePathname } from "next/navigation";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";

const TITLES: Record<string, string> = {
  "/vendor":           "Dashboard",
  "/vendor/products":  "Products",
  "/vendor/orders":    "Orders",
  "/vendor/customers": "Customers",
  "/vendor/analytics": "Analytics",
  "/vendor/wallet":    "Wallet & Earnings",
  "/vendor/reviews":   "Reviews",
  "/vendor/shipping":  "Shipping Settings",
  "/vendor/store":     "Store Settings",
  "/vendor/support":   "Support",
};

interface Props { onMenuClick: () => void; }

export function VendorHeader({ onMenuClick }: Props) {
  const pathname = usePathname();
  const title = TITLES[pathname] ?? "Dashboard";

  return (
    <div className="flex-shrink-0 h-[60px] bg-white border-b border-neutral-100 flex items-center gap-3 px-5"
      style={{ boxShadow: "0 1px 8px rgba(15,23,42,.05)" }}>
      <button onClick={onMenuClick} className="lg:hidden p-1.5 rounded-lg hover:bg-neutral-100 transition-colors">
        <Menu className="w-5 h-5 text-neutral-600" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-sm flex items-center gap-2 bg-neutral-50 border-[1.5px] border-neutral-100 rounded-[10px] px-3 py-[7px]">
        <Search className="w-[15px] h-[15px] text-neutral-400 flex-shrink-0" />
        <input type="text" placeholder="Search products, orders…"
          className="bg-transparent outline-none text-[0.82rem] text-neutral-700 placeholder-neutral-400 w-full" />
      </div>

      <div className="ml-auto flex items-center gap-2.5">
        {/* Notifications */}
        <button className="relative p-2 border-[1.5px] border-neutral-100 rounded-[10px] bg-white hover:bg-neutral-50 transition-colors">
          <Bell className="w-[17px] h-[17px] text-neutral-500" />
          <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] bg-primary-600 rounded-full border-[1.5px] border-white" />
        </button>
        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer px-2.5 py-[5px] pl-1.5 border-[1.5px] border-neutral-100 rounded-[10px] bg-white hover:bg-neutral-50 transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center text-white text-[0.7rem] font-bold">TH</div>
          <span className="text-[0.8rem] font-semibold text-neutral-700 whitespace-nowrap hidden sm:block">TechHub Lagos</span>
          <ChevronDown className="w-3 h-3 text-neutral-400" />
        </div>
      </div>
    </div>
  );
}
