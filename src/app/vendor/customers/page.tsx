"use client";
const CUSTOMERS = [
  {ini:"AO",name:"Adaeze Obi",   email:"adaeze@gmail.com",  phone:"+234 803 456 7890",orders:12,spent:387000,last:"Mar 20, 2026",grad:"from-blue-500 to-violet-500"},
  {ini:"TB",name:"Tunde Bakare", email:"tunde@outlook.com", phone:"+234 812 345 6789",orders:8, spent:245000,last:"Mar 15, 2026",grad:"from-green-500 to-teal-500"},
  {ini:"FU",name:"Fatima Usman", email:"fatima@yahoo.com",  phone:"+234 701 234 5678",orders:5, spent:186500,last:"Mar 10, 2026",grad:"from-amber-500 to-orange-500"},
  {ini:"CN",name:"Chidi Nweke",  email:"chidi@gmail.com",   phone:"+234 906 789 0123",orders:3, spent:138000,last:"Mar 5, 2026", grad:"from-pink-500 to-rose-600"},
  {ini:"NE",name:"Ngozi Eze",    email:"ngozi@gmail.com",   phone:"+234 814 567 8901",orders:9, spent:312500,last:"Mar 18, 2026",grad:"from-cyan-500 to-blue-500"},
];

export default function VendorCustomersPage() {
  return (
    <div className="space-y-4 animate-fade-up">
      <div><p className="text-[0.75rem] text-neutral-400 mb-1">Home / Customers</p>
        <h2 className="font-heading font-bold text-xl text-neutral-900">Customers</h2>
        <p className="text-[0.8rem] text-neutral-400 mt-0.5">All buyers from your store</p>
      </div>
      <div className="bg-white rounded-xl2 border-[1.5px] border-neutral-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[0.82rem]">
            <thead><tr>
              {["Customer","Email","Phone","Total Orders","Total Spent","Last Order"].map(h=>(
                <th key={h} className="px-3.5 py-2.5 text-left text-[0.71rem] font-bold text-neutral-400 uppercase tracking-wider border-b-[1.5px] border-neutral-100 bg-neutral-50 whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {CUSTOMERS.map(c=>(
                <tr key={c.ini} className="hover:bg-neutral-50 border-t border-neutral-50 transition-colors">
                  <td className="px-3.5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-[30px] h-[30px] rounded-full bg-gradient-to-br ${c.grad} flex items-center justify-center text-white text-[0.68rem] font-bold flex-shrink-0`}>{c.ini}</div>
                      <span className="font-semibold text-[0.82rem]">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-3.5 py-3 text-[0.78rem] text-neutral-500">{c.email}</td>
                  <td className="px-3.5 py-3 text-[0.78rem] text-neutral-500">{c.phone}</td>
                  <td className="px-3.5 py-3 font-bold">{c.orders}</td>
                  <td className="px-3.5 py-3 font-bold text-primary-600">₦{c.spent.toLocaleString()}</td>
                  <td className="px-3.5 py-3 text-[0.75rem] text-neutral-400">{c.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
