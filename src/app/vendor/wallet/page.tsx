"use client";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

const TXNS = [
  {date:"Mar 21, 2026",desc:"Order #AH-20244 — JBL Flip 6",     type:"Credit", typeClr:"bg-green-100 text-green-800",amount:"+₦45,000",  amtClr:"text-green-700",status:"Settled"},
  {date:"Mar 20, 2026",desc:"Weekly Payout — Mar W3",            type:"Payout", typeClr:"bg-blue-100 text-blue-800",  amount:"−₦380,000", amtClr:"text-red-700",  status:"Paid"},
  {date:"Mar 18, 2026",desc:"Order #AH-20241 — Samsung Buds",    type:"Credit", typeClr:"bg-green-100 text-green-800",amount:"+₦34,500",  amtClr:"text-green-700",status:"Pending"},
  {date:"Mar 15, 2026",desc:"Order #AH-20239 — Sony XM5",        type:"Credit", typeClr:"bg-green-100 text-green-800",amount:"+₦89,000",  amtClr:"text-green-700",status:"Settled"},
  {date:"Mar 13, 2026",desc:"Platform Fee — March",              type:"Debit",  typeClr:"bg-red-100 text-red-800",    amount:"−₦15,000",  amtClr:"text-red-700",  status:"Settled"},
];
const STATUS_CLS: Record<string,string> = {Settled:"bg-green-100 text-green-800",Pending:"bg-amber-100 text-amber-800",Paid:"bg-green-100 text-green-800"};

export default function VendorWalletPage() {
  const showToast = useToast();
  return (
    <div className="space-y-5 animate-fade-up">
      <div><p className="text-[0.75rem] text-neutral-400 mb-1">Home / Wallet</p>
        <h2 className="font-heading font-bold text-xl text-neutral-900">Wallet & Earnings</h2>
        <p className="text-[0.8rem] text-neutral-400 mt-0.5">Your store finances</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Available */}
        <div className="relative bg-neutral-900 rounded-xl3 p-6 text-white overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-600/12 rounded-full" />
          <div className="absolute right-10 -bottom-16 w-32 h-32 bg-primary-600/8 rounded-full" />
          <div className="relative z-10">
            <p className="text-[0.72rem] font-semibold uppercase tracking-wider text-neutral-500 mb-2">Available Balance</p>
            <p className="font-heading text-[2rem] font-bold text-white">₦940,000</p>
            <p className="text-[0.75rem] text-neutral-500 mt-1 mb-4">Withdrawable immediately</p>
            <button onClick={() => showToast("success","Withdrawal Initiated","₦940,000 will be in your account within 24 hours.")}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-[0.82rem] font-semibold transition-colors">
              ↓ Request Withdrawal
            </button>
          </div>
        </div>

        {/* Pending */}
        <div className="relative rounded-xl3 p-6 text-white overflow-hidden" style={{background:"linear-gradient(135deg,#1e293b,#334155)"}}>
          <div className="relative z-10">
            <p className="text-[0.72rem] font-semibold uppercase tracking-wider text-neutral-500 mb-2">Pending Balance</p>
            <p className="font-heading text-[2rem] font-bold text-amber-400">₦284,500</p>
            <p className="text-[0.75rem] text-neutral-500 mt-1 mb-4">Clears in 3–5 business days</p>
            <div className="bg-amber-400/10 border border-amber-400/20 rounded-lg px-3 py-2">
              <p className="text-[0.72rem] text-amber-300">⏱ From 312 orders this week</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl2 border-[1.5px] border-neutral-100 shadow-card overflow-hidden">
        <div className="px-[18px] py-4 border-b border-neutral-100 flex items-center justify-between">
          <p className="font-heading font-bold text-[0.9rem] text-neutral-900">Transaction History</p>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border-[1.5px] border-neutral-200 rounded-full text-[0.75rem] font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors">
            <Download className="w-3 h-3" />Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[0.82rem]">
            <thead><tr>
              {["Date","Description","Type","Amount","Status"].map(h=>(
                <th key={h} className="px-3.5 py-2.5 text-left text-[0.71rem] font-bold text-neutral-400 uppercase tracking-wider border-b-[1.5px] border-neutral-100 bg-neutral-50 whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {TXNS.map((t,i)=>(
                <tr key={i} className="hover:bg-neutral-50 border-t border-neutral-50 transition-colors">
                  <td className="px-3.5 py-3 text-[0.75rem] text-neutral-400 whitespace-nowrap">{t.date}</td>
                  <td className="px-3.5 py-3 text-[0.8rem]">{t.desc}</td>
                  <td className="px-3.5 py-3"><span className={`inline-flex px-2.5 py-[3px] rounded-full text-[0.7rem] font-bold ${t.typeClr}`}>{t.type}</span></td>
                  <td className={`px-3.5 py-3 font-bold ${t.amtClr}`}>{t.amount}</td>
                  <td className="px-3.5 py-3"><span className={`inline-flex px-2.5 py-[3px] rounded-full text-[0.7rem] font-bold ${STATUS_CLS[t.status]}`}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
