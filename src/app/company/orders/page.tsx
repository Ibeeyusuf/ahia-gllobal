"use client";
import { useState } from "react";
import { Search, Info, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { statusLabel } from "@/lib/statusLabel";
import { useCompany } from "@/context/CompanyContext";
import { useToast } from "@/components/ui/Toast";
import type { Order } from "@/lib/types";

export default function CompanyOrdersPage() {
  const { orders, setOrders, riders, setRiders, companyType, updateOrderStatus } = useCompany();
  const showToast = useToast();
  const [assigningOrder, setAssigningOrder] = useState<Order | null>(null);
  const [selectedRider, setSelectedRider] = useState("");
  const isInter = companyType === "interstate";

  const available = riders.filter(r => r.status === "online" && !r.busy);

  function confirmAssign() {
    if (!assigningOrder || !selectedRider) {
      showToast("error", "Select a rider", "Please select an available rider.");
      return;
    }
    const rid = parseInt(selectedRider);
    const rider = riders.find(r => r.id === rid);
    if (!rider) return;
    setRiders(p => p.map(r => r.id === rid ? { ...r, busy: true } : r));
    setOrders(p => p.map(o => o.id === assigningOrder.id
      ? { ...o, status: "assigned", rider: rider.name.split(" ")[0] + " " + rider.name.split(" ")[1][0] + "." }
      : o
    ));
    showToast("success", "Rider Assigned", `${rider.name} assigned to ${assigningOrder.id}.`);
    setAssigningOrder(null);
    setSelectedRider("");
  }

  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <h2 className="font-heading text-xl font-bold text-neutral-900">Order Management</h2>
        <p className="text-sm text-neutral-400 mt-0.5">Manage and track all deliveries</p>
      </div>

      {isInter && (
        <div className="bg-violet-50 border border-violet-200 rounded-xl2 p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-violet-900">Interstate Operations Mode</p>
            <p className="text-sm text-violet-700 mt-0.5">Use the Status dropdown to update delivery progress for each shipment.</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-100 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-neutral-100 rounded-full px-3 py-1.5 flex-1 min-w-[160px]">
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <input type="text" placeholder="Search orders…" className="bg-transparent outline-none text-xs text-neutral-700 placeholder-neutral-400 w-full" />
          </div>
          <select className="text-xs border border-neutral-200 rounded-full px-3 py-1.5 text-neutral-600 outline-none appearance-none">
            <option>All Status</option><option>Processing</option><option>Assigned</option><option>In Transit</option><option>Delivered</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-neutral-50">
                {["Order ID","Customer","Route","Type","Status", isInter ? "Update Status" : "Action"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[0.7rem] font-bold text-neutral-400 uppercase tracking-wider whitespace-nowrap border-b border-neutral-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-neutral-50 transition-colors border-t border-neutral-100">
                  <td className="px-4 py-3.5 font-mono text-xs font-semibold text-neutral-700">{o.id}</td>
                  <td className="px-4 py-3.5 font-medium text-neutral-800">{o.customer}</td>
                  <td className="px-4 py-3.5 text-xs text-neutral-500">{o.route}</td>
                  <td className="px-4 py-3.5">
                    <Badge variant={o.type === "Local" ? "local" : "interstate"}>{o.type}</Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant={o.status as any}>{statusLabel(o.status)}</Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    {isInter ? (
                      <select onChange={e => { if(e.target.value) { updateOrderStatus(o.id, e.target.value); showToast("success","Status Updated",`${o.id} marked as ${e.target.value}.`); } }}
                        className="text-xs border border-neutral-200 rounded-lg px-2 py-1 text-neutral-600 outline-none appearance-none">
                        <option value="">Update Status</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    ) : o.status === "processing" ? (
                      <button onClick={() => setAssigningOrder(o)}
                        className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-xs font-bold transition-colors">
                        Assign Rider
                      </button>
                    ) : (
                      <span className="text-xs text-neutral-400">{o.rider ?? "—"}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Rider Modal */}
      {assigningOrder && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4" style={{ background:"rgba(15,23,42,.55)", backdropFilter:"blur(4px)" }}>
          <div className="bg-white rounded-xl3 shadow-modal w-full max-w-sm animate-fade-up">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <h3 className="font-heading font-bold text-neutral-900">Assign Rider — {assigningOrder.id}</h3>
              <button onClick={() => setAssigningOrder(null)} className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center">
                <X className="w-4 h-4 text-neutral-600" />
              </button>
            </div>
            <div className="p-6 space-y-3">
              <p className="text-sm text-neutral-500">Select an available rider:</p>
              <select value={selectedRider} onChange={e => setSelectedRider(e.target.value)}
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm bg-neutral-50 outline-none appearance-none">
                <option value="">— Select rider —</option>
                {available.map(r => (
                  <option key={r.id} value={r.id}>{r.name} · {r.zone} · {r.vehicle}</option>
                ))}
              </select>
              {available.length === 0 && <p className="text-xs text-amber-600">No available riders at the moment.</p>}
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <button onClick={() => setAssigningOrder(null)} className="flex-1 py-2.5 border border-neutral-200 rounded-full text-sm font-semibold text-neutral-700 hover:bg-neutral-50">Cancel</button>
              <button onClick={confirmAssign} className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-sm font-bold transition-colors">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
