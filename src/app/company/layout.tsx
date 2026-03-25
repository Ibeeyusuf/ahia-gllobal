"use client";
import { useState } from "react";
import { CompanySidebar } from "@/components/company/CompanySidebar";
import { CompanyHeader } from "@/components/company/CompanyHeader";
import { CompanyProvider } from "@/context/CompanyContext";
import { ToastProvider } from "@/components/ui/Toast";

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <CompanyProvider>
      <ToastProvider>
        <CompanySidebar open={open} onClose={() => setOpen(false)} />
        <div className="lg:ml-60 min-h-screen flex flex-col">
          <CompanyHeader onMenuClick={() => setOpen(true)} />
          <main className="flex-1 p-4 lg:p-6">{children}</main>
        </div>
      </ToastProvider>
    </CompanyProvider>
  );
}
