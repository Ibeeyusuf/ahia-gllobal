import { Badge } from "@/components/ui/Badge";
import { statusLabel } from "@/lib/statusLabel";
import { ADMIN_DELIVERIES } from "@/lib/data";

export default function DeliveriesPage() {
  return (
    <div className="space-y-5 animate-fade-up">
      <h2 className="font-heading text-xl font-bold text-neutral-900">All Deliveries</h2>
      <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-neutral-50">
                {["Order ID","Company","Customer","Route","Type","Rider","Status","Time"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[0.7rem] font-bold text-neutral-400 uppercase tracking-wider whitespace-nowrap border-b border-neutral-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ADMIN_DELIVERIES.map(d => (
                <tr key={d.id} className="hover:bg-neutral-50 transition-colors border-t border-neutral-100">
                  <td className="px-4 py-3.5 font-mono text-xs font-semibold text-neutral-700">{d.id}</td>
                  <td className="px-4 py-3.5 text-xs text-neutral-600">{d.company}</td>
                  <td className="px-4 py-3.5 text-sm text-neutral-800">{d.customer}</td>
                  <td className="px-4 py-3.5 text-xs text-neutral-500">{d.route}</td>
                  <td className="px-4 py-3.5"><Badge variant={d.type === "Local" ? "local" : "interstate"}>{d.type}</Badge></td>
                  <td className="px-4 py-3.5 text-xs text-neutral-600">{d.rider}</td>
                  <td className="px-4 py-3.5"><Badge variant={d.status as any}>{statusLabel(d.status)}</Badge></td>
                  <td className="px-4 py-3.5 text-xs text-neutral-400">{d.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
