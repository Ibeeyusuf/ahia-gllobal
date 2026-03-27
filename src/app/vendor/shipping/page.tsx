"use client";
import { MapPin, Globe, Clock, Save } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

const inputCls = "w-full px-3 py-2.5 border-[1.5px] border-neutral-200 rounded-[10px] text-[0.85rem] outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all bg-white";
const selectCls = `${inputCls} appearance-none`;

export default function VendorShippingPage() {
  const showToast = useToast();
  const REGIONS = ["Lagos","Abuja","Port Harcourt","Kano","Ibadan","Enugu","Nationwide"];
  const TIMELINES = [
    {label:"Lagos (Local)",       val:"Same day (0–4 hrs)", opts:["Same day (0–4 hrs)","Next day"]},
    {label:"South-West States",   val:"1–2 days",           opts:["1–2 days","2–3 days"]},
    {label:"Nationwide",          val:"3–5 days",           opts:["3–5 days","5–7 days"]},
  ];

  return (
    <div className="space-y-5 animate-fade-up max-w-2xl">
      <div><p className="text-[0.75rem] text-neutral-400 mb-1">Home / Shipping Settings</p>
        <h2 className="font-heading font-bold text-xl text-neutral-900">Shipping Settings</h2>
        <p className="text-[0.8rem] text-neutral-400 mt-0.5">Configure your delivery options</p>
      </div>

      {/* Origin */}
      <div className="bg-white rounded-xl2 border-[1.5px] border-neutral-100 shadow-card p-[22px]">
        <p className="font-heading font-bold text-[0.9rem] text-neutral-900 mb-4 flex items-center gap-2"><MapPin className="w-4 h-4 text-primary-600" />Shipping Origin</p>
        <div className="grid gap-3">
          <div><label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">Warehouse / Fulfillment Address</label>
            <input type="text" defaultValue="Plot 14 Computer Village, Ikeja, Lagos" className={inputCls} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">City</label><input type="text" defaultValue="Lagos" className={inputCls} /></div>
            <div><label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">State</label><input type="text" defaultValue="Lagos State" className={inputCls} /></div>
          </div>
        </div>
      </div>

      {/* Regions */}
      <div className="bg-white rounded-xl2 border-[1.5px] border-neutral-100 shadow-card p-[22px]">
        <p className="font-heading font-bold text-[0.9rem] text-neutral-900 mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-primary-600" />Supported Delivery Regions</p>
        <div className="grid grid-cols-2 gap-2.5">
          {REGIONS.map((r,i)=>(
            <label key={r} className="flex items-center gap-2 text-[0.82rem] cursor-pointer">
              <input type="checkbox" defaultChecked={i<3} className="accent-primary-600" />{r}
            </label>
          ))}
        </div>
      </div>

      {/* Timelines */}
      <div className="bg-white rounded-xl2 border-[1.5px] border-neutral-100 shadow-card p-[22px]">
        <p className="font-heading font-bold text-[0.9rem] text-neutral-900 mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-primary-600" />Delivery Timelines</p>
        <div className="grid gap-3">
          {TIMELINES.map(t=>(
            <div key={t.label} className="grid grid-cols-2 gap-3 items-center">
              <p className="text-[0.82rem] font-medium text-neutral-700">{t.label}</p>
              <select defaultValue={t.val} className={selectCls}>{t.opts.map(o=><option key={o}>{o}</option>)}</select>
            </div>
          ))}
        </div>
      </div>

      <button onClick={()=>showToast("success","Saved","Shipping settings updated successfully.")}
        className="flex items-center gap-1.5 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-[0.82rem] font-semibold transition-colors">
        <Save className="w-3.5 h-3.5" />Save Shipping Settings
      </button>
    </div>
  );
}
