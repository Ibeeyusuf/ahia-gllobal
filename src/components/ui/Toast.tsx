"use client";
import React, { createContext, useContext, useCallback, useState } from "react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warn";
interface Toast { id: number; type: ToastType; title: string; msg?: string; }

const ToastCtx = createContext<(type: ToastType, title: string, msg?: string) => void>(() => {});

export function useToast() { return useContext(ToastCtx); }

const STYLES: Record<ToastType, string> = {
  success: "bg-green-50 border-green-200 text-green-800",
  error:   "bg-red-50 border-red-200 text-red-800",
  info:    "bg-blue-50 border-blue-200 text-blue-800",
  warn:    "bg-amber-50 border-amber-200 text-amber-800",
};
const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />,
  error:   <XCircle    className="w-4 h-4 flex-shrink-0 mt-0.5" />,
  info:    <Info       className="w-4 h-4 flex-shrink-0 mt-0.5" />,
  warn:    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: ToastType, title: string, msg?: string) => {
    const id = Date.now();
    setToasts(p => [...p, { id, type, title, msg }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3800);
  }, []);

  return (
    <ToastCtx.Provider value={showToast}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)] pointer-events-none">
        {toasts.map(t => (
          <div key={t.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-hover w-full animate-toast-in ${STYLES[t.type]}`}>
            {ICONS[t.type]}
            <div className="flex-1">
              <p className="font-semibold text-xs">{t.title}</p>
              {t.msg && <p className="text-xs opacity-80 mt-0.5">{t.msg}</p>}
            </div>
            <button onClick={() => setToasts(p => p.filter(x => x.id !== t.id))}
              className="opacity-50 hover:opacity-100 flex-shrink-0">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
