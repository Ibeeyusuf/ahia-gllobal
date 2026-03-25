"use client";
import { useState } from "react";
import { X, Check, XCircle, CheckCircle, Flag, AlertTriangle, User, Mail, Phone, Building2, Hash, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useAdmin } from "@/context/AdminContext";
import { useToast } from "@/components/ui/Toast";
import type { Company } from "@/lib/types";
import { clsx } from "clsx";

type Tab = "overview" | "documents" | "contact";

interface ReviewModalProps {
  company: Company;
  onClose: () => void;
}

export function ReviewModal({ company: initialCo, onClose }: ReviewModalProps) {
  const { companies, updateCompanyStatus, updateDoc } = useAdmin();
  const showToast = useToast();
  const [tab, setTab] = useState<Tab>("overview");

  // Live company from context (reflects doc updates)
  const co = companies.find(c => c.name === initialCo.name) ?? initialCo;
  const verified = co.docs.filter(d => d.st === "verified").length;
  const total    = co.docs.length;

  function handleAction(action: "approve" | "reject") {
    const unv = co.docs.filter(d => d.st !== "verified").length;
    if (action === "approve" && unv > 0) {
      if (!window.confirm(`${unv} document(s) are not yet verified. Approve anyway?`)) return;
    }
    updateCompanyStatus(co.name, action === "approve" ? "active" : "suspended");
    showToast(action === "approve" ? "success" : "warn",
      action === "approve" ? "Company Approved" : "Application Rejected",
      action === "approve" ? `${co.name} is now live on the platform.` : `${co.name} has been declined.`
    );
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-3 md:p-6"
      style={{ background: "rgba(15,23,42,.65)", backdropFilter: "blur(6px)" }}>
      <div className="bg-white rounded-xl3 shadow-modal w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-fade-up">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${co.clr}`}>{co.ini}</div>
            <div>
              <h3 className="font-heading font-bold text-neutral-900 text-base">{co.name}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant={co.status === "pending" ? "pending" : co.status === "active" ? "active" : "suspended"}>
                  {co.status === "pending" ? "Pending Review" : co.status === "active" ? "Active" : "Suspended"}
                </Badge>
                <span className="text-[10px] text-neutral-400">{co.type} · Applied {co.applied}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-neutral-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-100 px-2 flex-shrink-0">
          {(["overview","documents","contact"] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={clsx("px-4 py-3 text-[0.8125rem] font-medium border-b-2 transition-all capitalize",
                tab === t ? "text-primary-600 border-primary-600 font-semibold" : "text-neutral-500 border-transparent hover:text-primary-600"
              )}>
              {t === "documents" ? (
                <span className="flex items-center gap-1.5">Documents
                  <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{total}</span>
                </span>
              ) : t === "contact" ? "Contact & Legal" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {tab === "overview" && (
            <div className="animate-fade-up">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[["Company Type", co.type+" Delivery"], ["City", co.city], ["Fleet", co.fleet], ["Plan", co.plan]].map(([l, v]) => (
                  <div key={l} className="bg-neutral-50 rounded-xl p-3.5">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">{l}</p>
                    <p className="font-heading font-bold text-neutral-900 text-sm">{v}</p>
                  </div>
                ))}
              </div>
              <div className="bg-neutral-50 rounded-xl p-3.5 mb-4">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Business Description</p>
                <p className="text-sm text-neutral-700 leading-relaxed">{co.desc}</p>
              </div>
              <div className="bg-primary-50 border border-primary-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-primary-900">Document Verification Progress</p>
                  <p className="text-xs font-bold text-primary-600">{verified} / {total}</p>
                </div>
                <div className="w-full h-2 bg-primary-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-600 rounded-full transition-all duration-500" style={{ width: `${Math.round(verified/total*100)}%` }} />
                </div>
                <p className="text-[11px] text-primary-700 mt-2">Go to the Documents tab to verify each submission before approving.</p>
              </div>
            </div>
          )}

          {tab === "documents" && (
            <div className="animate-fade-up">
              <p className="text-xs text-neutral-500 mb-4">Click Verify on each document that looks valid, or flag any issues.</p>
              <div className="space-y-3">
                {co.docs.map((doc, i) => {
                  const isV = doc.st === "verified";
                  const isF = doc.st === "flagged";
                  return (
                    <div key={i} className={clsx("border-2 rounded-xl p-4 transition-colors",
                      isV ? "border-green-200 bg-green-50" : isF ? "border-red-200 bg-red-50" : "border-neutral-100 bg-white"
                    )}>
                      <div className="flex items-center gap-3">
                        <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                          isV ? "bg-green-100" : isF ? "bg-red-100" : "bg-neutral-100"
                        )}>
                          <span className={clsx("text-lg", isV ? "text-green-600" : isF ? "text-red-500" : "text-neutral-500")}>
                            {doc.icon === "file-text" ? "📄" : doc.icon === "user-check" ? "🪪" : doc.icon === "receipt" ? "🧾" : doc.icon === "shield-check" ? "🛡️" : "📍"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-neutral-900 mb-2">{doc.label}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            {isV && (
                              <>
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                                  <Check className="w-3 h-3" />Verified
                                </span>
                                <button onClick={() => updateDoc(co.name, i, "pending")} className="text-[11px] text-neutral-400 hover:text-neutral-600 underline">Undo</button>
                              </>
                            )}
                            {isF && (
                              <>
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-100 px-2.5 py-1 rounded-full">
                                  <AlertTriangle className="w-3 h-3" />Issues Found
                                </span>
                                <button onClick={() => updateDoc(co.name, i, "pending")} className="text-[11px] text-neutral-400 hover:text-neutral-600 underline">Undo</button>
                              </>
                            )}
                            {!isV && !isF && (
                              <>
                                <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Awaiting review</span>
                                <button onClick={() => updateDoc(co.name, i, "verified")}
                                  className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-full text-xs font-bold transition-colors">
                                  <Check className="w-3 h-3" />Verify
                                </button>
                                <button onClick={() => updateDoc(co.name, i, "flagged")}
                                  className="flex items-center gap-1 px-3 py-1.5 border-2 border-red-200 text-red-600 rounded-full text-xs font-bold hover:bg-red-50 transition-colors">
                                  <Flag className="w-3 h-3" />Flag Issues
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {isF && (
                        <div className="mt-3">
                          <input type="text" placeholder="Describe the issue e.g. document expired..."
                            className="w-full px-3 py-2 border border-red-200 rounded-lg text-xs bg-red-50 outline-none focus:border-red-400" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "contact" && (
            <div className="animate-fade-up space-y-4">
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-3">Primary Contact</p>
                <div className="space-y-3">
                  {[
                    { icon: <User className="w-4 h-4 text-neutral-500" />, label: "Full Name", val: co.contact.name },
                    { icon: <Mail className="w-4 h-4 text-neutral-500" />, label: "Email", val: co.contact.email },
                    { icon: <Phone className="w-4 h-4 text-neutral-500" />, label: "Phone", val: co.contact.phone },
                  ].map(({ icon, label, val }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg border border-neutral-200 flex items-center justify-center flex-shrink-0">{icon}</div>
                      <div><p className="text-[10px] text-neutral-400">{label}</p><p className="text-sm font-semibold text-neutral-800">{val}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-3">Legal Details</p>
                <div className="space-y-3">
                  {[
                    { icon: <Building2 className="w-4 h-4 text-neutral-500" />, label: "Registered Name", val: co.legal.reg },
                    { icon: <Hash className="w-4 h-4 text-neutral-500" />, label: "CAC Number", val: co.legal.cac },
                    { icon: <MapPin className="w-4 h-4 text-neutral-500" />, label: "Address", val: co.legal.addr },
                  ].map(({ icon, label, val }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg border border-neutral-200 flex items-center justify-center flex-shrink-0">{icon}</div>
                      <div><p className="text-[10px] text-neutral-400">{label}</p><p className="text-sm font-semibold text-neutral-800">{val}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                  Admin Notes <span className="font-normal text-neutral-400">(internal)</span>
                </label>
                <textarea rows={3} placeholder="Add notes about this application…"
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm bg-neutral-50 outline-none resize-none focus:border-primary-500 transition-colors" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-100 flex items-center gap-3 flex-shrink-0 bg-neutral-50">
          <button onClick={onClose} className="px-5 py-2.5 border border-neutral-200 rounded-full text-sm font-semibold text-neutral-700 hover:bg-white transition-colors">Close</button>
          <div className="flex-1" />
          {co.status === "pending" && (
            <>
              <button onClick={() => handleAction("reject")}
                className="flex items-center gap-2 px-5 py-2.5 border-2 border-red-200 text-red-600 rounded-full text-sm font-bold hover:bg-red-50 transition-colors">
                <XCircle className="w-4 h-4" />Reject
              </button>
              <button onClick={() => handleAction("approve")}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-bold transition-colors">
                <CheckCircle className="w-4 h-4" />Approve Company
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
