"use client";
import { useState } from "react";
import { Plus, FileSearch } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { statusLabel } from "@/lib/statusLabel";
import { ReviewModal } from "@/components/admin/ReviewModal";
import { useAdmin } from "@/context/AdminContext";
import { useToast } from "@/components/ui/Toast";
import { clsx } from "clsx";
import type { Company, CompanyStatus } from "@/lib/types";

type Filter = "all" | CompanyStatus;

export default function CompaniesPage() {
  const { companies, updateCompanyStatus } = useAdmin();
  const showToast = useToast();
  const [filter, setFilter] = useState<Filter>("all");
  const [reviewing, setReviewing] = useState<Company | null>(null);

  const counts = {
    all: companies.length,
    active: companies.filter(c=>c.status==="active").length,
    pending: companies.filter(c=>c.status==="pending").length,
    suspended: companies.filter(c=>c.status==="suspended").length,
  };

  const filtered = filter === "all" ? companies : companies.filter(c => c.status === filter);

  function doAction(name: string, action: "suspend" | "reinstate") {
    const newStatus: CompanyStatus = action === "suspend" ? "suspended" : "active";
    updateCompanyStatus(name, newStatus);
    showToast(action === "suspend" ? "warn" : "success",
      action === "suspend" ? "Company Suspended" : "Company Reinstated",
      name + (action === "suspend" ? " has been suspended." : " is now active.")
    );
  }

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-neutral-900">Companies</h2>
          <p className="text-sm text-neutral-400 mt-0.5">Manage all onboarded logistics companies</p>
        </div>
        <button onClick={() => showToast("info","Coming Soon","Company onboarding form will be available shortly.")}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-colors">
          <Plus className="w-4 h-4" />Add Company
        </button>
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

      {/* Table */}
      <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-neutral-50">
                {["Company","Type","City","Riders","Orders","Status","Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[0.7rem] font-bold text-neutral-400 uppercase tracking-wider whitespace-nowrap border-b border-neutral-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(co => (
                <tr key={co.name} className="hover:bg-neutral-50 transition-colors border-t border-neutral-100">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${co.clr}`}>{co.ini}</div>
                      <span className="font-semibold text-neutral-800">{co.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5"><Badge variant={co.type === "Local" ? "local" : "interstate"}>{co.type}</Badge></td>
                  <td className="px-4 py-3.5 text-xs text-neutral-600">{co.city}</td>
                  <td className="px-4 py-3.5 font-medium text-neutral-700">
                    {co.type === "Local" ? co.riders : <span className="text-neutral-400 text-xs">N/A</span>}
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-neutral-800">{co.orders}</td>
                  <td className="px-4 py-3.5">
                    <Badge variant={co.status}>{statusLabel(co.status)}</Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      {co.status === "pending" ? (
                        <button onClick={() => setReviewing(co)}
                          className="flex items-center gap-1 px-2.5 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-xs font-bold transition-colors">
                          <FileSearch className="w-3 h-3" />Review Docs
                        </button>
                      ) : (
                        <>
                          <button onClick={() => setReviewing(co)}
                            className="px-2.5 py-1 border border-neutral-200 text-neutral-600 rounded-full text-xs font-semibold hover:bg-neutral-50 transition-colors">View</button>
                          {co.status === "active" ? (
                            <button onClick={() => doAction(co.name,"suspend")}
                              className="px-2.5 py-1 border border-neutral-200 text-neutral-600 rounded-full text-xs font-semibold hover:bg-neutral-50 transition-colors">Suspend</button>
                          ) : (
                            <button onClick={() => doAction(co.name,"reinstate")}
                              className="px-2.5 py-1 bg-green-600 hover:bg-green-700 text-white rounded-full text-xs font-bold transition-colors">Reinstate</button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {reviewing && <ReviewModal company={reviewing} onClose={() => setReviewing(null)} />}
    </div>
  );
}
