"use client";
import { useState } from "react";
import { TrendingUp, Wallet, ArrowDownCircle, RefreshCw } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { FinanceTx } from "@/lib/adminData";
import { clsx } from "clsx";

const TYPE_CONFIG = {
  vendor_sale:  { label:"Vendor Sale",    badge:"bg-green-100 text-green-800"   },
  commission:   { label:"Commission",     badge:"bg-blue-100 text-blue-800"     },
  payout:       { label:"Payout",         badge:"bg-violet-100 text-violet-800" },
  refund:       { label:"Refund",         badge:"bg-orange-100 text-orange-800" },
  platform_fee: { label:"Platform Fee",   badge:"bg-neutral-100 text-neutral-700" },
};

const STATUS_BADGE = {
  settled: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
  failed:  "bg-red-100 text-red-800",
};

const BARS = [
  {w:"W1",gmv:1.2,comm:96,payout:0.9},
  {w:"W2",gmv:1.8,comm:144,payout:1.4},
  {w:"W3",gmv:2.1,comm:168,payout:1.6},
  {w:"W4",gmv:2.9,comm:232,payout:2.2,active:true},
];

export default function AdminFinancesPage() {
  const { transactions, withdrawals } = useAdmin();
  const [typeFilter, setTypeFilter] = useState<FinanceTx["type"] | "all">("all");

  const totalGMV        = transactions.filter(t => t.type === "vendor_sale" && t.status === "settled").reduce((s,t) => s+t.amount, 0);
  const totalCommission = transactions.filter(t => t.type === "commission"  && t.status === "settled").reduce((s,t) => s+t.amount, 0);
  const totalPayouts    = transactions.filter(t => t.type === "payout"      && t.status === "settled").reduce((s,t) => s+t.amount, 0);
  const pendingPayouts  = withdrawals.filter(w => w.status === "pending").reduce((s,w) => s+w.amount, 0);

  const filtered = typeFilter === "all" ? transactions : transactions.filter(t => t.type === typeFilter);

  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <h2 className="font-heading text-xl font-bold text-neutral-900">Platform Finances</h2>
        <p className="text-sm text-neutral-400 mt-0.5">Monitor all money movements across the platform</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:"Total GMV",          val:`₦${(totalGMV/1000000).toFixed(2)}M`,    sub:"Gross merchandise value",  icon:<TrendingUp className="w-4 h-4 text-primary-600" />,     bg:"bg-primary-50" },
          { label:"Platform Commission",val:`₦${(totalCommission/1000).toFixed(0)}K`,sub:"8% of settled sales",      icon:<Wallet className="w-4 h-4 text-green-600" />,           bg:"bg-green-50"   },
          { label:"Total Payouts",      val:`₦${(totalPayouts/1000).toFixed(0)}K`,   sub:"Disbursed to vendors",     icon:<ArrowDownCircle className="w-4 h-4 text-violet-600" />, bg:"bg-violet-50"  },
          { label:"Pending Withdrawals",val:`₦${(pendingPayouts/1000).toFixed(0)}K`, sub:"Awaiting approval",        icon:<RefreshCw className="w-4 h-4 text-amber-600" />,        bg:"bg-amber-50",  warn:true },
        ].map(k => (
          <div key={k.label} className={clsx("bg-white rounded-xl2 border p-5 hover:shadow-hover hover:-translate-y-0.5 transition-all shadow-card", k.warn ? "border-amber-200" : "border-neutral-100")}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-neutral-400">{k.label}</p>
              <div className={`w-9 h-9 ${k.bg} rounded-xl flex items-center justify-center`}>{k.icon}</div>
            </div>
            <p className="font-heading text-2xl font-bold text-neutral-900">{k.val}</p>
            <p className={clsx("text-xs mt-1", k.warn ? "text-amber-600" : "text-neutral-400")}>{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="font-heading font-bold text-neutral-900">Weekly Revenue Flow</p>
          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary-600 inline-block" />GMV</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-green-500 inline-block" />Commission</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-violet-500 inline-block" />Payouts</span>
          </div>
        </div>
        <div className="flex items-end gap-6 h-36">
          {BARS.map(b => (
            <div key={b.w} className="flex-1 flex items-end gap-1 h-full">
              <div className="flex-1 flex flex-col items-center gap-1 h-full">
                <div className="w-full bg-neutral-100 rounded-t-md overflow-hidden relative flex-1">
                  <div className={clsx("absolute bottom-0 left-0 right-0 rounded-t-md", (b as any).active ? "bg-primary-600" : "bg-primary-200")}
                    style={{height:`${(b.gmv/2.9)*100}%`}} />
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1 h-full">
                <div className="w-full bg-neutral-100 rounded-t-md overflow-hidden relative flex-1">
                  <div className="absolute bottom-0 left-0 right-0 bg-green-400 rounded-t-md" style={{height:`${(b.comm/232)*100}%`}} />
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1 h-full">
                <div className="w-full bg-neutral-100 rounded-t-md overflow-hidden relative flex-1">
                  <div className="absolute bottom-0 left-0 right-0 bg-violet-400 rounded-t-md" style={{height:`${(b.payout/2.2)*100}%`}} />
                </div>
              </div>
              <p className={clsx("text-[10px] w-full text-center", (b as any).active ? "text-primary-600 font-bold" : "text-neutral-400")} style={{gridColumn:"1/-1"}}>{b.w}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction log */}
      <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between flex-wrap gap-3">
          <p className="font-heading font-bold text-neutral-900">Transaction Log</p>
          <div className="flex gap-1 bg-neutral-100 rounded-xl p-1 overflow-x-auto">
            {(["all","vendor_sale","commission","payout","refund","platform_fee"] as const).map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={clsx("px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap",
                  typeFilter === t ? "bg-white text-neutral-800 shadow-sm" : "text-neutral-500"
                )}>
                {t === "all" ? "All" : TYPE_CONFIG[t]?.label ?? t}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-neutral-50">
                {["Tx ID","Date","Description","Vendor","Type","Amount","Status"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[0.7rem] font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-100 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(tx => {
                const cfg = TYPE_CONFIG[tx.type];
                return (
                  <tr key={tx.id} className="hover:bg-neutral-50 border-t border-neutral-100 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-neutral-500">{tx.id}</td>
                    <td className="px-4 py-3 text-xs text-neutral-400 whitespace-nowrap">{tx.date}</td>
                    <td className="px-4 py-3 text-sm text-neutral-700 max-w-[220px] truncate">{tx.description}</td>
                    <td className="px-4 py-3 text-xs text-neutral-600">{tx.vendor}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2.5 py-[3px] rounded-full text-[0.7rem] font-semibold ${cfg?.badge ?? "bg-neutral-100 text-neutral-600"}`}>
                        {cfg?.label ?? tx.type}
                      </span>
                    </td>
                    <td className={clsx("px-4 py-3 font-heading font-bold", tx.direction === "in" ? "text-green-700" : "text-red-600")}>
                      {tx.direction === "in" ? "+" : "−"}₦{tx.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2.5 py-[3px] rounded-full text-[0.7rem] font-semibold ${STATUS_BADGE[tx.status]}`}>
                        {tx.status.charAt(0).toUpperCase()+tx.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
