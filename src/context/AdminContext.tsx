"use client";
import React, { createContext, useContext, useState } from "react";
import { COMPANIES } from "@/lib/data";
import {
  ADMIN_VENDORS, ADMIN_PRODUCTS, PLATFORM_USERS, WITHDRAWAL_REQUESTS, FINANCE_TRANSACTIONS,
  AdminVendor, AdminProduct, PlatformUser, WithdrawalRequest, FinanceTx,
  VendorStatus, ProductApprovalStatus, UserStatus, WithdrawalStatus,
} from "@/lib/adminData";
import type { Company, CompanyStatus } from "@/lib/types";

interface AdminCtx {
  // Companies
  companies: Company[];
  updateCompanyStatus: (name: string, status: CompanyStatus) => void;
  updateDoc: (coName: string, idx: number, st: "verified" | "flagged" | "pending") => void;

  // Vendors
  vendors: AdminVendor[];
  updateVendorStatus: (id: number, status: VendorStatus, reason?: string) => void;

  // Products queue
  products: AdminProduct[];
  updateProductStatus: (id: number, status: ProductApprovalStatus, reason?: string) => void;

  // Platform users
  users: PlatformUser[];
  updateUserStatus: (id: number, status: UserStatus, reason?: string) => void;

  // Withdrawals
  withdrawals: WithdrawalRequest[];
  updateWithdrawal: (id: string, status: WithdrawalStatus, note?: string) => void;

  // Finances
  transactions: FinanceTx[];
}

const Ctx = createContext<AdminCtx>({} as AdminCtx);
export const useAdmin = () => useContext(Ctx);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [companies, setCompanies] = useState<Company[]>(COMPANIES);
  const [vendors, setVendors]     = useState<AdminVendor[]>(ADMIN_VENDORS);
  const [products, setProducts]   = useState<AdminProduct[]>(ADMIN_PRODUCTS);
  const [users, setUsers]         = useState<PlatformUser[]>(PLATFORM_USERS);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(WITHDRAWAL_REQUESTS);
  const [transactions]            = useState<FinanceTx[]>(FINANCE_TRANSACTIONS);

  const updateCompanyStatus = (name: string, status: CompanyStatus) =>
    setCompanies(p => p.map(c => c.name === name ? { ...c, status } : c));

  const updateDoc = (coName: string, idx: number, st: "verified" | "flagged" | "pending") =>
    setCompanies(p => p.map(c => {
      if (c.name !== coName) return c;
      const docs = [...c.docs];
      docs[idx] = { ...docs[idx], st };
      return { ...c, docs };
    }));

  const updateVendorStatus = (id: number, status: VendorStatus, reason?: string) =>
    setVendors(p => p.map(v => v.id === id ? { ...v, status, reason } : v));

  const updateProductStatus = (id: number, status: ProductApprovalStatus, reason?: string) =>
    setProducts(p => p.map(x => x.id === id ? { ...x, status, reason } : x));

  const updateUserStatus = (id: number, status: UserStatus, reason?: string) =>
    setUsers(p => p.map(u => u.id === id ? { ...u, status, reason } : u));

  const updateWithdrawal = (id: string, status: WithdrawalStatus, note?: string) =>
    setWithdrawals(p => p.map(w => w.id === id ? { ...w, status, note: note ?? w.note } : w));

  return (
    <Ctx.Provider value={{
      companies, updateCompanyStatus, updateDoc,
      vendors, updateVendorStatus,
      products, updateProductStatus,
      users, updateUserStatus,
      withdrawals, updateWithdrawal,
      transactions,
    }}>
      {children}
    </Ctx.Provider>
  );
}
