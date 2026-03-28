"use client";
import { useState } from "react";
import { CheckCircle, XCircle, Eye, X, Clock, AlertTriangle } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { useToast } from "@/components/ui/Toast";
import { WithdrawalRequest, WithdrawalStatus } from "@/lib/adminData";
import { clsx } from "clsx";

type Filter = "all" | WithdrawalStatus;

function WithdrawalModal({ req, onClose }: { req: WithdrawalRequest; onClose: () => void }) {
  const { updateWithdrawal } = useAdmin();
  const showToast = useToast();
  const [note, setNote] = useState(req.note ?? "");

  function doAction(action: "approved" | "rejected") {
    if (action === "rejected" && !note.trim()) {
      showToast("error", "Note Required", "Please provide a reason for rejection.");
      return;
    }
    updateWithdrawal(req.id, action === "approved" ? "processing" : "rejected", note || undefined);
    showToast(
      action === "approved" ? "success" : "warn",
      action === "approved" ? "Withdrawal Approved" : "Withdrawal Rejected",
      action === "approved"
        ? `${req.id} is being processed. Funds will be transferred within 24 hours.`
        : `${req.id} has been rejected.`
    );
    onClose();
  }

  const isPending = req.status === "pending";

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,.65)", backdropFilter: "blur(6px)" }}>
      <div className="bg-white rounded-xl3 shadow-modal w-full max-w-md animate-fade-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <h3 className="font-heading font-bold text-neutral-900">Withdrawal Request</h3>
          <button onClick={onClose} className="p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-6 space-y-4">
          {/* Vendor + amount */}
          <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${req.vendorClr}`}>{req.vendorIni}</div>
            <div className="flex-1">
              <p className="font-semibold text-neutral-900">{req.vendor}</p>
              <p className="text-xs text-neutral-400">Requested {req.requestedAt}</p>
            </div>
            <div className="text-right">
              <p className="font-heading text-xl font-bold text-neutral-900">₦{req.amount.toLocaleString()}</p>
              <p className="text-xs text-neutral-400">Available: ₦{req.availableBalance.toLocaleString()}</p>
            </div>
          </div>

          {/* Bank details */}
          <div className="grid grid-cols-2 gap-3">
            {[["Bank", req.bank], ["Account Number", req.account]].map(([l, v]) => (
              <div key={l} className="bg-neutral-50 rounded-xl p-3">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">{l}</p>
                <p className="text-sm font-semibold text-neutral-900">{v}</p>
              </div>
            ))}
          </div>

          {/* Balance check */}
          <div className={clsx("rounded-xl p-3 flex items-start gap-2.5",
            req.amount > req.availableBalance ? "bg-red-50 border border-red-200" : "bg-green-50 border border-green-200"
          )}>
            {req.amount > req.availableBalance
              ? <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              : <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            }
            <p className={clsx("text-xs", req.amount > req.availableBalance ? "text-red-700" : "text-green-700")}>
              {req.amount > req.availableBalance
                ? `⚠ Requested amount exceeds available balance. This request should be rejected.`
                : `Available balance (₦${req.availableBalance.toLocaleString()}) covers requested amount.`
              }
            </p>
          </div>

          {/* Existing note / rejection reason */}
          {req.status === "rejected" && req.note && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-xs font-bold text-red-700 mb-1">Rejection Note</p>
              <p className="text-sm text-red-600">{req.note}</p>
            </div>
          )}

          {isPending && (
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Admin Note <span className="font-normal text-neutral-400">(required if rejecting)</span>
              </label>
              <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
                placeholder="e.g. Account under review, funds frozen pending investigation…"
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm bg-neutral-50 outline-none resize-none focus:border-primary-500" />
            </div>
          )}
        </div>
        <div className="px-6 pb-5 flex gap-3 justify-end">
          <button onClick={onClose} className="px-5 py-2.5 border border-neutral-200 rounded-full text-sm font-semibold text-neutral-700 hover:bg-neutral-50">Close</button>
          {isPending && (
            <>
              <button onClick={() => doAction("rejected")}
                className="flex items-center gap-2 px-5 py-2.5 border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-full text-sm font-bold transition-colors">
                <XCircle className="w-4 h-4" />Reject
              </button>
              <button onClick={() => doAction("approved")}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-bold transition-colors">
                <CheckCircle className="w-4 h-4" />Approve & Process
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const STATUS_BADGE: Record<WithdrawalStatus, string> = {
  pending:    "bg-amber-100 text-amber-800",
  approved:   "bg-blue-100 text-blue-800",
  processing: "bg-violet-100 text-violet-800",
  rejected:   "bg-red-100 text-red-800",
};
const STATUS_LABEL: Record<WithdrawalStatus, string> = {
  pending: "Pending", approved: "Approved", processing: "Processing", rejected: "Rejected",
};

export default function AdminWithdrawalsPage() {
  const { withdrawals } = useAdmin();
  const [filter, setFilter] = useState<Filter>("pending");
  const [viewing, setViewing] = useState<WithdrawalRequest | null>(null);

  const counts = {
    all:        withdrawals.length,
    pending:    withdrawals.filter(w => w.status === "pending").length,
    processing: withdrawals.filter(w => w.status === "processing").length,
    approved:   withdrawals.filter(w => w.status === "approved").length,
    rejected:   withdrawals.filter(w => w.status === "rejected").length,
  };

  const totalPending = withdrawals
    .filter(w => w.status === "pending")
    .reduce((s, w) => s + w.amount, 0);

  const filtered = filter === "all" ? withdrawals : withdrawals.filter(w => w.status === filter);

  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <h2 className="font-heading text-xl font-bold text-neutral-900">Withdrawal Requests</h2>
        <p className="text-sm text-neutral-400 mt-0.5">Review and approve vendor payout requests</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-amber-50 border border-amber-200 rounded-xl2 p-4">
          <div className="flex items-center gap-2 mb-1"><Clock className="w-4 h-4 text-amber-600" /><p className="text-xs font-semibold text-amber-700">Pending</p></div>
          <p className="font-heading text-2xl font-bold text-amber-800">{counts.pending}</p>
          <p className="text-xs text-amber-600 mt-0.5">₦{(totalPending/1000000).toFixed(2)}M awaiting</p>
        </div>
        <div className="bg-violet-50 border border-violet-200 rounded-xl2 p-4">
          <p className="text-xs font-semibold text-violet-700 mb-1">Processing</p>
          <p className="font-heading text-2xl font-bold text-violet-800">{counts.processing}</p>
          <p className="text-xs text-violet-600 mt-0.5">Being transferred</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl2 p-4">
          <p className="text-xs font-semibold text-green-700 mb-1">Approved</p>
          <p className="font-heading text-2xl font-bold text-green-800">{counts.approved}</p>
          <p className="text-xs text-green-600 mt-0.5">Completed</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl2 p-4">
          <p className="text-xs font-semibold text-red-700 mb-1">Rejected</p>
          <p className="font-heading text-2xl font-bold text-red-800">{counts.rejected}</p>
          <p className="text-xs text-red-600 mt-0.5">Declined</p>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 flex-wrap">
        {(["pending","processing","approved","rejected","all"] as Filter[]).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={clsx("px-4 py-1.5 rounded-full text-xs font-semibold border-2 transition-all capitalize",
              filter === f ? "bg-primary-50 text-primary-600 border-primary-200" : "bg-neutral-100 text-neutral-500 border-transparent hover:bg-neutral-200"
            )}>
            {f === "all" ? "All" : f.charAt(0).toUpperCase()+f.slice(1)} ({counts[f as keyof typeof counts] ?? 0})
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-neutral-50">
                {["Request ID","Vendor","Amount","Bank","Account","Requested At","Status","Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[0.7rem] font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-100 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(w => (
                <tr key={w.id} className="hover:bg-neutral-50 border-t border-neutral-100 transition-colors">
                  <td className="px-4 py-3.5 font-mono text-xs font-bold text-primary-600">{w.id}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${w.vendorClr}`}>{w.vendorIni}</div>
                      <span className="font-medium text-neutral-800">{w.vendor}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-heading font-bold text-neutral-900">₦{w.amount.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-xs text-neutral-600">{w.bank}</td>
                  <td className="px-4 py-3.5 font-mono text-xs text-neutral-600">{w.account}</td>
                  <td className="px-4 py-3.5 text-xs text-neutral-400 whitespace-nowrap">{w.requestedAt}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex px-2.5 py-[3px] rounded-full text-[0.7rem] font-semibold ${STATUS_BADGE[w.status]}`}>
                      {STATUS_LABEL[w.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button onClick={() => setViewing(w)}
                      className={clsx("flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-colors",
                        w.status === "pending"
                          ? "bg-primary-600 hover:bg-primary-700 text-white"
                          : "border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                      )}>
                      <Eye className="w-3 h-3" />{w.status === "pending" ? "Review" : "View"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {viewing && <WithdrawalModal req={viewing} onClose={() => setViewing(null)} />}
    </div>
  );
}
