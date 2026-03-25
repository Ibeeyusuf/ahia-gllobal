"use client";
import { useState } from "react";
import { RiderSidebar } from "@/components/rider/RiderSidebar";
import { RiderHeader } from "@/components/rider/RiderHeader";
import { RiderMobileNav } from "@/components/rider/RiderMobileNav";
import { RiderProvider } from "@/context/RiderContext";
import { ToastProvider } from "@/components/ui/Toast";

export default function RiderLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <RiderProvider>
      <ToastProvider>
        <RiderSidebar open={open} onClose={() => setOpen(false)} />
        <div className="lg:ml-60 min-h-screen flex flex-col pb-16 lg:pb-0">
          <RiderHeader onMenuClick={() => setOpen(true)} />
          <main className="flex-1 p-4 lg:p-6">{children}</main>
        </div>
        <RiderMobileNav />
      </ToastProvider>
    </RiderProvider>
  );
}
