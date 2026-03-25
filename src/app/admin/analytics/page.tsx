const BARS = [
  { day:"Mon", h:55 }, { day:"Tue", h:72 }, { day:"Wed", h:65 }, { day:"Thu", h:88 },
  { day:"Fri", h:100, active:true }, { day:"Sat", h:91 }, { day:"Sun", h:68 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-5 animate-fade-up">
      <h2 className="font-heading text-xl font-bold text-neutral-900">Analytics</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:"Orders This Month", val:"28,491", sub:"+22% vs last month", color:"text-green-600" },
          { label:"Revenue This Month", val:"₦87.4M", sub:"+18% vs last month", color:"text-green-600" },
          { label:"Avg Delivery Time",  val:"34m",    sub:"-6min improvement",  color:"text-green-600" },
          { label:"Customer Rating",    val:"4.7 ★",  sub:"14,200 ratings",     color:"text-neutral-400" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl2 border border-neutral-100 shadow-card p-5 hover:shadow-hover hover:-translate-y-0.5 transition-all">
            <p className="text-xs font-semibold text-neutral-500 mb-2">{s.label}</p>
            <p className="font-heading text-2xl font-bold text-neutral-900">{s.val}</p>
            <p className={`text-xs mt-1 ${s.color}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card p-5">
        <h3 className="font-heading font-bold text-sm text-neutral-900 mb-4">Order Volume — Last 7 Days</h3>
        <div className="flex items-end gap-2 h-40">
          {BARS.map(b => (
            <div key={b.day} className="flex flex-col items-center gap-1 flex-1">
              <div className={`w-full rounded-t-lg transition-colors cursor-pointer ${b.active ? "bg-primary-600" : "bg-primary-100 hover:bg-primary-200"}`}
                style={{ height: `${b.h}%` }} />
              <p className={`text-[10px] ${b.active ? "text-primary-600 font-bold" : "text-neutral-400"}`}>{b.day}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
