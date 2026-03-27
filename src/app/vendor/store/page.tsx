"use client";
import { Upload, Save } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

const inputCls = "w-full px-3 py-2.5 border-[1.5px] border-neutral-200 rounded-[10px] text-[0.85rem] outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all bg-white";

export default function VendorStorePage() {
  const showToast = useToast();
  return (
    <div className="space-y-5 animate-fade-up max-w-2xl">
      <div><p className="text-[0.75rem] text-neutral-400 mb-1">Home / Store Settings</p>
        <h2 className="font-heading font-bold text-xl text-neutral-900">Store Settings</h2>
        <p className="text-[0.8rem] text-neutral-400 mt-0.5">Manage your store profile</p>
      </div>

      {/* Logo */}
      <div className="bg-white rounded-xl2 border-[1.5px] border-neutral-100 shadow-card p-[22px]">
        <p className="font-heading font-bold text-[0.9rem] text-neutral-900 mb-4">Store Logo</p>
        <div className="flex items-center gap-4">
          <div className="w-[72px] h-[72px] rounded-[14px] bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center text-white font-heading font-bold text-2xl flex-shrink-0">TH</div>
          <div>
            <button onClick={()=>showToast("info","Upload","Logo upload coming soon.")}
              className="flex items-center gap-1.5 px-3 py-1.5 border-[1.5px] border-neutral-200 rounded-full text-[0.75rem] font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors">
              <Upload className="w-3 h-3" />Upload Logo
            </button>
            <p className="text-[0.72rem] text-neutral-400 mt-1.5">PNG or JPG · max 2MB · Recommended 200×200px</p>
          </div>
        </div>
      </div>

      {/* Store Info */}
      <div className="bg-white rounded-xl2 border-[1.5px] border-neutral-100 shadow-card p-[22px]">
        <p className="font-heading font-bold text-[0.9rem] text-neutral-900 mb-4">Store Information</p>
        <div className="grid gap-3.5">
          <div><label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">Store Name</label>
            <input type="text" defaultValue="TechHub Lagos" className={inputCls} /></div>
          <div><label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">Store Description</label>
            <textarea rows={4} defaultValue="Lagos's premier electronics store. We stock the latest gadgets, headphones, laptops and mobile accessories. All products are genuine with full warranty."
              className={`${inputCls} resize-y`} /></div>
          <div><label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">Store Category</label>
            <select defaultValue="Electronics & Gadgets" className={`${inputCls} appearance-none`}>
              <option>Electronics & Gadgets</option><option>Fashion</option><option>Home & Living</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-xl2 border-[1.5px] border-neutral-100 shadow-card p-[22px]">
        <p className="font-heading font-bold text-[0.9rem] text-neutral-900 mb-4">Contact Information</p>
        <div className="grid gap-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">Business Email</label>
              <input type="email" defaultValue="hello@techhubnig.com" className={inputCls} /></div>
            <div><label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">Phone Number</label>
              <input type="tel" defaultValue="+234 801 234 5678" className={inputCls} /></div>
          </div>
          <div><label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">Store Address</label>
            <input type="text" defaultValue="Plot 14 Computer Village, Ikeja, Lagos" className={inputCls} /></div>
        </div>
      </div>

      <button onClick={()=>showToast("success","Saved","Store settings updated successfully.")}
        className="flex items-center gap-1.5 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-[0.82rem] font-semibold transition-colors">
        <Save className="w-3.5 h-3.5" />Save Store Settings
      </button>
    </div>
  );
}
