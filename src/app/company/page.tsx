"use client";
import Link from "next/link";
import { Package, Bike, Banknote, CheckCircle } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { statusLabel } from "@/lib/statusLabel";
import { useCompany } from "@/context/CompanyContext";

export default function CompanyOverview() {
  const { orders, riders, companyType } = useCompany();
  const online = riders.filter(r => r.status === "online").length;

  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <h2 className="font-heading text-xl font-bold text-neutral-900">Good morning, Manager 👋</h2>
        <p className="text-sm text-neutral-400 mt-0.5">
          Lagos Express Co. — {companyType === "local" ? "Local Delivery" : "Interstate Logistics"}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Orders Today" value="312" iconBg="bg-primary-50"
          sub="+12% today" subColor="text-green-600"
          icon={<Package className="w-4 h-4 text-primary-600" />} />
        <StatCard label="Active Riders" value={`${online} / ${riders.length}`} iconBg="bg-green-50"
          sub="Online / Total"
          icon={<Bike className="w-4 h-4 text-green-600" />} />
        <StatCard label="Revenue Today" value="₦284,500" iconBg="bg-amber-50"
          sub="+8% vs yesterday" subColor="text-green-600"
          icon={<Banknote className="w-4 h-4 text-amber-600" />} />
        <StatCard label="Delivery Rate" value="96.4%" iconBg="bg-blue-50"
          sub="Success rate"
          icon={<CheckCircle className="w-4 h-4 text-blue-600" />} />
      </div>

      <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
          <h3 className="font-heading font-bold text-sm text-neutral-900">Recent Orders</h3>
          <Link href="/company/orders" className="text-xs text-primary-600 font-semibold hover:underline">View all</Link>
        </div>
        <div className="divide-y divide-neutral-50">
          {orders.slice(0, 5).map(o => (
            <div key={o.id} className="px-5 py-3.5 flex items-center gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${o.status === "delivered" ? "bg-green-50" : "bg-primary-50"}`}>
                <Package className={`w-4 h-4 ${o.status === "delivered" ? "text-green-600" : "text-primary-600"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-800 truncate">{o.id} · {o.customer}</p>
                <p className="text-xs text-neutral-400">{o.route}</p>
              </div>
              <Badge variant={o.status as any}>{statusLabel(o.status)}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
