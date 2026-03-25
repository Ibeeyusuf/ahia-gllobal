"use client";
import { usePathname } from "next/navigation";
import { Menu, Bell, Wifi, WifiOff } from "lucide-react";
import { useRider } from "@/context/RiderContext";
import { useToast } from "@/components/ui/Toast";
import { clsx } from "clsx";

const PAGE_TITLES: Record<string, string> = {
  "/rider":          "Dashboard",
  "/rider/orders":   "My Orders",
  "/rider/earnings": "Earnings",
  "/rider/profile":  "My Profile",
};

interface Props { onMenuClick: () => void; }

export function RiderHeader({ onMenuClick }: Props) {
  const pathname = usePathname();
  const { isOnline, setIsOnline, orders } = useRider();
  const showToast = useToast();
  const title = PAGE_TITLES[pathname] ?? "Dashboard";
  const pendingCount = orders.filter(o => o.status === "pending").length;

  function toggle() {
    const next = !isOnline;
    setIsOnline(next);
    showToast(
      next ? "success" : "info",
      next ? "You're Online" : "You're Offline",
      next ? "New orders will now be assigned to you." : "No new orders will be assigned while offline."
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-100 px-4 lg:px-6 py-3.5 flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors">
          <Menu className="w-5 h-5 text-neutral-600" />
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="font-heading font-bold text-neutral-900 text-base">{title}</h1>
          <p className="text-xs text-neutral-400">Rider / {title}</p>
        </div>

        {/* Online/Offline Toggle */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <span className="hidden sm:block text-xs font-semibold text-neutral-600">{isOnline ? "Online" : "Offline"}</span>
          <button onClick={toggle} title="Toggle online/offline"
            className={clsx(
              "w-16 h-[34px] rounded-full relative transition-all duration-300 flex-shrink-0",
              isOnline ? "bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/30" : "bg-neutral-200"
            )}>
            <span className={clsx(
              "absolute top-1 w-[26px] h-[26px] bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-300",
              isOnline ? "left-[34px]" : "left-1"
            )}>
              {isOnline
                ? <Wifi className="w-3.5 h-3.5 text-green-500" />
                : <WifiOff className="w-3.5 h-3.5 text-neutral-400" />
              }
            </span>
          </button>
        </div>

        <button className="relative p-2 rounded-full hover:bg-neutral-100 transition-colors flex-shrink-0">
          <Bell className="w-5 h-5 text-neutral-600" />
          {pendingCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-600 rounded-full" />}
        </button>
      </header>

      {/* Offline banner */}
      {!isOnline && (
        <div className="bg-neutral-800 text-white text-sm font-semibold text-center py-2.5 flex items-center justify-center gap-2">
          <WifiOff className="w-4 h-4 text-neutral-400" />
          You are <span className="text-neutral-300 font-bold ml-1">Offline</span>
          <span className="text-neutral-400 font-normal ml-1">— New orders will not be assigned to you</span>
        </div>
      )}
    </>
  );
}
