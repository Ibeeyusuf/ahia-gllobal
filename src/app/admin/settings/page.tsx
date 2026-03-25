"use client";
import { useState } from "react";
import { Shield, Percent } from "lucide-react";
import { Toggle } from "@/components/ui/Toggle";
import { useToast } from "@/components/ui/Toast";

export default function AdminSettingsPage() {
  const showToast = useToast();
  const [toggles, setToggles] = useState({ reg:true, local:true, interstate:true, maintenance:false });
  const [commission, setCommission] = useState({ local:"8", interstate:"5", rider:"75" });

  return (
    <div className="space-y-5 animate-fade-up">
      <h2 className="font-heading text-xl font-bold text-neutral-900">System Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Platform Controls */}
        <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card p-5">
          <h3 className="font-heading font-bold text-sm text-neutral-900 mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary-600" />Platform Controls
          </h3>
          <div className="space-y-4">
            {[
              { key:"reg",         label:"New Company Registrations", desc:"Allow new companies to apply"      },
              { key:"local",       label:"Instant Delivery (Local)",  desc:"Enable local delivery orders"      },
              { key:"interstate",  label:"Nationwide Delivery",       desc:"Enable interstate orders"          },
              { key:"maintenance", label:"Maintenance Mode",          desc:"Take platform offline"             },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div><p className="text-sm font-medium text-neutral-800">{label}</p><p className="text-xs text-neutral-400">{desc}</p></div>
                <Toggle on={toggles[key as keyof typeof toggles]}
                  onChange={v => setToggles(p => ({ ...p, [key]: v }))} />
              </div>
            ))}
          </div>
        </div>

        {/* Commission */}
        <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card p-5">
          <h3 className="font-heading font-bold text-sm text-neutral-900 mb-4 flex items-center gap-2">
            <Percent className="w-4 h-4 text-primary-600" />Commission Rates
          </h3>
          <div className="space-y-3">
            {[
              { key:"local",      label:"Local Delivery Commission (%)" },
              { key:"interstate", label:"Interstate Commission (%)"      },
              { key:"rider",      label:"Rider Payout Rate (%)"         },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-neutral-600 mb-1">{label}</label>
                <input type="number" value={commission[key as keyof typeof commission]}
                  onChange={e => setCommission(p=>({...p,[key]:e.target.value}))}
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm bg-neutral-50 outline-none focus:border-primary-500 transition-colors" />
              </div>
            ))}
            <button onClick={() => showToast("success","Saved","Commission rates updated.")}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-full text-sm font-semibold transition-colors mt-1">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
