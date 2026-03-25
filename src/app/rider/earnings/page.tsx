"use client";
import { CalendarCheck, ChevronRight } from "lucide-react";
import { useRider } from "@/context/RiderContext";

const BARS = [
  { day:"Mon", h:60, earn:"₦9,800"  },
  { day:"Tue", h:78, earn:"₦12,700" },
  { day:"Wed", h:55, earn:"₦8,950"  },
  { day:"Thu", h:90, earn:"₦14,600" },
  { day:"Fri", h:100,earn:"₦12,500", active:true },
  { day:"Sat", h:40, earn:"—",       future:true  },
  { day:"Sun", h:40, earn:"—",       future:true  },
];

export default function RiderEarningsPage() {
  const { todayEarnings, completedCount } = useRider();

  return (
    <div className="space-y-5 animate-fade-up">
      <h2 className="font-heading text-xl font-bold text-neutral-900">My Earnings</h2>

      {/* Weekly / Monthly summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-neutral-900 rounded-xl2 p-5 text-white">
          <p className="text-xs text-neutral-400 mb-2">This Week</p>
          <p className="font-heading text-3xl font-bold">₦74,250</p>
          <p className="text-xs text-green-400 mt-1">+18% vs last week</p>
        </div>
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl2 p-5 text-white">
          <p className="text-xs text-primary-200 mb-2">This Month</p>
          <p className="font-heading text-3xl font-bold">₦286,500</p>
          <p className="text-xs text-primary-200 mt-1">On track for top 10</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Deliveries",   val: "412",    color: "text-neutral-900" },
          { label: "Avg Rating",   val: "⭐ 4.9", color: "text-amber-600"   },
          { label: "Success Rate", val: "98%",    color: "text-green-600"   },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl2 border border-neutral-100 shadow-card p-4 text-center">
            <p className={`font-heading text-xl font-bold ${s.color}`}>{s.val}</p>
            <p className="text-[10px] text-neutral-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card p-5">
        <h3 className="font-heading font-bold text-sm text-neutral-900 mb-4">Daily Earnings — This Week</h3>
        <div className="flex items-end gap-2 h-28">
          {BARS.map(b => (
            <div key={b.day} className="flex flex-col items-center gap-1 flex-1">
              <div title={b.earn}
                className={`w-full rounded-t-md transition-colors ${
                  (b as any).active ? "bg-primary-600" :
                  (b as any).future ? "bg-neutral-200 opacity-40" :
                  "bg-primary-200 hover:bg-primary-300 cursor-pointer"
                }`}
                style={{ height: `${b.h}%` }} />
              <p className={`text-[10px] ${(b as any).active ? "text-primary-600 font-bold" : "text-neutral-400"}`}>{b.day}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Today earnings highlight */}
      <div className="bg-primary-50 border border-primary-100 rounded-xl2 p-4">
        <p className="text-xs font-bold text-primary-900 mb-1">Today's Total</p>
        <p className="font-heading text-3xl font-bold text-primary-700">₦{todayEarnings.toLocaleString()}</p>
        <p className="text-xs text-primary-600 mt-1">From {completedCount} completed deliveries</p>
      </div>

      {/* Payout info */}
      <div className="bg-green-50 border border-green-200 rounded-xl2 p-4 flex items-center gap-4">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <CalendarCheck className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-green-900">Next Payout: Friday, 28 March</p>
          <p className="text-xs text-green-700 mt-0.5">₦74,250 will be transferred to your GTBank account ending ****4521</p>
        </div>
        <ChevronRight className="w-4 h-4 text-green-600 flex-shrink-0" />
      </div>
    </div>
  );
}
