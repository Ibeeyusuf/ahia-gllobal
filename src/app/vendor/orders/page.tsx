"use client";
import { useState } from "react";
import { Eye, Check, X, Truck, Info } from "lucide-react";
import { useVendor } from "@/context/VendorContext";
import { useToast } from "@/components/ui/Toast";
import { VendorOrder } from "@/lib/vendorData";

type Tab = "pending"|"processing"|"ready"|"delivered"|"cancelled";
const TABS: {key:Tab; label:string}[] = [
  {key:"pending",    label:"Pending"},
  {key:"processing", label:"Processing"},
  {key:"ready",      label:"Ready for Delivery"},
  {key:"delivered",  label:"Delivered"},
  {key:"cancelled",  label:"Cancelled"},
];

function OrderDetailModal({ order, onClose }: { order: VendorOrder; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4" style={{background:"rgba(15,23,42,.5)",backdropFilter:"blur(4px)"}}>
      <div className="bg-white rounded-xl3 shadow-modal w-full max-w-md animate-fade-up">
        <div className="flex items-center justify-between px-[22px] py-[18px] border-b border-neutral-100 sticky top-0 bg-white rounded-t-xl3">
          <h3 className="font-heading font-bold text-neutral-900">Order #{order.id}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200"><X className="w-4 h-4 text-neutral-600" /></button>
        </div>
        <div className="p-5 grid gap-3">
          <div className="grid grid-cols-2 gap-2.5">
            {[["Customer",order.customer],["Delivery",order.delivery],["Order Date",order.date],["Payment","Paid ✓"]].map(([l,v])=>(
              <div key={l} className="bg-neutral-50 rounded-[10px] p-3"><p className="text-[0.7rem] text-neutral-400 mb-0.5">{l}</p><p className="text-[0.85rem] font-semibold text-neutral-900">{v}</p></div>
            ))}
          </div>
          <div className="bg-neutral-50 rounded-[10px] p-3.5">
            <p className="text-[0.72rem] font-bold text-neutral-400 uppercase tracking-wider mb-2">Products</p>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-white border-[1.5px] border-neutral-200 rounded-lg flex items-center justify-center text-lg">📦</div>
                <p className="text-[0.82rem] font-semibold text-neutral-900">{order.product}</p>
              </div>
              <p className="font-bold text-neutral-900">₦{order.total.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center justify-between bg-neutral-900 rounded-[10px] px-4 py-3">
            <p className="text-[0.82rem] font-semibold text-neutral-400">Total Amount</p>
            <p className="font-heading font-bold text-white text-[1.1rem]">₦{order.total.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VendorOrdersPage() {
  const { orders, moveOrder } = useVendor();
  const showToast = useToast();
  const [tab, setTab] = useState<Tab>("pending");
  const [viewing, setViewing] = useState<VendorOrder | null>(null);

  const data = orders[tab] ?? [];

  function accept(id: string) {
    moveOrder(id, "pending", "processing");
    showToast("success","Order Accepted",`#${id} moved to Processing.`);
  }
  function reject(id: string) {
    moveOrder(id, "pending", "cancelled");
    showToast("info","Order Rejected",`#${id} has been cancelled.`);
  }
  function markReady(id: string) {
    moveOrder(id, "processing", "ready");
    showToast("success","Ready for Delivery","Rider will be assigned automatically by the system.");
  }

  return (
    <div className="space-y-4 animate-fade-up">
      <div>
        <p className="text-[0.75rem] text-neutral-400 mb-1">Home / Orders</p>
        <h2 className="font-heading font-bold text-xl text-neutral-900">Orders</h2>
        <p className="text-[0.8rem] text-neutral-400 mt-0.5">Manage and track all customer orders</p>
      </div>

      <div className="bg-white rounded-xl2 border-[1.5px] border-neutral-100 shadow-card overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-neutral-100 px-4 overflow-x-auto" style={{scrollbarWidth:"none"}}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`py-2.5 px-4 text-[0.8rem] font-semibold border-b-2 whitespace-nowrap transition-all -mb-px flex items-center gap-1.5 ${
                tab === t.key ? "text-primary-600 border-primary-600" : "text-neutral-400 border-transparent hover:text-neutral-700"
              }`}>
              {t.label}
              {t.key === "pending" && (orders.pending?.length ?? 0) > 0 && (
                <span className="bg-orange-100 text-orange-700 text-[0.63rem] font-bold px-1.5 py-px rounded-full">{orders.pending.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {data.length === 0 ? (
            <div className="text-center py-12 text-neutral-400">
              <p className="text-2xl mb-2">📥</p>
              <p className="font-semibold text-neutral-700">No orders here</p>
              <p className="text-[0.8rem] mt-1">Orders in this category will appear here</p>
            </div>
          ) : (
            <table className="w-full border-collapse text-[0.82rem]">
              <thead>
                <tr>
                  {["Order ID","Customer","Products","Total","Delivery","Date","Actions"].map(h=>(
                    <th key={h} className="px-3.5 py-2.5 text-left text-[0.71rem] font-bold text-neutral-400 uppercase tracking-wider border-b-[1.5px] border-neutral-100 bg-neutral-50 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map(o => (
                  <tr key={o.id} className="hover:bg-neutral-50 border-t border-neutral-50 transition-colors">
                    <td className="px-3.5 py-3 text-primary-600 font-bold text-[0.78rem]">#{o.id}</td>
                    <td className="px-3.5 py-3 font-medium text-[0.8rem]">{o.customer}</td>
                    <td className="px-3.5 py-3 text-neutral-500 text-[0.78rem] max-w-[160px] truncate">{o.product}</td>
                    <td className="px-3.5 py-3 font-bold">₦{o.total.toLocaleString()}</td>
                    <td className="px-3.5 py-3">
                      <span className={`inline-flex px-2.5 py-[3px] rounded-full text-[0.7rem] font-bold ${o.delivery==="Local"?"bg-blue-100 text-blue-800":"bg-violet-100 text-violet-800"}`}>{o.delivery}</span>
                    </td>
                    <td className="px-3.5 py-3 text-[0.75rem] text-neutral-400 whitespace-nowrap">{o.date}</td>
                    <td className="px-3.5 py-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {tab === "pending" && <>
                          <button onClick={()=>accept(o.id)} className="flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-[0.75rem] font-bold hover:bg-green-200 transition-colors"><Check className="w-3 h-3" />Accept</button>
                          <button onClick={()=>reject(o.id)} className="flex items-center gap-1 px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-[0.75rem] font-bold hover:bg-red-200 transition-colors"><X className="w-3 h-3" />Reject</button>
                        </>}
                        {tab === "processing" && (
                          <button onClick={()=>markReady(o.id)} className="flex items-center gap-1 px-2.5 py-1 bg-primary-600 text-white rounded-full text-[0.75rem] font-bold hover:bg-primary-700 transition-colors"><Truck className="w-3 h-3" />Mark Ready</button>
                        )}
                        <button onClick={()=>setViewing(o)} className="w-[30px] h-[30px] flex items-center justify-center border-[1.5px] border-neutral-200 rounded-full hover:bg-neutral-50 transition-colors text-neutral-600">
                          <Eye className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-[10px] px-4 py-3 flex items-center gap-2.5">
        <Info className="w-4 h-4 text-green-600 flex-shrink-0" />
        <p className="text-[0.78rem] text-green-800">Rider assignment is handled automatically by the system once you mark an order as <strong>Ready for Delivery</strong>.</p>
      </div>

      {viewing && <OrderDetailModal order={viewing} onClose={() => setViewing(null)} />}
    </div>
  );
}
