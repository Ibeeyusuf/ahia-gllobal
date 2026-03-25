"use client";
import React, { createContext, useContext, useState } from "react";
import { COMPANY_ORDERS, COMPANY_RIDERS } from "@/lib/data";
import type { Order, Rider } from "@/lib/types";

type CompanyType = "local" | "interstate";

interface CompanyCtx {
  companyType: CompanyType;
  setCompanyType: (t: CompanyType) => void;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  riders: Rider[];
  setRiders: React.Dispatch<React.SetStateAction<Rider[]>>;
  updateOrderStatus: (id: string, status: string) => void;
}

const Ctx = createContext<CompanyCtx>({} as CompanyCtx);
export const useCompany = () => useContext(Ctx);

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const [companyType, setCompanyType] = useState<CompanyType>("local");
  const [orders, setOrders] = useState<Order[]>(COMPANY_ORDERS);
  const [riders, setRiders] = useState<Rider[]>(COMPANY_RIDERS);

  const updateOrderStatus = (id: string, status: string) =>
    setOrders(p => p.map(o => o.id === id ? { ...o, status: status as any } : o));

  return (
    <Ctx.Provider value={{ companyType, setCompanyType, orders, setOrders, riders, setRiders, updateOrderStatus }}>
      {children}
    </Ctx.Provider>
  );
}
