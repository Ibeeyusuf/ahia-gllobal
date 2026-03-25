"use client";
import React, { createContext, useContext, useState } from "react";
import { RIDER_ORDERS } from "@/lib/data";
import type { Order } from "@/lib/types";

interface RiderCtx {
  isOnline: boolean;
  setIsOnline: (v: boolean) => void;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  todayEarnings: number;
  setTodayEarnings: React.Dispatch<React.SetStateAction<number>>;
  completedCount: number;
  setCompletedCount: React.Dispatch<React.SetStateAction<number>>;
  acceptOrder: (id: string) => void;
  rejectOrder: (id: string) => void;
  updateStatus: (id: string, status: string) => void;
}

const Ctx = createContext<RiderCtx>({} as RiderCtx);
export const useRider = () => useContext(Ctx);

export function RiderProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [orders, setOrders] = useState<Order[]>(RIDER_ORDERS);
  const [todayEarnings, setTodayEarnings] = useState(12500);
  const [completedCount, setCompletedCount] = useState(24);

  function acceptOrder(id: string) {
    const hasActive = orders.some(o => ["assigned", "transit", "picked"].includes(o.status));
    if (hasActive) return;
    setOrders(p => p.map(o => o.id === id ? { ...o, status: "assigned" } : o));
  }

  function rejectOrder(id: string) {
    setOrders(p => p.map(o => o.id === id ? { ...o, status: "rejected" } : o));
  }

  function updateStatus(id: string, status: string) {
    if (status === "delivered") {
      const order = orders.find(o => o.id === id);
      if (order?.earn) {
        const amt = parseInt(order.earn.replace(/[^0-9]/g, ""));
        setTodayEarnings(p => p + amt);
        setCompletedCount(p => p + 1);
      }
    }
    setOrders(p => p.map(o => o.id === id ? { ...o, status: status as any } : o));
  }

  return (
    <Ctx.Provider value={{
      isOnline, setIsOnline, orders, setOrders,
      todayEarnings, setTodayEarnings,
      completedCount, setCompletedCount,
      acceptOrder, rejectOrder, updateStatus,
    }}>
      {children}
    </Ctx.Provider>
  );
}
