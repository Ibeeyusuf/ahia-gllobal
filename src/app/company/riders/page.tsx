"use client";
import { useState } from "react";
import { Plus, Search, Truck, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useCompany } from "@/context/CompanyContext";
import { useToast } from "@/components/ui/Toast";
import type { Rider } from "@/lib/types";

export default function CompanyRidersPage() {
  const { riders, setRiders, companyType } = useCompany();
  const showToast = useToast();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Rider | null>(null);
  const [form, setForm] = useState({ fname:"", lname:"", phone:"", vehicle:"Motorcycle", zone:"" });

  const filtered = riders.filter(r =>
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    r.zone.toLowerCase().includes(query.toLowerCase())
  );

  function openAdd() { setEditing(null); setForm({fname:"",lname:"",phone:"",vehicle:"Motorcycle",zone:""}); setModalOpen(true); }
  function openEdit(r: Rider) {
    const [fn, ...ln] = r.name.split(" ");
    setEditing(r);
    setForm({ fname:fn, lname:ln.join(" "), phone:"", vehicle:r.vehicle, zone:r.zone });
    setModalOpen(true);
  }

  function save() {
    if (!form.fname || !form.lname) { showToast("error","Required","Please enter the rider's full name."); return; }
    if (editing) {
      setRiders(p => p.map(r => r.id === editing.id ? { ...r, name:`${form.fname} ${form.lname}`, zone:form.zone||r.zone } : r));
      showToast("success","Rider Updated",`${form.fname} ${form.lname}'s profile updated.`);
    } else {
      const newRider: Rider = { id:Date.now(), name:`${form.fname} ${form.lname}`, vehicle:form.vehicle, zone:form.zone||"—", orders:0, rating:0, status:"offline", busy:false };
      setRiders(p => [...p, newRider]);
      showToast("success","Rider Added",`${form.fname} ${form.lname} added to your fleet.`);
    }
    setModalOpen(false);
  }

  function toggleStatus(id: number) {
    const r = riders.find(x => x.id === id);
    if (!r) return;
    setRiders(p => p.map(x => x.id === id ? { ...x, status: x.status === "offline" ? "online" : "offline" } : x));
    showToast("info","Rider Updated",`${r.name} is now ${r.status === "offline" ? "online" : "offline"}.`);
  }

  if (companyType === "interstate") {
    return (
      <div className="animate-fade-up">
        <h2 className="font-heading text-xl font-bold text-neutral-900 mb-5">Rider Management</h2>
        <div className="bg-violet-50 border border-violet-200 rounded-xl2 p-8 text-center">
          <div className="w-14 h-14 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="w-7 h-7 text-violet-600" />
          </div>
          <h3 className="font-heading font-bold text-violet-900 text-lg mb-2">Rider Management Not Applicable</h3>
          <p className="text-sm text-violet-700 max-w-md mx-auto">Interstate deliveries are handled directly by your logistics team without individual rider assignments.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-neutral-900">Rider Management</h2>
          <p className="text-sm text-neutral-400 mt-0.5">Manage your fleet of delivery riders</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-colors">
          <Plus className="w-4 h-4" />Add Rider
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label:"Total Riders",   val:riders.length,                              color:"text-neutral-900" },
          { label:"Online Now",     val:riders.filter(r=>r.status==="online").length, color:"text-green-600"   },
          { label:"On Delivery",    val:riders.filter(r=>r.busy).length,             color:"text-amber-600"   },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl2 border border-neutral-100 shadow-card p-5 text-center">
            <p className={`font-heading text-2xl font-bold ${s.color}`}>{s.val}</p>
            <p className="text-xs text-neutral-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-100">
          <div className="flex items-center gap-2 bg-neutral-100 rounded-full px-3 py-1.5 w-full max-w-xs">
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <input type="text" placeholder="Search riders…" value={query} onChange={e=>setQuery(e.target.value)}
              className="bg-transparent outline-none text-xs text-neutral-700 placeholder-neutral-400 w-full" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-neutral-50">
                {["Rider","Vehicle","Zone","Orders Today","Rating","Status","Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[0.7rem] font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => {
                const ini = r.name.split(" ").map(n=>n[0]).join("");
                return (
                  <tr key={r.id} className="hover:bg-neutral-50 transition-colors border-t border-neutral-100">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold">{ini}</div>
                        <span className="font-semibold text-neutral-800">{r.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-neutral-600">{r.vehicle}</td>
                    <td className="px-4 py-3.5 text-xs text-neutral-600">{r.zone}</td>
                    <td className="px-4 py-3.5 font-semibold">{r.orders}</td>
                    <td className="px-4 py-3.5 text-xs font-semibold text-amber-600">{r.rating > 0 ? `★ ${r.rating}` : "—"}</td>
                    <td className="px-4 py-3.5">
                      <Badge variant={r.status === "online" ? (r.busy ? "assigned" : "online") : "offline"}>
                        {r.status === "online" ? (r.busy ? "On Delivery" : "Online") : "Offline"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openEdit(r)} className="px-2.5 py-1 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors">Edit</button>
                        <button onClick={() => toggleStatus(r.id)}
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors border ${r.status === "offline" ? "border-green-200 text-green-600 hover:bg-green-50" : "border-red-100 text-red-600 hover:bg-red-50"}`}>
                          {r.status === "offline" ? "Activate" : "Deactivate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4" style={{ background:"rgba(15,23,42,.55)", backdropFilter:"blur(4px)" }}>
          <div className="bg-white rounded-xl3 shadow-modal w-full max-w-md animate-fade-up">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <h3 className="font-heading font-bold text-neutral-900">{editing ? "Edit Rider" : "Add New Rider"}</h3>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center">
                <X className="w-4 h-4 text-neutral-600" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">First Name</label>
                  <input value={form.fname} onChange={e=>setForm(p=>({...p,fname:e.target.value}))}
                    placeholder="Emeka" className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm bg-neutral-50 outline-none focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">Last Name</label>
                  <input value={form.lname} onChange={e=>setForm(p=>({...p,lname:e.target.value}))}
                    placeholder="Okafor" className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm bg-neutral-50 outline-none focus:border-primary-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">Vehicle Type</label>
                <select value={form.vehicle} onChange={e=>setForm(p=>({...p,vehicle:e.target.value}))}
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm bg-neutral-50 outline-none appearance-none">
                  <option>Bicycle</option><option>Motorcycle</option><option>Car / Van</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">Zone / Area</label>
                <input value={form.zone} onChange={e=>setForm(p=>({...p,zone:e.target.value}))}
                  placeholder="e.g. Ikeja, Lekki" className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm bg-neutral-50 outline-none focus:border-primary-500" />
              </div>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 border border-neutral-200 rounded-full text-sm font-semibold text-neutral-700 hover:bg-neutral-50">Cancel</button>
              <button onClick={save} className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-sm font-bold transition-colors">
                {editing ? "Save Changes" : "Add Rider"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
