"use client";
import { MessageCircle, Mail, Send } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

const inputCls = "w-full px-3 py-2.5 border-[1.5px] border-neutral-200 rounded-[10px] text-[0.85rem] outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all bg-white";

export default function VendorSupportPage() {
  const showToast = useToast();
  return (
    <div className="space-y-5 animate-fade-up">
      <div><p className="text-[0.75rem] text-neutral-400 mb-1">Home / Support</p>
        <h2 className="font-heading font-bold text-xl text-neutral-900">Support</h2>
        <p className="text-[0.8rem] text-neutral-400 mt-0.5">Get help from the AhiaGlobal seller team</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { icon:<MessageCircle className="w-5 h-5 text-blue-600" />, bg:"bg-blue-100", title:"Live Chat",
            desc:"Chat with a seller success manager in real time. Available Mon–Fri 8am–8pm.",
            btn:"Start Chat", action:()=>showToast("info","Starting Chat…","Connecting you to a support agent.") },
          { icon:<Mail className="w-5 h-5 text-green-600" />, bg:"bg-green-100", title:"Email Support",
            desc:"Send us a detailed message. We reply within 24 hours on business days.",
            btn:"Email Us", action:()=>showToast("info","Email Copied","sellers@ahiaglobal.com copied to clipboard.") },
        ].map(c=>(
          <div key={c.title} className="bg-white rounded-xl2 border-[1.5px] border-neutral-100 shadow-card p-5 flex items-start gap-3.5">
            <div className={`w-[42px] h-[42px] ${c.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>{c.icon}</div>
            <div className="flex-1">
              <p className="font-heading font-bold text-[0.9rem] text-neutral-900 mb-1">{c.title}</p>
              <p className="text-[0.78rem] text-neutral-500 leading-relaxed">{c.desc}</p>
              <button onClick={c.action} className="mt-3 px-3 py-1.5 border-[1.5px] border-neutral-200 rounded-full text-[0.75rem] font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors">{c.btn}</button>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket form */}
      <div className="bg-white rounded-xl2 border-[1.5px] border-neutral-100 shadow-card p-[22px] max-w-2xl">
        <p className="font-heading font-bold text-[0.9rem] text-neutral-900 mb-4">Submit a Support Ticket</p>
        <div className="grid gap-3.5">
          <div><label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">Subject <span className="text-red-500">*</span></label>
            <input type="text" placeholder="e.g. Order #AH-20244 not showing in dashboard" className={inputCls} /></div>
          <div><label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">Category</label>
            <select className={`${inputCls} appearance-none`}>
              <option>Order Issue</option><option>Payment / Withdrawal</option><option>Product Listing</option>
              <option>Account Access</option><option>Other</option>
            </select>
          </div>
          <div><label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">Description</label>
            <textarea rows={5} placeholder="Describe your issue in detail…" className={`${inputCls} resize-y`} /></div>
          <button onClick={()=>showToast("success","Ticket Submitted","Our team will respond within 24 hours.")}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-[0.82rem] font-semibold transition-colors w-fit">
            <Send className="w-3.5 h-3.5" />Submit Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
