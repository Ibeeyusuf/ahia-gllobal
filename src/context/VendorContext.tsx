"use client";
import React, { createContext, useContext, useState } from "react";
import {
  VENDOR_PRODUCTS, VENDOR_ORDERS, VENDOR_REVIEWS,
  VendorProduct, VendorOrder, VendorReview,
} from "@/lib/vendorData";

interface VendorCtx {
  products: VendorProduct[];
  setProducts: React.Dispatch<React.SetStateAction<VendorProduct[]>>;
  orders: Record<string, VendorOrder[]>;
  setOrders: React.Dispatch<React.SetStateAction<Record<string, VendorOrder[]>>>;
  reviews: VendorReview[];
  setReviews: React.Dispatch<React.SetStateAction<VendorReview[]>>;
  moveOrder: (id: string, from: string, to: string) => VendorOrder | null;
  deleteProduct: (id: number) => void;
}

const Ctx = createContext<VendorCtx>({} as VendorCtx);
export const useVendor = () => useContext(Ctx);

export function VendorProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<VendorProduct[]>(VENDOR_PRODUCTS);
  const [orders, setOrders]     = useState<Record<string, VendorOrder[]>>(VENDOR_ORDERS);
  const [reviews, setReviews]   = useState<VendorReview[]>(VENDOR_REVIEWS);

  function moveOrder(id: string, from: string, to: string) {
    let moved: VendorOrder | null = null;
    setOrders(prev => {
      const fromList = [...(prev[from] ?? [])];
      const idx = fromList.findIndex(o => o.id === id);
      if (idx === -1) return prev;
      [moved] = fromList.splice(idx, 1);
      return { ...prev, [from]: fromList, [to]: [...(prev[to] ?? []), moved!] };
    });
    return moved;
  }

  function deleteProduct(id: number) {
    setProducts(p => p.filter(x => x.id !== id));
  }

  return (
    <Ctx.Provider value={{ products, setProducts, orders, setOrders, reviews, setReviews, moveOrder, deleteProduct }}>
      {children}
    </Ctx.Provider>
  );
}
