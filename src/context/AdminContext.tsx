"use client";
import React, { createContext, useContext, useState } from "react";
import { COMPANIES } from "@/lib/data";
import type { Company, CompanyStatus } from "@/lib/types";

interface AdminCtx {
  companies: Company[];
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
  updateCompanyStatus: (name: string, status: CompanyStatus) => void;
  updateDoc: (coName: string, idx: number, st: "verified" | "flagged" | "pending") => void;
}

const Ctx = createContext<AdminCtx>({} as AdminCtx);
export const useAdmin = () => useContext(Ctx);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [companies, setCompanies] = useState<Company[]>(COMPANIES);

  const updateCompanyStatus = (name: string, status: CompanyStatus) =>
    setCompanies(p => p.map(c => c.name === name ? { ...c, status } : c));

  const updateDoc = (coName: string, idx: number, st: "verified" | "flagged" | "pending") =>
    setCompanies(p => p.map(c => {
      if (c.name !== coName) return c;
      const docs = [...c.docs];
      docs[idx] = { ...docs[idx], st };
      return { ...c, docs };
    }));

  return <Ctx.Provider value={{ companies, setCompanies, updateCompanyStatus, updateDoc }}>{children}</Ctx.Provider>;
}
