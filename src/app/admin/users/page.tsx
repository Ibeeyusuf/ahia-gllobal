"use client";
import { useState } from "react";
import { ShieldOff, ShieldCheck, AlertTriangle, X } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { useToast } from "@/components/ui/Toast";
import { PlatformUser, UserStatus, UserRole } from "@/lib/adminData";
import { clsx } from "clsx";

type RoleFilter   = "all" | UserRole;
type StatusFilter = "all" | UserStatus;

function SuspendModal({ user, onClose }: { user: PlatformUser; onClose: () => void }) {
  const { updateUserStatus } = useAdmin();
  const showToast = useToast();
  const [reason, setReason] = useState(user.reason ?? "");

  function doAction(action: "active" | "suspended") {
    if (action === "suspended" && !reason.trim()) {
      showToast("error", "Reason Required", "Please provide a reason for suspension.");
      return;
    }
    updateUserStatus(user.id, action, action === "suspended" ? reason : undefined);
    showToast(
      action === "active" ? "success" : "warn",
      action === "active" ? "User Reinstated" : "User Suspended",
      `${user.name} has been ${action === "active" ? "reinstated" : "suspended"}.`
    );
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,.65)", backdropFilter: "blur(6px)" }}>
      <div className="bg-white rounded-xl3 shadow-modal w-full max-w-md animate-fade-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <h3 className="font-heading font-bold text-neutral-900">
            {user.status === "suspended" ? "Reinstate User" : "Suspend User"}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-6 space-y-4">
          {/* User info */}
          <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{user.ini}</div>
            <div>
              <p className="font-semibold text-neutral-900">{user.name}</p>
              <p className="text-xs text-neutral-400">{user.role === "vendor" ? "Vendor" : "Rider"} · {user.subRole} · {user.city}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-neutral-400">Violations</p>
              <p className={clsx("font-heading font-bold", user.violations > 0 ? "text-red-600" : "text-green-600")}>{user.violations}</p>
            </div>
          </div>

          {/* Current suspension reason */}
          {user.status === "suspended" && user.reason && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-xs font-bold text-red-700 mb-1">Current Suspension Reason</p>
              <p className="text-sm text-red-600">{user.reason}</p>
            </div>
          )}

          {/* Suspension reason input */}
          {user.status !== "suspended" && (
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Suspension Reason <span className="text-red-500">*</span>
              </label>
              <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3}
                placeholder="e.g. Multiple policy violations, customer complaints, fraud suspected…"
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm bg-neutral-50 outline-none resize-none focus:border-primary-500" />
              <p className="text-xs text-neutral-400 mt-1.5">This reason will be recorded and shown to internal admins only.</p>
            </div>
          )}

          {user.status === "suspended" && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3">
              <p className="text-xs text-green-700">Reinstating this user will restore full access to their account. Make sure all violations have been resolved.</p>
            </div>
          )}
        </div>
        <div className="px-6 pb-5 flex gap-3 justify-end">
          <button onClick={onClose} className="px-5 py-2.5 border border-neutral-200 rounded-full text-sm font-semibold text-neutral-700 hover:bg-neutral-50">Cancel</button>
          {user.status === "suspended" ? (
            <button onClick={() => doAction("active")}
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-bold transition-colors">
              <ShieldCheck className="w-4 h-4" />Reinstate User
            </button>
          ) : (
            <button onClick={() => doAction("suspended")}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-bold transition-colors">
              <ShieldOff className="w-4 h-4" />Suspend User
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const STATUS_BADGE: Record<UserStatus, string> = {
  active:    "bg-green-100 text-green-800",
  pending:   "bg-amber-100 text-amber-800",
  suspended: "bg-red-100 text-red-800",
};

export default function AdminUsersPage() {
  const { users } = useAdmin();
  const showToast = useToast();
  const [roleFilter,   setRoleFilter]   = useState<RoleFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [managing, setManaging] = useState<PlatformUser | null>(null);

  const filtered = users.filter(u => {
    const matchRole   = roleFilter   === "all" || u.role   === roleFilter;
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchRole && matchStatus;
  });

  const suspended = users.filter(u => u.status === "suspended").length;

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-heading text-xl font-bold text-neutral-900">User Management</h2>
          <p className="text-sm text-neutral-400 mt-0.5">Manage vendor and rider accounts · Enforce platform policies</p>
        </div>
        {suspended > 0 && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-3 py-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span className="text-xs font-semibold text-red-700">{suspended} account{suspended > 1 ? "s" : ""} suspended</span>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1 bg-neutral-100 rounded-xl p-1">
          {(["all","vendor","rider"] as RoleFilter[]).map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={clsx("px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize",
                roleFilter === r ? "bg-white text-neutral-800 shadow-sm" : "text-neutral-500"
              )}>
              {r === "all" ? "All Roles" : r === "vendor" ? "Vendors" : "Riders"}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-neutral-100 rounded-xl p-1">
          {(["all","active","pending","suspended"] as StatusFilter[]).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={clsx("px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize",
                statusFilter === s ? "bg-white text-neutral-800 shadow-sm" : "text-neutral-500"
              )}>
              {s === "all" ? "All Status" : s.charAt(0).toUpperCase()+s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-neutral-50">
                {["User","Role","Contact","City","Joined","Violations","Status","Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[0.7rem] font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-100 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className={clsx("border-t border-neutral-100 transition-colors", u.status === "suspended" ? "bg-red-50/40 hover:bg-red-50/60" : "hover:bg-neutral-50")}>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{u.ini}</div>
                      <div>
                        <p className="font-semibold text-neutral-800">{u.name}</p>
                        {u.reason && <p className="text-[11px] text-red-500 max-w-[180px] truncate">{u.reason}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div>
                      <span className={clsx("inline-flex px-2 py-0.5 rounded-full text-[0.7rem] font-semibold",
                        u.role === "vendor" ? "bg-blue-100 text-blue-700" : "bg-violet-100 text-violet-700"
                      )}>
                        {u.role === "vendor" ? "Vendor" : "Rider"}
                      </span>
                      <p className="text-[11px] text-neutral-400 mt-0.5">{u.subRole}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-xs text-neutral-700">{u.email}</p>
                    <p className="text-[11px] text-neutral-400">{u.phone}</p>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-neutral-500">{u.city}</td>
                  <td className="px-4 py-3.5 text-xs text-neutral-400">{u.joined}</td>
                  <td className="px-4 py-3.5">
                    <span className={clsx("font-heading font-bold text-base", u.violations > 0 ? "text-red-600" : "text-green-600")}>{u.violations}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex px-2.5 py-[3px] rounded-full text-[0.7rem] font-semibold ${STATUS_BADGE[u.status]}`}>
                      {u.status.charAt(0).toUpperCase()+u.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      {u.status === "suspended" ? (
                        <button onClick={() => setManaging(u)}
                          className="flex items-center gap-1 px-2.5 py-1 bg-green-50 border border-green-200 text-green-700 rounded-full text-xs font-semibold hover:bg-green-100 transition-colors">
                          <ShieldCheck className="w-3 h-3" />Reinstate
                        </button>
                      ) : (
                        <button onClick={() => setManaging(u)}
                          className="flex items-center gap-1 px-2.5 py-1 bg-red-50 border border-red-200 text-red-600 rounded-full text-xs font-semibold hover:bg-red-100 transition-colors">
                          <ShieldOff className="w-3 h-3" />Suspend
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

      {managing && <SuspendModal user={managing} onClose={() => setManaging(null)} />}
    </div>
  );
}
