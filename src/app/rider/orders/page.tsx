"use client";
import { useState } from "react";
import { useRider } from "@/context/RiderContext";
import { Badge } from "@/components/ui/Badge";
import { statusLabel } from "@/lib/statusLabel";
import { ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import type { OrderStatus } from "@/lib/types";

type TabFilter = "all" | "active" | "delivered" | "rejected";

const ACTIVE_STATUSES: OrderStatus[] = ["assigned", "picked", "transit"];

export default function RiderOrdersPage() {
  const { orders } = useRider();
  const [tab, setTab] = useState<TabFilter>("all");

  const displayed = orders
    .filter(o => o.status !== "pending")
    .filter(o => {
      if (tab === "all")       return true;
      if (tab === "active")    return ACTIVE_STATUSES.includes(o.status as OrderStatus);
      if (tab === "delivered") return o.status === "delivered";
      if (tab === "rejected")  return o.status === "rejected";
      return true;
    });

  const TABS: { key: TabFilter; label: string }[] = [
    { key: "all",       label: "All"       },
    { key: "active",    label: "Active"    },
    { key: "delivered", label: "Delivered" },
    { key: "rejected",  label: "Rejected"  },
  ];

  return (
    <div className="space-y-5 animate-fade-up">
      <h2 className="font-heading text-xl font-bold text-neutral-900">My Orders</h2>

      {/* Tab switcher */}
      <div className="flex gap-1 bg-neutral-100 rounded-xl p-1 w-fit">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={clsx(
              "px-4 py-1.5 rounded-lg text-xs font-medium transition-all",
              tab === t.key ? "bg-white text-neutral-800 font-semibold shadow-sm" : "text-neutral-500 hover:text-neutral-700"
            )}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {displayed.length === 0 ? (
          <div className="bg-white rounded-xl2 border border-neutral-100 p-8 text-center text-sm text-neutral-400 shadow-card">
            No orders in this category
          </div>
        ) : displayed.map(o => (
          <div key={o.id} className="bg-white border-2 border-neutral-100 rounded-xl2 p-4 shadow-card hover:border-neutral-200 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <p className="font-heading font-bold text-sm text-neutral-900">{o.id}</p>
              <Badge variant={o.status as any}>{statusLabel(o.status)}</Badge>
            </div>
            <p className="text-xs text-neutral-500 mb-2">{o.customer}</p>
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span>{o.pickup}</span>
              <ArrowRight className="w-3 h-3 text-neutral-300 flex-shrink-0" />
              <span>{o.dropoff}</span>
              <span className="ml-auto font-bold text-primary-600">{o.earn}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
