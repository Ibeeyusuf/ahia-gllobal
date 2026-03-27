"use client";
import { useState } from "react";
import { Search, Edit2, Trash2 } from "lucide-react";
import { useVendor } from "@/context/VendorContext";
import { useToast } from "@/components/ui/Toast";
import { ProductModal } from "@/components/vendor/ProductModal";
import { VendorProduct } from "@/lib/vendorData";

function StatusBadge({ status }: { status: VendorProduct["status"] }) {
  const map = { active:"bg-green-100 text-green-800", out:"bg-red-100 text-red-800", draft:"bg-neutral-100 text-neutral-600", inactive:"bg-neutral-100 text-neutral-600" };
  const lbl = { active:"Active", out:"Out of Stock", draft:"Draft", inactive:"Inactive" };
  return <span className={`inline-flex px-2.5 py-[3px] rounded-full text-[0.7rem] font-bold ${map[status]}`}>{lbl[status]}</span>;
}

export default function VendorProductsPage() {
  const { products, deleteProduct } = useVendor();
  const showToast = useToast();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editing, setEditing] = useState<VendorProduct | null | "new">(null);

  const filtered = products.filter(p => {
    const q = query.toLowerCase();
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q);
    const matchS = !statusFilter || p.status === statusFilter;
    return matchQ && matchS;
  });

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[0.75rem] text-neutral-400 mb-1">Home / Products</p>
          <h2 className="font-heading font-bold text-xl text-neutral-900">Products</h2>
          <p className="text-[0.8rem] text-neutral-400 mt-0.5">Manage your product listings</p>
        </div>
        <button onClick={() => setEditing("new")}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-[0.82rem] font-semibold transition-colors">
          + Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl2 border-[1.5px] border-neutral-100 shadow-card px-4 py-3.5 flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[180px] flex items-center gap-2 bg-neutral-50 border-[1.5px] border-neutral-100 rounded-[9px] px-3 py-[7px]">
          <Search className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
          <input type="text" placeholder="Search products…" value={query} onChange={e=>setQuery(e.target.value)}
            className="bg-transparent outline-none text-[0.82rem] text-neutral-700 placeholder-neutral-400 w-full" />
        </div>
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}
          className="text-[0.8rem] border-[1.5px] border-neutral-100 rounded-[9px] px-3 py-[7px] outline-none text-neutral-600 bg-neutral-50 appearance-none cursor-pointer">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="out">Out of Stock</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl2 border-[1.5px] border-neutral-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[0.82rem]">
            <thead>
              <tr>
                {["","Product","Category","Price","Stock","Status","Actions"].map(h=>(
                  <th key={h} className="px-3.5 py-2.5 text-left text-[0.71rem] font-bold text-neutral-400 uppercase tracking-wider border-b-[1.5px] border-neutral-100 bg-neutral-50 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-neutral-400">
                  <p className="text-lg mb-1">📦</p>
                  <p className="font-semibold text-neutral-700">No products found</p>
                  <button onClick={()=>setEditing("new")} className="mt-3 px-4 py-2 bg-primary-600 text-white rounded-full text-xs font-semibold">Add Product</button>
                </td></tr>
              ) : filtered.map(p => (
                <tr key={p.id} className="hover:bg-neutral-50 border-t border-neutral-50 transition-colors">
                  <td className="px-3.5 py-3"><input type="checkbox" className="accent-primary-600" /></td>
                  <td className="px-3.5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-[38px] h-[38px] bg-neutral-50 border-[1.5px] border-neutral-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">{p.img}</div>
                      <div>
                        <p className="font-semibold text-neutral-900 text-[0.82rem]">{p.name}</p>
                        <p className="text-[0.7rem] text-neutral-400">{p.subcat}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3.5 py-3 text-neutral-500 text-[0.78rem]">{p.cat}</td>
                  <td className="px-3.5 py-3 font-bold">₦{p.price.toLocaleString()}</td>
                  <td className="px-3.5 py-3">
                    <span className={p.stock === 0 || p.stock <= 3 ? "text-red-600 font-bold text-[0.82rem]" : "text-green-700 font-semibold text-[0.82rem]"}>
                      {p.stock === 0 ? "Out of Stock" : `${p.stock} units`}
                    </span>
                  </td>
                  <td className="px-3.5 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-3.5 py-3">
                    <div className="flex items-center gap-1.5">
                      <button onClick={()=>setEditing(p)}
                        className="flex items-center gap-1 px-2.5 py-1 border-[1.5px] border-neutral-200 rounded-full text-[0.75rem] font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors">
                        <Edit2 className="w-3 h-3" />Edit
                      </button>
                      <button onClick={()=>{deleteProduct(p.id); showToast("success","Deleted","Product removed successfully.");}}
                        className="w-[30px] h-[30px] flex items-center justify-center bg-red-50 border border-red-200 text-red-600 rounded-full hover:bg-red-100 transition-colors">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editing !== null && (
        <ProductModal product={editing === "new" ? null : editing} onClose={() => setEditing(null)} />
      )}
    </div>
  );
}
