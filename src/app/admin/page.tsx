"use client";
import { useState } from "react";
import Link from "next/link";
import { Package, Banknote, Building2, Bike, TrendingUp, Clock, FileSearch } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { statusLabel } from "@/lib/statusLabel";
import { ReviewModal } from "@/components/admin/ReviewModal";
import { useAdmin } from "@/context/AdminContext";
import { ADMIN_DELIVERIES } from "@/lib/data";
import type { Company } from "@/lib/types";

const DELIVERIES = ADMIN_DELIVERIES;

export default function AdminDashboard() {
  const { companies } = useAdmin();
  const [reviewing, setReviewing] = useState<Company | null>(null);

  const pending = companies.filter(c => c.status === "pending");
  const active  = companies.filter(c => c.status === "active");

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-neutral-900">Good morning, Admin 👋</h2>
          <p className="text-sm text-neutral-400 mt-0.5">Platform overview for today</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Deliveries Today" value="1,248" iconBg="bg-primary-50"
          sub="+14% from yesterday" subColor="text-green-600"
          icon={<Package className="w-4 h-4 text-primary-600" />} />
        <StatCard label="Total Revenue" value="₦4.7M" iconBg="bg-green-50"
          sub="+8.3% this week" subColor="text-green-600"
          icon={<Banknote className="w-4 h-4 text-green-600" />} />
        <StatCard label="Active Companies" value={String(active.length)} iconBg="bg-blue-50"
          sub={`${pending.length} pending approval`} subColor="text-amber-600"
          icon={<Building2 className="w-4 h-4 text-blue-600" />} />
        <StatCard label="Total Riders" value="347" iconBg="bg-purple-50"
          sub="218 online now" subColor="text-green-600"
          icon={<Bike className="w-4 h-4 text-purple-600" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Deliveries */}
        <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
            <h3 className="font-heading font-bold text-sm text-neutral-900">Recent Deliveries</h3>
            <Link href="/admin/deliveries" className="text-xs text-primary-600 font-semibold hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-neutral-50">
            {DELIVERIES.map(d => (
              <div key={d.id} className="px-5 py-3.5 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${d.status === "delivered" ? "bg-green-50" : "bg-primary-50"}`}>
                  <Package className={`w-4 h-4 ${d.status === "delivered" ? "text-green-600" : "text-primary-600"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-800 truncate">{d.id} · {d.company}</p>
                  <p className="text-xs text-neutral-400">{d.route}</p>
                </div>
                <Badge variant={d.status as any}>{statusLabel(d.status)}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
            <h3 className="font-heading font-bold text-sm text-neutral-900">Pending Approvals</h3>
            <Link href="/admin/companies" className="text-xs text-primary-600 font-semibold hover:underline">Manage all</Link>
          </div>
          {pending.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-neutral-400">No pending approvals</div>
          ) : (
            <div className="divide-y divide-neutral-50">
              {pending.map(co => (
                <div key={co.name} className="px-5 py-4 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${co.clr}`}>{co.ini}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-900">{co.name}</p>
                    <p className="text-xs text-neutral-400">{co.type} · Applied {co.applied}</p>
                  </div>
                  <button onClick={() => setReviewing(co)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-xs font-bold transition-colors flex-shrink-0">
                    <FileSearch className="w-3.5 h-3.5" />Review
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="px-5 py-4 border-t border-neutral-50 grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="font-heading text-lg font-bold text-neutral-900">{companies.filter(c=>c.type==="Local"&&c.status==="active").length}</p>
              <p className="text-[10px] text-neutral-500">Local</p>
            </div>
            <div className="text-center border-x border-neutral-100">
              <p className="font-heading text-lg font-bold text-neutral-900">{companies.filter(c=>c.type==="Interstate"&&c.status==="active").length}</p>
              <p className="text-[10px] text-neutral-500">Interstate</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-lg font-bold text-amber-600">{pending.length}</p>
              <p className="text-[10px] text-neutral-500">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {reviewing && <ReviewModal company={reviewing} onClose={() => setReviewing(null)} />}
    </div>
  );
}
