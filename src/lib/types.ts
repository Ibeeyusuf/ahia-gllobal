// ─── Company ───────────────────────────────────────────────────────────
export type CompanyStatus = "active" | "pending" | "suspended";
export type CompanyType   = "Local" | "Interstate";

export interface CompanyDoc {
  label: string;
  icon: string;
  st: "verified" | "flagged" | "pending";
}

export interface Company {
  name: string;
  ini: string;
  clr: string;
  type: CompanyType;
  city: string;
  riders: number;
  orders: number;
  status: CompanyStatus;
  applied: string;
  fleet: string;
  plan: string;
  desc: string;
  contact: { name: string; email: string; phone: string };
  legal: { reg: string; cac: string; addr: string };
  docs: CompanyDoc[];
}

// ─── Rider ─────────────────────────────────────────────────────────────
export type RiderStatus = "online" | "offline";

export interface Rider {
  id: number;
  name: string;
  vehicle: string;
  zone: string;
  orders: number;
  rating: number;
  status: RiderStatus;
  busy: boolean;
}

// ─── Order ─────────────────────────────────────────────────────────────
export type OrderStatus =
  | "transit" | "assigned" | "processing" | "delivered"
  | "picked"  | "pending"  | "rejected"   | "confirmed";

export interface Order {
  id: string;
  customer: string;
  phone?: string;
  route?: string;
  pickup?: string;
  dropoff?: string;
  distance?: string;
  time?: string;
  earn?: string;
  type?: CompanyType;
  status: OrderStatus;
  rider?: string | null;
}
