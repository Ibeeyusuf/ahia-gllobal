"use client";
import { useRider } from "@/context/RiderContext";
import { useToast } from "@/components/ui/Toast";
import { Badge } from "@/components/ui/Badge";
import { statusLabel } from "@/lib/statusLabel";
import {
  Package, PackageSearch, Check, X, MapPin, Clock, Banknote,
  ArrowRight, CheckCircle,
} from "lucide-react";
import { clsx } from "clsx";

export default function RiderDashboard() {
  const { orders, isOnline, acceptOrder, rejectOrder, updateStatus, todayEarnings, completedCount } = useRider();
  const showToast = useToast();

  const activeOrder = orders.find(o => ["transit", "assigned", "picked"].includes(o.status));
  const pendingOrders = orders.filter(o => o.status === "pending");
  const rejectedCount = orders.filter(o => o.status === "rejected").length;

  function handleAccept(id: string) {
    if (activeOrder) { showToast("warn", "Already on an order", "Complete your current delivery first."); return; }
    acceptOrder(id);
    showToast("success", "Order Accepted", `${id} is now your active delivery.`);
  }

  function handleReject(id: string) {
    rejectOrder(id);
    showToast("info", "Order Rejected", `${id} has been returned to the queue.`);
  }

  function handleStatusUpdate(id: string, status: string) {
    const labels: Record<string, string> = {
      picked: "Picked Up — heading to dropoff",
      transit: "Marked In Transit",
      delivered: "Delivery Confirmed! 🎉",
    };
    updateStatus(id, status);
    showToast(status === "delivered" ? "success" : "info", "Status Updated", labels[status] ?? status);
  }

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-neutral-900">Good morning, Emeka 👋</h2>
          <p className="text-sm text-neutral-400 mt-0.5">
            {isOnline ? "You're online and ready for orders" : "You're offline — no new orders will be assigned"}
          </p>
        </div>
        <Badge variant={isOnline ? "online" : "offline"}>● {isOnline ? "Online" : "Offline"}</Badge>
      </div>

      {/* Earnings card */}
      <div className="relative bg-neutral-900 rounded-xl3 p-5 text-white overflow-hidden">
        <div className="absolute -right-4 -top-4 w-32 h-32 rounded-full bg-primary-600/10" />
        <div className="absolute right-8 bottom-0 w-20 h-20 rounded-full bg-primary-600/5 translate-y-1/2" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-neutral-400">Today's Earnings</p>
            <div className="w-9 h-9 bg-primary-600/20 rounded-xl flex items-center justify-center">
              <Banknote className="w-4 h-4 text-primary-400" />
            </div>
          </div>
          <p className="font-heading text-4xl font-bold mb-1">₦{todayEarnings.toLocaleString()}</p>
          <p className="text-xs text-neutral-500 mb-5">From <strong className="text-neutral-300">{completedCount}</strong> completed deliveries today</p>
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
            <div>
              <p className="font-heading text-lg font-bold text-primary-400">{completedCount}</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Completed</p>
            </div>
            <div className="border-x border-white/10 pl-3">
              <p className="font-heading text-lg font-bold text-amber-400">{pendingOrders.length}</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Pending</p>
            </div>
            <div className="pl-3">
              <p className="font-heading text-lg font-bold text-red-400">{rejectedCount}</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Rejected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Order */}
      <div>
        <h3 className="font-heading font-bold text-neutral-900 text-sm mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
          Active Order
        </h3>

        {activeOrder ? (
          <div className="border-2 border-primary-500 bg-gradient-to-br from-primary-50/50 to-white rounded-xl2 p-5 shadow-card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-heading font-bold text-neutral-900">{activeOrder.id}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{activeOrder.customer} · {activeOrder.phone}</p>
              </div>
              <Badge variant={activeOrder.status as any}>{statusLabel(activeOrder.status)}</Badge>
            </div>

            {/* Route visual */}
            <div className="bg-neutral-50 rounded-xl border border-neutral-100 p-4 mb-4">
              <div className="flex items-stretch gap-3">
                <div className="flex flex-col items-center gap-1 pt-1 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
                  <div className="flex-1 w-0.5 bg-neutral-300 rounded-full min-h-[28px]" />
                  <div className="w-3 h-3 rounded-full bg-primary-600 flex-shrink-0" />
                </div>
                <div className="flex flex-col justify-between flex-1 gap-2">
                  <div className="bg-white rounded-xl px-3 py-2.5 border border-neutral-200">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide mb-0.5">Pickup</p>
                    <p className="text-sm font-semibold text-neutral-800">{activeOrder.pickup}</p>
                  </div>
                  <div className="bg-white rounded-xl px-3 py-2.5 border border-primary-200 bg-primary-50/50">
                    <p className="text-[10px] font-bold text-primary-400 uppercase tracking-wide mb-0.5">Drop-off</p>
                    <p className="text-sm font-semibold text-neutral-800">{activeOrder.dropoff}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { icon: <MapPin className="w-3.5 h-3.5 text-neutral-500" />, label: "Distance", val: activeOrder.distance },
                { icon: <Clock className="w-3.5 h-3.5 text-neutral-500" />,  label: "Est. Time", val: activeOrder.time    },
                { icon: <Banknote className="w-3.5 h-3.5 text-primary-600" />, label: "Earning", val: activeOrder.earn, primary: true },
              ].map(({ icon, label, val, primary }) => (
                <div key={label} className="bg-neutral-50 rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center mb-1">{icon}</div>
                  <p className="text-[10px] text-neutral-500">{label}</p>
                  <p className={clsx("text-sm font-bold mt-0.5", primary ? "text-primary-600" : "text-neutral-800")}>{val}</p>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              {activeOrder.status === "assigned" && (
                <button onClick={() => handleStatusUpdate(activeOrder.id, "picked")}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full text-sm font-bold transition-all hover:scale-[1.02]">
                  <Package className="w-4 h-4" />Picked Up
                </button>
              )}
              {activeOrder.status === "picked" && (
                <button onClick={() => handleStatusUpdate(activeOrder.id, "transit")}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-bold transition-all hover:scale-[1.02]">
                  <ArrowRight className="w-4 h-4" />In Transit
                </button>
              )}
              {activeOrder.status === "transit" && (
                <button onClick={() => handleStatusUpdate(activeOrder.id, "delivered")}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-bold transition-all hover:scale-[1.02]">
                  <CheckCircle className="w-4 h-4" />Mark Delivered
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white border-2 border-neutral-100 rounded-xl2 p-8 text-center shadow-card">
            <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <PackageSearch className="w-7 h-7 text-neutral-400" />
            </div>
            <h3 className="font-heading font-semibold text-neutral-700 mb-1">No Active Order</h3>
            <p className="text-sm text-neutral-400">You'll be notified when a new order is assigned to you.</p>
          </div>
        )}
      </div>

      {/* Incoming Orders */}
      {pendingOrders.length > 0 && (
        <div>
          <h3 className="font-heading font-bold text-neutral-900 text-sm mb-3">Incoming Orders</h3>
          <div className="space-y-3">
            {pendingOrders.map(o => (
              <div key={o.id} className="bg-white border-2 border-neutral-100 rounded-xl2 p-4 shadow-card hover:border-primary-200 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-heading font-bold text-sm text-neutral-900">{o.id}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{o.customer}</p>
                  </div>
                  <Badge variant="pending">New Order</Badge>
                </div>
                <div className="flex items-center gap-2 mb-3 text-xs text-neutral-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />{o.pickup}
                  <ArrowRight className="w-3 h-3 text-neutral-400 flex-shrink-0" />
                  <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0" />{o.dropoff}
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center gap-1 text-xs text-neutral-500"><MapPin className="w-3 h-3" />{o.distance}</span>
                  <span className="flex items-center gap-1 text-xs text-neutral-500"><Clock className="w-3 h-3" />{o.time}</span>
                  <span className="flex items-center gap-1 text-xs font-bold text-primary-600"><Banknote className="w-3 h-3" />{o.earn}</span>
                </div>
                <div className="flex gap-2.5">
                  <button onClick={() => handleAccept(o.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-bold transition-all hover:scale-[1.01]">
                    <Check className="w-4 h-4" />Accept
                  </button>
                  <button onClick={() => handleReject(o.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-full text-sm font-bold transition-colors">
                    <X className="w-4 h-4" />Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
