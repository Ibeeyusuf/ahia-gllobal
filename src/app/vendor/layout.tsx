"use client";
import { useState } from "react";
import { VendorSidebar } from "@/components/vendor/VendorSidebar";
import { VendorHeader } from "@/components/vendor/VendorHeader";
import { VendorProvider } from "@/context/VendorContext";
import { ToastProvider } from "@/components/ui/Toast";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <VendorProvider>
      <ToastProvider>
        <div className="flex h-screen overflow-hidden bg-neutral-50">
          <VendorSidebar open={open} onClose={() => setOpen(false)} />
          <div className="lg:ml-56 flex-1 flex flex-col min-w-0 overflow-hidden">
            <VendorHeader onMenuClick={() => setOpen(true)} />
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </div>
      </ToastProvider>
    </VendorProvider>
  );
}
