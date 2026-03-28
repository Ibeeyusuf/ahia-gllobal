"use client";
import { useState } from "react";
import { Eye, ShieldOff, ShieldCheck, Store, X } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { useToast } from "@/components/ui/Toast";
import { AdminVendor, VendorStatus } from "@/lib/adminData";
import { clsx } from "clsx";

type Filter = "all" | VendorStatus;

function VendorDetailModal({ vendor, onClose }: { vendor: AdminVendor; onClose: () => void }) {
  const { updateVendorStatus } = useAdmin();
  const showToast = useToast();
  const [reason, setReason] = useState(vendor.reason ?? "");

  function doAction(action: "active" | "suspended") {
    if (action === "suspended" && !reason.trim()) {
      showToast("error", "Reason Required", "Please provide a reason for suspension.");
      return;
    }
    updateVendorStatus(vendor.id, action, action === "suspended" ? reason : undefined);
    showToast(
      action === "active" ? "success" : "warn",
      action === "active" ? "Vendor Reinstated" : "Vendor Suspended",
      `${vendor.name} has been ${action === "active" ? "reinstated" : "suspended"}.`
    );
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,.65)", backdropFilter: "blur(6px)" }}>
      <div className="bg-white rounded-xl3 shadow-modal w-full max-w-lg animate-fade-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${vendor.clr}`}>{vendor.ini}</div>
            <div>
              <h3 className="font-heading font-bold text-neutral-900">{vendor.name}</h3>
              <p className="text-xs text-neutral-400">{vendor.category} · Joined {vendor.joined}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Owner",    vendor.owner],
              ["Email",    vendor.email],
              ["Phone",    vendor.phone],
              ["City",     vendor.city],
              ["Products", String(vendor.products)],
              ["Total Sales", `₦${vendor.sales.toLocaleString()}`],
            ].map(([l, v]) => (
              <div key={l} className="bg-neutral-50 rounded-xl p-3">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">{l}</p>
                <p className="text-sm font-semibold text-neutral-900 truncate">{v}</p>
              </div>
            ))}
          </div>

          {vendor.status === "suspended" && vendor.reason && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-xs font-bold text-red-700 mb-1">Suspension Reason</p>
              <p className="text-sm text-red-600">{vendor.reason}</p>
            </div>
          )}

          {vendor.status !== "suspended" && (
            <div>
              <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                Suspension Reason <span className="font-normal text-neutral-400">(required to suspend)</span>
              </label>
              <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3}
                placeholder="e.g. Selling counterfeit products, multiple customer complaints…"
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm bg-neutral-50 outline-none resize-none focus:border-primary-500" />
            </div>
          )}
        </div>
        <div className="px-6 pb-5 flex gap-3 justify-end">
          <button onClick={onClose} className="px-5 py-2.5 border border-neutral-200 rounded-full text-sm font-semibold text-neutral-700 hover:bg-neutral-50">Close</button>
          {vendor.status === "suspended" ? (
            <button onClick={() => doAction("active")}
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-bold transition-colors">
              <ShieldCheck className="w-4 h-4" />Reinstate Vendor
            </button>
          ) : (
            <button onClick={() => doAction("suspended")}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-bold transition-colors">
              <ShieldOff className="w-4 h-4" />Suspend Vendor
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const STATUS_BADGE: Record<VendorStatus, string> = {
  active:    "bg-green-100 text-green-800",
  pending:   "bg-amber-100 text-amber-800",
  suspended: "bg-red-100 text-red-800",
};

export default function AdminVendorsPage() {
  const { vendors, updateVendorStatus } = useAdmin();
  const showToast = useToast();
  const [filter, setFilter] = useState<Filter>("all");
  const [viewing, setViewing] = useState<AdminVendor | null>(null);

  const counts = {
    all: vendors.length,
    active: vendors.filter(v => v.status === "active").length,
    pending: vendors.filter(v => v.status === "pending").length,
    suspended: vendors.filter(v => v.status === "suspended").length,
  };

  const filtered = filter === "all" ? vendors : vendors.filter(v => v.status === filter);

  function quickApprove(v: AdminVendor) {
    updateVendorStatus(v.id, "active");
    showToast("success", "Vendor Approved", `${v.name} is now active on the platform.`);
  }

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-heading text-xl font-bold text-neutral-900">Vendors</h2>
          <p className="text-sm text-neutral-400 mt-0.5">Manage all seller accounts on the platform</p>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 flex-wrap">
        {(["all","active","pending","suspended"] as Filter[]).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={clsx("px-4 py-1.5 rounded-full text-xs font-semibold border-2 transition-all",
              filter === f ? "bg-primary-50 text-primary-600 border-primary-200" : "bg-neutral-100 text-neutral-500 border-transparent hover:bg-neutral-200"
            )}>
            {f.charAt(0).toUpperCase()+f.slice(1)} ({counts[f]})
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-neutral-50">
                {["Vendor","Category","Owner","City","Products","Sales","Status","Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[0.7rem] font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-100 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.id} className="hover:bg-neutral-50 border-t border-neutral-100 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${v.clr}`}>{v.ini}</div>
                      <span className="font-semibold text-neutral-800">{v.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-neutral-500">{v.category}</td>
                  <td className="px-4 py-3.5 text-sm text-neutral-700">{v.owner}</td>
                  <td className="px-4 py-3.5 text-xs text-neutral-500">{v.city}</td>
                  <td className="px-4 py-3.5 font-semibold">{v.products}</td>
                  <td className="px-4 py-3.5 font-semibold text-neutral-800">₦{(v.sales/1000).toFixed(0)}K</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex px-2.5 py-[3px] rounded-full text-[0.7rem] font-semibold ${STATUS_BADGE[v.status]}`}>
                      {v.status.charAt(0).toUpperCase()+v.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setViewing(v)}
                        className="flex items-center gap-1 px-2.5 py-1 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors">
                        <Eye className="w-3 h-3" />View
                      </button>
                      {v.status === "pending" && (
                        <button onClick={() => quickApprove(v)}
                          className="px-2.5 py-1 bg-green-600 hover:bg-green-700 text-white rounded-full text-xs font-bold transition-colors">
                          Approve
                        </button>
                      )}
                      {v.status === "active" && (
                        <button onClick={() => setViewing(v)}
                          className="flex items-center gap-1 px-2.5 py-1 bg-red-50 border border-red-200 text-red-600 rounded-full text-xs font-semibold hover:bg-red-100 transition-colors">
                          <ShieldOff className="w-3 h-3" />Suspend
                        </button>
                      )}
                      {v.status === "suspended" && (
                        <button onClick={() => { updateVendorStatus(v.id, "active"); showToast("success","Reinstated",`${v.name} is now active.`); }}
                          className="flex items-center gap-1 px-2.5 py-1 bg-green-50 border border-green-200 text-green-700 rounded-full text-xs font-semibold hover:bg-green-100 transition-colors">
                          <ShieldCheck className="w-3 h-3" />Reinstate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {viewing && <VendorDetailModal vendor={viewing} onClose={() => setViewing(null)} />}
    </div>
  );
}
