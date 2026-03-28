"use client";
import { useState } from "react";
import { CheckCircle, XCircle, Eye, X } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { useToast } from "@/components/ui/Toast";
import { AdminProduct, ProductApprovalStatus } from "@/lib/adminData";
import { clsx } from "clsx";

type Filter = "all" | ProductApprovalStatus;

function ProductReviewModal({ product, onClose }: { product: AdminProduct; onClose: () => void }) {
  const { updateProductStatus } = useAdmin();
  const showToast = useToast();
  const [reason, setReason] = useState(product.reason ?? "");

  function doAction(action: "approved" | "rejected") {
    if (action === "rejected" && !reason.trim()) {
      showToast("error", "Reason Required", "Please provide a reason for rejection.");
      return;
    }
    updateProductStatus(product.id, action, action === "rejected" ? reason : undefined);
    showToast(
      action === "approved" ? "success" : "warn",
      action === "approved" ? "Product Approved" : "Product Rejected",
      `"${product.name}" has been ${action}.`
    );
    onClose();
  }

  const STATUS_CLS: Record<ProductApprovalStatus, string> = {
    pending:  "bg-amber-100 text-amber-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,.65)", backdropFilter: "blur(6px)" }}>
      <div className="bg-white rounded-xl3 shadow-modal w-full max-w-lg animate-fade-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <h3 className="font-heading font-bold text-neutral-900">Product Review</h3>
          <button onClick={onClose} className="p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-6 space-y-4">
          {/* Product header */}
          <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl">
            <div className="w-14 h-14 bg-white border border-neutral-200 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">{product.img}</div>
            <div className="flex-1 min-w-0">
              <p className="font-heading font-bold text-neutral-900">{product.name}</p>
              <p className="text-xs text-neutral-400 mt-0.5">{product.vendor} · {product.category}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="font-bold text-primary-600 text-sm">₦{product.price.toLocaleString()}</span>
                <span className="text-xs text-neutral-400">{product.stock} units in stock</span>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-[0.7rem] font-semibold ${STATUS_CLS[product.status]}`}>
                  {product.status.charAt(0).toUpperCase()+product.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Product Description</p>
            <p className="text-sm text-neutral-700 leading-relaxed bg-neutral-50 rounded-xl p-3">{product.description}</p>
          </div>

          {/* Existing rejection reason */}
          {product.status === "rejected" && product.reason && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-xs font-bold text-red-700 mb-1">Rejection Reason</p>
              <p className="text-sm text-red-600">{product.reason}</p>
            </div>
          )}

          {/* Rejection reason input */}
          {product.status === "pending" && (
            <div>
              <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                Rejection Reason <span className="font-normal text-neutral-400">(only required if rejecting)</span>
              </label>
              <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3}
                placeholder="e.g. Counterfeit product, incomplete description, misleading images…"
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm bg-neutral-50 outline-none resize-none focus:border-primary-500" />
            </div>
          )}
        </div>
        <div className="px-6 pb-5 flex gap-3 justify-end">
          <button onClick={onClose} className="px-5 py-2.5 border border-neutral-200 rounded-full text-sm font-semibold text-neutral-700 hover:bg-neutral-50">Close</button>
          {product.status === "pending" && (
            <>
              <button onClick={() => doAction("rejected")}
                className="flex items-center gap-2 px-5 py-2.5 border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-full text-sm font-bold transition-colors">
                <XCircle className="w-4 h-4" />Reject
              </button>
              <button onClick={() => doAction("approved")}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-bold transition-colors">
                <CheckCircle className="w-4 h-4" />Approve
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const STATUS_BADGE: Record<ProductApprovalStatus, string> = {
  pending:  "bg-amber-100 text-amber-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function AdminProductsPage() {
  const { products } = useAdmin();
  const [filter, setFilter] = useState<Filter>("pending");
  const [reviewing, setReviewing] = useState<AdminProduct | null>(null);

  const counts = {
    all: products.length,
    pending:  products.filter(p => p.status === "pending").length,
    approved: products.filter(p => p.status === "approved").length,
    rejected: products.filter(p => p.status === "rejected").length,
  };

  const filtered = filter === "all" ? products : products.filter(p => p.status === filter);

  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <h2 className="font-heading text-xl font-bold text-neutral-900">Product Approval Queue</h2>
        <p className="text-sm text-neutral-400 mt-0.5">Review and approve vendor product listings before they go live</p>
      </div>

      {/* Summary chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { key:"pending",  label:"Awaiting Review", color:"text-amber-600",  bg:"bg-amber-50 border-amber-200"  },
          { key:"approved", label:"Approved",        color:"text-green-700",  bg:"bg-green-50 border-green-200"  },
          { key:"rejected", label:"Rejected",        color:"text-red-700",    bg:"bg-red-50 border-red-200"      },
          { key:"all",      label:"Total Products",  color:"text-neutral-700",bg:"bg-white border-neutral-200"   },
        ].map(s => (
          <button key={s.key} onClick={() => setFilter(s.key as Filter)}
            className={clsx("text-left p-3 rounded-xl border transition-all", s.bg,
              filter === s.key && "ring-2 ring-primary-500"
            )}>
            <p className={`font-heading text-xl font-bold ${s.color}`}>{counts[s.key as keyof typeof counts]}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{s.label}</p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-neutral-50">
                {["Product","Vendor","Category","Price","Stock","Submitted","Status","Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[0.7rem] font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-100 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-12 text-neutral-400">
                  <p className="text-2xl mb-2">📋</p>
                  <p className="font-semibold text-neutral-600">No products in this category</p>
                </td></tr>
              ) : filtered.map(p => (
                <tr key={p.id} className="hover:bg-neutral-50 border-t border-neutral-100 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-neutral-50 border border-neutral-200 rounded-lg flex items-center justify-center text-xl flex-shrink-0">{p.img}</div>
                      <div>
                        <p className="font-semibold text-neutral-800 text-sm">{p.name}</p>
                        {p.reason && <p className="text-xs text-red-500 mt-0.5 max-w-[180px] truncate">{p.reason}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded bg-neutral-200 flex items-center justify-center text-[9px] font-bold text-neutral-600">{p.vendorIni}</div>
                      <span className="text-xs text-neutral-600">{p.vendor}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-neutral-500">{p.category}</td>
                  <td className="px-4 py-3.5 font-bold text-sm">₦{p.price.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-sm text-neutral-600">{p.stock}</td>
                  <td className="px-4 py-3.5 text-xs text-neutral-400 whitespace-nowrap">{p.submittedAt}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex px-2.5 py-[3px] rounded-full text-[0.7rem] font-semibold ${STATUS_BADGE[p.status]}`}>
                      {p.status.charAt(0).toUpperCase()+p.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button onClick={() => setReviewing(p)}
                      className="flex items-center gap-1 px-2.5 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-xs font-bold transition-colors">
                      <Eye className="w-3 h-3" />{p.status === "pending" ? "Review" : "View"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {reviewing && <ProductReviewModal product={reviewing} onClose={() => setReviewing(null)} />}
    </div>
  );
}
