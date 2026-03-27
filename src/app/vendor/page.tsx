"use client";
import { useState } from "react";
import Link from "next/link";
import { TrendingUp, ShoppingBag, Clock, CheckCircle, AlertTriangle, ArrowUpRight } from "lucide-react";
import { useVendor } from "@/context/VendorContext";
import { ProductModal } from "@/components/vendor/ProductModal";
import { Badge } from "@/components/ui/Badge";

const BARS = [
  {day:"Mon",h:45},{day:"Tue",h:68},{day:"Wed",h:55},{day:"Thu",h:88},
  {day:"Fri",h:100,active:true},{day:"Sat",h:74},{day:"Sun",h:62},
];

const RECENT_ORDERS = [
  {id:"AH-20245",customer:"Adaeze Obi",   product:"Sony WH-1000XM5",       amount:89000,  status:"pending"    as const},
  {id:"AH-20244",customer:"Tunde Bakare", product:"JBL Flip 6",             amount:45000,  status:"processing" as const},
  {id:"AH-20243",customer:"Fatima Usman", product:"iPhone 15 Case × 3",     amount:18000,  status:"delivered"  as const},
  {id:"AH-20242",customer:"Chidi Nweke",  product:"Logitech MX Master",     amount:67000,  status:"pending"    as const},
  {id:"AH-20241",customer:"Ngozi Eze",    product:"Samsung Galaxy Buds",    amount:34500,  status:"assigned"   as const},
];

const STATUS_MAP: Record<string,{cls:string;label:string}> = {
  pending:    {cls:"bg-orange-100 text-orange-700",   label:"Pending"},
  processing: {cls:"bg-blue-100 text-blue-700",       label:"Processing"},
  delivered:  {cls:"bg-green-100 text-green-700",     label:"Delivered"},
  assigned:   {cls:"bg-violet-100 text-violet-700",   label:"Ready"},
};

export default function VendorDashboard() {
  const { products, orders } = useVendor();
  const [addOpen, setAddOpen] = useState(false);
  const lowStock = products.filter(p => p.stock <= 3).length;
  const pending  = orders.pending?.length ?? 0;

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Breadcrumb + header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[0.75rem] text-neutral-400 mb-1">Home / Dashboard</p>
          <h2 className="font-heading font-bold text-xl text-neutral-900">Welcome back, TechHub 👋</h2>
          <p className="text-[0.8rem] text-neutral-400 mt-0.5">Here's what's happening in your store today</p>
        </div>
        <button onClick={() => setAddOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-[0.82rem] font-semibold transition-colors">
          + Add Product
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        {[
          { label:"Total Sales",      val:"₦4.7M",  sub:"+18.3% this month", subCls:"text-green-600",  bg:"bg-primary-50",  ic:<TrendingUp className="w-4 h-4 text-primary-600" />         },
          { label:"Total Orders",     val:"1,248",  sub:"+12% this month",   subCls:"text-green-600",  bg:"bg-violet-50",   ic:<ShoppingBag className="w-4 h-4 text-violet-600" />          },
          { label:"Pending Orders",   val:String(pending), sub:"Requires action",subCls:"text-primary-600",bg:"bg-orange-50",ic:<Clock className="w-4 h-4 text-primary-600" />, valCls:"text-primary-600" },
          { label:"Completed",        val:"1,189",  sub:"95.3% success rate", subCls:"text-green-600", bg:"bg-green-50",    ic:<CheckCircle className="w-4 h-4 text-green-600" />           },
          { label:"Low Stock",        val:String(lowStock), sub:"Products need restock",subCls:"text-red-600",bg:"bg-red-50",ic:<AlertTriangle className="w-4 h-4 text-red-600" />, valCls:"text-red-600" },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl2 border-[1.5px] border-neutral-100 p-[18px] shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all">
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-[0.72rem] font-semibold text-neutral-400">{k.label}</p>
              <div className={`w-[34px] h-[34px] ${k.bg} rounded-[10px] flex items-center justify-center`}>{k.ic}</div>
            </div>
            <p className={`font-heading text-[1.35rem] font-bold ${k.valCls ?? "text-neutral-900"}`}>{k.val}</p>
            <p className={`text-[0.72rem] mt-1 flex items-center gap-1 ${k.subCls}`}>
              <ArrowUpRight className="w-3 h-3" />{k.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Chart + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
        {/* Sales chart */}
        <div className="bg-white rounded-xl2 border-[1.5px] border-neutral-100 shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="font-heading font-bold text-[0.9rem] text-neutral-900">Sales Overview</p>
            <select className="text-[0.72rem] border-[1.5px] border-neutral-100 rounded-lg px-2 py-1 outline-none text-neutral-500">
              <option>This Week</option><option>This Month</option><option>This Year</option>
            </select>
          </div>
          <div className="flex items-end gap-1.5 h-[120px]">
            {BARS.map(b => (
              <div key={b.day} className="flex-1 flex flex-col items-center gap-1 h-full">
                <div className="flex-1 w-full bg-neutral-100 rounded-[6px] overflow-hidden relative">
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-600 to-primary-400 rounded-[6px] transition-all duration-700" style={{height:`${b.h}%`}} />
                </div>
                <p className={`text-[0.62rem] ${(b as any).active ? "text-primary-600 font-bold" : "text-neutral-400"}`}>{b.day}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-neutral-100 flex justify-between">
            <div><p className="text-[0.7rem] text-neutral-400">This week</p><p className="text-[0.9rem] font-bold text-neutral-900">₦842,500</p></div>
            <div className="text-right"><p className="text-[0.7rem] text-neutral-400">Avg/day</p><p className="text-[0.9rem] font-bold text-neutral-900">₦120,357</p></div>
          </div>
        </div>

        {/* Recent orders */}
        <div className="bg-white rounded-xl2 border-[1.5px] border-neutral-100 shadow-card">
          <div className="flex items-center justify-between px-[18px] py-4 border-b border-neutral-100">
            <p className="font-heading font-bold text-[0.9rem] text-neutral-900">Recent Orders</p>
            <Link href="/vendor/orders" className="text-[0.82rem] border-[1.5px] border-neutral-200 px-3 py-1.5 rounded-full text-neutral-700 hover:bg-neutral-50 transition-colors font-semibold">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[0.82rem]">
              <thead>
                <tr className="bg-neutral-50">
                  {["Order ID","Customer","Product","Amount","Status"].map(h=>(
                    <th key={h} className="px-3.5 py-2.5 text-left text-[0.71rem] font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-100 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map(o=>{
                  const s = STATUS_MAP[o.status] ?? {cls:"bg-neutral-100 text-neutral-600",label:o.status};
                  return (
                    <tr key={o.id} className="hover:bg-neutral-50 border-t border-neutral-50 transition-colors">
                      <td className="px-3.5 py-3 text-primary-600 font-bold text-[0.78rem]">#{o.id}</td>
                      <td className="px-3.5 py-3 text-[0.8rem]">{o.customer}</td>
                      <td className="px-3.5 py-3 text-[0.78rem] text-neutral-500 max-w-[130px] truncate">{o.product}</td>
                      <td className="px-3.5 py-3 font-bold">₦{o.amount.toLocaleString()}</td>
                      <td className="px-3.5 py-3"><span className={`inline-flex px-2.5 py-[3px] rounded-full text-[0.7rem] font-bold ${s.cls}`}>{s.label}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {addOpen && <ProductModal product={null} onClose={() => setAddOpen(false)} />}
    </div>
  );
}
