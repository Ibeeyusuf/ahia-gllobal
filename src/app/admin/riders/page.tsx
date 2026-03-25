import { Badge } from "@/components/ui/Badge";
import { ALL_RIDERS } from "@/lib/data";

export default function AllRidersPage() {
  return (
    <div className="space-y-5 animate-fade-up">
      <h2 className="font-heading text-xl font-bold text-neutral-900">All Riders</h2>
      <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-neutral-50">
                {["Rider","Company","Vehicle","City","Orders Today","Rating","Status"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[0.7rem] font-bold text-neutral-400 uppercase tracking-wider whitespace-nowrap border-b border-neutral-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL_RIDERS.map(r => {
                const ini = r.name.split(" ").map((n:string)=>n[0]).join("");
                return (
                  <tr key={r.name} className="hover:bg-neutral-50 transition-colors border-t border-neutral-100">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold">{ini}</div>
                        <span className="font-medium text-neutral-800">{r.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-neutral-500">{r.company}</td>
                    <td className="px-4 py-3.5 text-xs text-neutral-600">{r.vehicle}</td>
                    <td className="px-4 py-3.5 text-xs text-neutral-600">{r.city}</td>
                    <td className="px-4 py-3.5 font-semibold">{r.orders}</td>
                    <td className="px-4 py-3.5 text-xs font-semibold text-amber-600">★ {r.rating}</td>
                    <td className="px-4 py-3.5">
                      <Badge variant={r.status === "online" ? "online" : "offline"}>
                        {r.status === "online" ? "● Online" : "● Offline"}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
