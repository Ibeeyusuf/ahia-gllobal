"use client";
import { useState, useEffect } from "react";
import { X, Check, Plus, Trash2, ImagePlus, Video } from "lucide-react";
import { useVendor } from "@/context/VendorContext";
import { useToast } from "@/components/ui/Toast";
import { SUBCATS, VendorProduct } from "@/lib/vendorData";
import { clsx } from "clsx";

type Tab = "basic"|"pricing"|"inventory"|"media"|"desc"|"specs"|"shipping"|"returns";
const TABS: {key:Tab; label:string}[] = [
  {key:"basic",    label:"Basic Info"},
  {key:"pricing",  label:"Pricing"},
  {key:"inventory",label:"Inventory"},
  {key:"media",    label:"Media"},
  {key:"desc",     label:"Description"},
  {key:"specs",    label:"Specifications"},
  {key:"shipping", label:"Shipping"},
  {key:"returns",  label:"Returns"},
];

interface Props { product: VendorProduct | null; onClose: () => void; }

export function ProductModal({ product, onClose }: Props) {
  const { setProducts } = useVendor();
  const showToast = useToast();
  const [tab, setTab] = useState<Tab>("basic");
  const [imgCount, setImgCount] = useState(0);
  const [hasVideo, setHasVideo] = useState(false);
  const [specs, setSpecs] = useState([{k:"Colour",v:"Midnight Black"},{k:"Weight",v:"254g"}]);
  const [form, setForm] = useState({
    name:"", cat:"", subcat:"", status:"active" as VendorProduct["status"],
    price:"", disc:"", stock:"", sku:"", description:"",
    regions:"Nationwide", deltime:"1–2 days", retwin:"30 days", refund:"3–5 business days",
  });

  useEffect(() => {
    if (product) {
      setForm(f => ({ ...f, name:product.name, cat:product.cat, subcat:product.subcat,
        status:product.status, price:String(product.price), stock:String(product.stock) }));
    } else {
      setForm({ name:"", cat:"", subcat:"", status:"active", price:"", disc:"", stock:"",
        sku:"", description:"", regions:"Nationwide", deltime:"1–2 days", retwin:"30 days", refund:"3–5 business days" });
    }
    setTab("basic"); setImgCount(0); setHasVideo(false);
  }, [product]);

  const subcats = form.cat ? (SUBCATS[form.cat] ?? []) : [];
  const price = parseFloat(form.price) || 0;
  const disc  = parseFloat(form.disc)  || 0;
  const showDiscount = disc > 0 && disc < price;

  function save() {
    if (!form.name.trim()) { showToast("error","Missing Name","Please enter a product name."); setTab("basic"); return; }
    if (!form.cat)          { showToast("error","Missing Category","Please select a category."); setTab("basic"); return; }
    if (!form.subcat)       { showToast("error","Missing Subcategory","Please select a subcategory."); setTab("basic"); return; }
    if (!price)             { showToast("error","Missing Price","Please enter a valid price."); setTab("pricing"); return; }

    if (product) {
      setProducts(p => p.map(x => x.id === product.id ? {
        ...x, name:form.name, cat:form.cat, subcat:form.subcat,
        price, stock:parseInt(form.stock)||0, status:form.status,
      } : x));
      showToast("success","Product Updated","Changes saved successfully.");
    } else {
      setProducts(p => [...p, {
        id: Date.now(), name:form.name, cat:form.cat, subcat:form.subcat,
        price, stock:parseInt(form.stock)||0, status:"active", img:"📦",
      }]);
      showToast("success","Product Added","New product listed successfully.");
    }
    onClose();
  }

  const inputCls = "w-full px-3 py-2.5 border-[1.5px] border-neutral-200 rounded-[10px] text-[0.85rem] outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all bg-white";

  return (
    <div className="fixed inset-0 z-[400] flex items-start justify-center overflow-y-auto p-4 pt-6"
      style={{background:"rgba(15,23,42,.5)", backdropFilter:"blur(4px)"}}>
      <div className="bg-white rounded-xl3 shadow-modal w-full max-w-2xl my-auto animate-fade-up">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-[22px] py-[18px] border-b border-neutral-100 rounded-t-xl3">
          <h3 className="font-heading font-bold text-neutral-900">{product ? "Edit Product" : "Add New Product"}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors"><X className="w-4 h-4 text-neutral-600" /></button>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-neutral-100 px-[22px] overflow-x-auto" style={{scrollbarWidth:"none"}}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={clsx("py-2.5 px-4 text-[0.8rem] font-semibold border-b-2 whitespace-nowrap transition-all -mb-px",
                tab === t.key ? "text-primary-600 border-primary-600" : "text-neutral-400 border-transparent hover:text-neutral-700"
              )}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        <div className="p-[22px]">

          {/* Basic */}
          {tab === "basic" && (
            <div className="grid gap-3.5">
              <div>
                <label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">Product Name <span className="text-red-500">*</span></label>
                <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}
                  placeholder="e.g. Sony WH-1000XM5 Headphones" className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">Category <span className="text-red-500">*</span></label>
                  <select value={form.cat} onChange={e=>setForm(f=>({...f,cat:e.target.value,subcat:""}))} className={inputCls} style={{appearance:"none"}}>
                    <option value="">Select category</option>
                    {Object.keys(SUBCATS).map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">Subcategory <span className="text-red-500">*</span></label>
                  <select value={form.subcat} onChange={e=>setForm(f=>({...f,subcat:e.target.value}))} className={inputCls} style={{appearance:"none"}}>
                    <option value="">{subcats.length ? "Select subcategory" : "Select category first"}</option>
                    {subcats.map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">Status</label>
                <select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value as any}))} className={inputCls} style={{appearance:"none"}}>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          )}

          {/* Pricing */}
          {tab === "pricing" && (
            <div className="grid gap-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">Selling Price (₦) <span className="text-red-500">*</span></label>
                  <input type="number" value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))} placeholder="0.00" min="0" className={inputCls} />
                </div>
                <div>
                  <label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">Discount Price (₦) <span className="text-[0.78rem] font-normal text-neutral-400">optional</span></label>
                  <input type="number" value={form.disc} onChange={e=>setForm(f=>({...f,disc:e.target.value}))} placeholder="0.00" min="0" className={inputCls} />
                </div>
              </div>
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-[0.75rem] text-neutral-400 mb-2">Price Preview</p>
                <div className="flex items-center gap-3">
                  <span className="font-heading text-2xl font-bold text-neutral-900">₦{(showDiscount ? disc : price).toLocaleString()}</span>
                  {showDiscount && <>
                    <span className="text-[0.85rem] line-through text-neutral-400">₦{price.toLocaleString()}</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[0.7rem] font-bold bg-green-100 text-green-800">{Math.round((1-disc/price)*100)}% off</span>
                  </>}
                </div>
              </div>
            </div>
          )}

          {/* Inventory */}
          {tab === "inventory" && (
            <div className="grid gap-3.5">
              <div>
                <label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">Stock Quantity <span className="text-red-500">*</span></label>
                <input type="number" value={form.stock} onChange={e=>setForm(f=>({...f,stock:e.target.value}))} placeholder="0" min="0" className={inputCls} />
              </div>
              <div>
                <label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">SKU / Product Code <span className="text-[0.78rem] font-normal text-neutral-400">optional</span></label>
                <input value={form.sku} onChange={e=>setForm(f=>({...f,sku:e.target.value}))} placeholder="e.g. SONY-XM5-BLK" className={inputCls} />
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-[10px] p-3">
                <p className="text-[0.78rem] font-semibold text-amber-800">⚠ Low Stock Alert</p>
                <p className="text-[0.75rem] text-amber-700 mt-1">You will receive a notification when stock falls below 5 units.</p>
              </div>
            </div>
          )}

          {/* Media */}
          {tab === "media" && (
            <div className="grid gap-4">
              <div>
                <p className="text-[0.78rem] font-semibold text-neutral-700 mb-2">Product Images (max 8)</p>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({length:imgCount}).map((_,i)=>(
                    <div key={i} className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg border-[1.5px] border-neutral-200 flex items-center justify-center text-2xl relative">
                      🖼️
                      <button onClick={()=>setImgCount(c=>c-1)}
                        className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[0.6rem] flex items-center justify-center border-none">×</button>
                    </div>
                  ))}
                  {imgCount < 8 && (
                    <button onClick={()=>{setImgCount(c=>c+1); showToast("success","Image Added","Photo uploaded successfully.");}}
                      className="aspect-square border-2 border-dashed border-neutral-200 rounded-lg flex flex-col items-center justify-center gap-1.5 hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer bg-neutral-50">
                      <ImagePlus className="w-5 h-5 text-neutral-400" />
                      <p className="text-[0.72rem] text-neutral-400">Add Photo</p>
                    </button>
                  )}
                </div>
              </div>
              <div>
                <p className="text-[0.78rem] font-semibold text-neutral-700 mb-2">Product Video <span className="font-normal text-neutral-400">(1 video max)</span></p>
                {hasVideo ? (
                  <div className="border-2 border-green-300 bg-green-50 rounded-[10px] p-4 flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[0.82rem] font-semibold text-green-800">product-demo.mp4 — Uploaded ✓</p>
                      <p className="text-[0.72rem] text-neutral-500 mt-0.5">42.6 MB · <button onClick={()=>setHasVideo(false)} className="underline text-neutral-500">Remove</button></p>
                    </div>
                  </div>
                ) : (
                  <button onClick={()=>{setHasVideo(true); showToast("success","Video Uploaded","Product video added successfully.");}}
                    className="w-full border-2 border-dashed border-neutral-200 rounded-[10px] p-4 flex items-center gap-3 hover:border-primary-500 hover:bg-primary-50 transition-all bg-neutral-50">
                    <Video className="w-6 h-6 text-neutral-400 flex-shrink-0" />
                    <div className="text-left"><p className="text-[0.82rem] font-semibold text-neutral-700">Click to upload video</p>
                      <p className="text-[0.72rem] text-neutral-400 mt-0.5">MP4, MOV · max 100MB · 1 video only</p></div>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          {tab === "desc" && (
            <div className="grid gap-3">
              <div>
                <label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">Product Description</label>
                <textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} rows={8}
                  placeholder="Describe your product in detail — features, benefits, what's in the box…"
                  className={`${inputCls} resize-y min-h-[180px]`} />
              </div>
              <div className="bg-neutral-50 rounded-[10px] p-3">
                <p className="text-[0.72rem] text-neutral-400">💡 Good descriptions include key features, dimensions, compatibility, and what makes your product unique. Aim for 150–400 words.</p>
              </div>
            </div>
          )}

          {/* Specs */}
          {tab === "specs" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[0.78rem] font-semibold text-neutral-700">Key–Value Specifications</p>
                <button onClick={()=>setSpecs(p=>[...p,{k:"",v:""}])}
                  className="flex items-center gap-1.5 px-3 py-1.5 border-[1.5px] border-neutral-200 rounded-full text-[0.75rem] font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors">
                  <Plus className="w-3 h-3" />Add Row
                </button>
              </div>
              <div className="grid gap-2">
                {specs.map((s,i)=>(
                  <div key={i} className="grid gap-2" style={{gridTemplateColumns:"1fr 1fr auto"}}>
                    <input value={s.k} onChange={e=>{const n=[...specs];n[i]={...n[i],k:e.target.value};setSpecs(n);}}
                      placeholder="e.g. Colour" className="px-3 py-2 border-[1.5px] border-neutral-200 rounded-lg text-[0.8rem] outline-none focus:border-primary-500" />
                    <input value={s.v} onChange={e=>{const n=[...specs];n[i]={...n[i],v:e.target.value};setSpecs(n);}}
                      placeholder="e.g. Midnight Black" className="px-3 py-2 border-[1.5px] border-neutral-200 rounded-lg text-[0.8rem] outline-none focus:border-primary-500" />
                    <button onClick={()=>setSpecs(p=>p.filter((_,j)=>j!==i))}
                      className="w-[30px] h-[30px] flex items-center justify-center bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shipping */}
          {tab === "shipping" && (
            <div className="grid gap-3.5">
              {[
                { label:"Delivery Regions", field:"regions", opts:["Nationwide","Lagos only","South-West only","Custom regions"] },
                { label:"Estimated Delivery Time", field:"deltime", opts:["Same day (Local)","1–2 days","2–3 days","3–5 days","5–7 days"] },
              ].map(({label,field,opts})=>(
                <div key={field}>
                  <label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">{label}</label>
                  <select value={(form as any)[field]} onChange={e=>setForm(f=>({...f,[field]:e.target.value}))} className={inputCls} style={{appearance:"none"}}>
                    {opts.map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div>
                <label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">Shipping Notes</label>
                <textarea placeholder="Any special shipping instructions…" rows={3} className={`${inputCls} resize-none`} />
              </div>
            </div>
          )}

          {/* Returns */}
          {tab === "returns" && (
            <div className="grid gap-3.5">
              {[
                { label:"Return Window",          field:"retwin", opts:["7 days","14 days","30 days","No returns"] },
                { label:"Refund Processing Time", field:"refund", opts:["3–5 business days","5–7 business days","7–14 business days"] },
              ].map(({label,field,opts})=>(
                <div key={field}>
                  <label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">{label}</label>
                  <select value={(form as any)[field]} onChange={e=>setForm(f=>({...f,[field]:e.target.value}))} className={inputCls} style={{appearance:"none"}}>
                    {opts.map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div>
                <label className="block text-[0.78rem] font-semibold text-neutral-700 mb-1.5">Return Conditions</label>
                <textarea placeholder="e.g. Item must be unused, in original packaging…" rows={3} className={`${inputCls} resize-none`} />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-neutral-100 px-[22px] py-4 flex justify-end gap-2.5 rounded-b-xl3">
          <button onClick={onClose} className="px-5 py-2.5 border-[1.5px] border-neutral-200 rounded-full text-[0.82rem] font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors">Cancel</button>
          <button onClick={save} className="flex items-center gap-1.5 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-[0.82rem] font-semibold transition-colors">
            <Check className="w-3.5 h-3.5" />Save Product
          </button>
        </div>
      </div>
    </div>
  );
}
