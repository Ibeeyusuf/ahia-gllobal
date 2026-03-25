interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  subColor?: string;
  icon: React.ReactNode;
  iconBg?: string;
}

export function StatCard({ label, value, sub, subColor = "text-neutral-400", icon, iconBg = "bg-primary-50" }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl2 border border-neutral-100 p-5 shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-neutral-500">{label}</p>
        <div className={`w-9 h-9 ${iconBg} rounded-xl flex items-center justify-center`}>{icon}</div>
      </div>
      <p className="font-heading text-2xl font-bold text-neutral-900">{value}</p>
      {sub && <p className={`text-xs mt-1 flex items-center gap-1 ${subColor}`}>{sub}</p>}
    </div>
  );
}
