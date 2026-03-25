"use client";
import { useState } from "react";
import { Toggle } from "@/components/ui/Toggle";
import { useToast } from "@/components/ui/Toast";

export default function CompanySettingsPage() {
  const showToast = useToast();
  const [notifs, setNotifs] = useState({ orders:true, riders:true, weekly:false });

  return (
    <div className="space-y-5 animate-fade-up">
      <h2 className="font-heading text-xl font-bold text-neutral-900">Company Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card p-5">
          <h3 className="font-heading font-bold text-sm text-neutral-900 mb-4">Company Profile</h3>
          <div className="space-y-3">
            {[
              { label:"Company Name",   type:"text",  val:"Lagos Express Co."      },
              { label:"Contact Email",  type:"email", val:"ops@lagosexpress.ng"     },
              { label:"Phone",          type:"tel",   val:"+234 801 234 5678"       },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-xs font-medium text-neutral-600 mb-1">{f.label}</label>
                <input type={f.type} defaultValue={f.val}
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm bg-neutral-50 outline-none focus:border-primary-500" />
              </div>
            ))}
            <button onClick={() => showToast("success","Profile Updated","Company profile saved successfully.")}
              className="w-full mt-1 bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-full text-sm font-semibold transition-colors">
              Save Profile
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card p-5">
          <h3 className="font-heading font-bold text-sm text-neutral-900 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            {[
              { key:"orders", label:"New Order Alerts",        desc:"Get notified for every new order"       },
              { key:"riders", label:"Rider Status Updates",    desc:"When riders go online/offline"          },
              { key:"weekly", label:"Weekly Earnings Summary", desc:"Receive weekly email report"            },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div><p className="text-sm font-medium text-neutral-800">{label}</p><p className="text-xs text-neutral-400">{desc}</p></div>
                <Toggle on={notifs[key as keyof typeof notifs]} onChange={v => setNotifs(p=>({...p,[key]:v}))} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
