"use client";
const BARS = [{w:"W1",h:40},{w:"W2",h:62},{w:"W3",h:75},{w:"W4",h:100,active:true}];
const BEST = [
  {rank:1,name:"Sony WH-1000XM5",   rev:"₦1.2M", pct:100},
  {rank:2,name:"JBL Flip 6",         rev:"₦940K", pct:78 },
  {rank:3,name:"Logitech MX Master", rev:"₦670K", pct:55 },
  {rank:4,name:"iPhone 15 Cases",    rev:"₦452K", pct:38 },
];
const FILL = ["bg-primary-600","bg-primary-500","bg-primary-400","bg-primary-300"];

export default function VendorAnalyticsPage() {
  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div><p className="text-[0.75rem] text-neutral-400 mb-1">Home / Analytics</p>
          <h2 className="font-heading font-bold text-xl text-neutral-900">Analytics</h2>
          <p className="text-[0.8rem] text-neutral-400 mt-0.5">Track your store performance</p>
        </div>
        <select className="text-[0.8rem] border-[1.5px] border-neutral-100 rounded-[9px] px-3 py-2 outline-none text-neutral-600 bg-white appearance-none">
          <option>Last 30 Days</option><option>Last 7 Days</option><option>Last 3 Months</option>
        </select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          {label:"Total Revenue",  val:"₦4.7M", sub:"+18.3%"},
          {label:"Total Orders",   val:"1,248",  sub:"+12%"},
          {label:"Growth Rate",    val:"+23.4%", sub:"vs last period", valCls:"text-green-600"},
          {label:"Avg Order Value",val:"₦3,766", sub:"+5.2%"},
        ].map(s=>(
          <div key={s.label} className="bg-white rounded-xl2 border-[1.5px] border-neutral-100 shadow-card p-5 hover:shadow-hover hover:-translate-y-0.5 transition-all">
            <p className="text-[0.72rem] font-semibold text-neutral-400 mb-2">{s.label}</p>
            <p className={`font-heading text-[1.3rem] font-bold ${s.valCls ?? "text-neutral-900"}`}>{s.val}</p>
            <p className="text-[0.72rem] text-green-600 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
        <div className="bg-white rounded-xl2 border-[1.5px] border-neutral-100 shadow-card p-5">
          <p className="font-heading font-bold text-[0.9rem] text-neutral-900 mb-4">Sales Over Time</p>
          <div className="flex items-end gap-1.5 h-[150px]">
            {BARS.map(b=>(
              <div key={b.w} className="flex-1 flex flex-col items-center gap-1 h-full">
                <div className="flex-1 w-full bg-neutral-100 rounded-[6px] overflow-hidden relative">
                  <div className={`absolute bottom-0 left-0 right-0 rounded-[6px] bg-gradient-to-t from-primary-600 to-primary-400 transition-all duration-700`} style={{height:`${b.h}%`}} />
                </div>
                <p className={`text-[0.6rem] ${(b as any).active ? "text-primary-600 font-bold" : "text-neutral-400"}`}>{b.w}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl2 border-[1.5px] border-neutral-100 shadow-card p-5">
          <p className="font-heading font-bold text-[0.9rem] text-neutral-900 mb-4">Best Selling Products</p>
          <div className="grid gap-3">
            {BEST.map((b,i)=>(
              <div key={b.rank} className="flex items-center gap-2.5">
                <span className="text-[0.75rem] font-bold text-neutral-400 w-4">{b.rank}</span>
                <div className="flex-1">
                  <p className="text-[0.8rem] font-semibold text-neutral-900">{b.name}</p>
                  <div className="h-[5px] bg-neutral-100 rounded-full mt-1 overflow-hidden">
                    <div className={`h-full ${FILL[i]} rounded-full`} style={{width:`${b.pct}%`}} />
                  </div>
                </div>
                <span className="text-[0.78rem] font-bold text-neutral-900 whitespace-nowrap">{b.rev}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
