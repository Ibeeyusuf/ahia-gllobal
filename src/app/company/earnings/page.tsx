"use client";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

const BARS = [
  { day:"Mon",h:60},{day:"Tue",h:78},{day:"Wed",h:68},{day:"Thu",h:92},
  { day:"Fri",h:100,active:true},{day:"Sat",h:88},{day:"Sun",h:71},
];

export default function CompanyEarningsPage() {
  const showToast = useToast();
  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-neutral-900">Earnings & Reports</h2>
          <p className="text-sm text-neutral-400 mt-0.5">Track your revenue and download statements</p>
        </div>
        <button onClick={() => showToast("success","Report Ready","Earnings report downloaded successfully.")}
          className="flex items-center gap-2 border border-neutral-200 text-neutral-700 hover:bg-neutral-50 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors">
          <Download className="w-4 h-4" />Download Report
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:"Today",          val:"₦284,500", sub:"+8%",  col:"text-green-600"   },
          { label:"This Week",      val:"₦1.84M",   sub:"+14%", col:"text-green-600"   },
          { label:"This Month",     val:"₦7.6M",    sub:"+22%", col:"text-green-600"   },
          { label:"Pending Payout", val:"₦940,000", sub:"Releases Friday", col:"text-neutral-400" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl2 border border-neutral-100 shadow-card p-5 hover:shadow-hover hover:-translate-y-0.5 transition-all">
            <p className="text-xs font-semibold text-neutral-500 mb-2">{s.label}</p>
            <p className="font-heading text-2xl font-bold text-neutral-900">{s.val}</p>
            <p className={`text-xs mt-1 ${s.col}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card p-5">
        <h3 className="font-heading font-bold text-sm text-neutral-900 mb-4">Daily Earnings — This Week</h3>
        <div className="flex items-end gap-2 h-36">
          {BARS.map(b => (
            <div key={b.day} className="flex flex-col items-center gap-1 flex-1">
              <div className={`w-full rounded-t-md ${(b as any).active ? "bg-primary-600" : "bg-primary-100 hover:bg-primary-200"} transition-colors cursor-pointer`}
                style={{ height:`${b.h}%` }} />
              <p className={`text-[10px] ${(b as any).active ? "text-primary-600 font-bold" : "text-neutral-400"}`}>{b.day}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-100">
          <h3 className="font-heading font-bold text-sm text-neutral-900">Earnings Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-neutral-50">
                {["Date","Orders","Gross Revenue","Platform Fee","Net Earnings","Status"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[0.7rem] font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-100 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { date:"Today",       orders:312, gross:"₦312,000", fee:"-₦27,500", net:"₦284,500", paid:false },
                { date:"Yesterday",   orders:288, gross:"₦288,000", fee:"-₦24,800", net:"₦263,200", paid:false },
                { date:"Last Friday", orders:341, gross:"₦341,000", fee:"-₦29,200", net:"₦311,800", paid:true  },
              ].map(row => (
                <tr key={row.date} className="hover:bg-neutral-50 border-t border-neutral-100">
                  <td className="px-4 py-3.5 text-xs text-neutral-600">{row.date}</td>
                  <td className="px-4 py-3.5 font-semibold">{row.orders}</td>
                  <td className="px-4 py-3.5 font-semibold">{row.gross}</td>
                  <td className="px-4 py-3.5 text-xs text-red-600">{row.fee}</td>
                  <td className="px-4 py-3.5 font-bold text-green-700">{row.net}</td>
                  <td className="px-4 py-3.5">
                    <Badge variant={row.paid ? "active" : "pending"}>{row.paid ? "Paid" : "Pending"}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
