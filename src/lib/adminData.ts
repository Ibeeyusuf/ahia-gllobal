// ─── Vendors ───────────────────────────────────────────────────────────────
export type VendorStatus = "active" | "pending" | "suspended";

export interface AdminVendor {
  id: number;
  name: string;
  ini: string;
  clr: string;
  category: string;
  owner: string;
  email: string;
  phone: string;
  city: string;
  products: number;
  sales: number;
  joined: string;
  status: VendorStatus;
  reason?: string;
}

export const ADMIN_VENDORS: AdminVendor[] = [
  { id:1,  name:"TechHub Lagos",      ini:"TH", clr:"bg-blue-100 text-blue-700",    category:"Electronics",   owner:"Emeka Okonkwo",  email:"hello@techhubnig.com",   phone:"+234 801 234 5678", city:"Lagos",        products:24, sales:4700000, joined:"Jan 2025", status:"active"    },
  { id:2,  name:"Fashionista NG",     ini:"FN", clr:"bg-pink-100 text-pink-700",    category:"Fashion",       owner:"Adaeze Obi",     email:"adaeze@fashionista.ng",  phone:"+234 803 456 7890", city:"Abuja",        products:61, sales:2300000, joined:"Feb 2025", status:"active"    },
  { id:3,  name:"HomeEase Store",     ini:"HE", clr:"bg-green-100 text-green-700",  category:"Home & Living", owner:"Biodun Afolabi", email:"info@homeease.ng",       phone:"+234 805 678 9012", city:"Ibadan",       products:38, sales:1800000, joined:"Mar 2025", status:"active"    },
  { id:4,  name:"NaijaPhones Hub",    ini:"NP", clr:"bg-violet-100 text-violet-700",category:"Electronics",   owner:"Tunde Bakare",   email:"tunde@naijaphones.com",  phone:"+234 812 345 6789", city:"Lagos",        products:15, sales:890000,  joined:"Mar 2025", status:"active"    },
  { id:5,  name:"GreenLeaf Organics", ini:"GL", clr:"bg-teal-100 text-teal-700",    category:"Health",        owner:"Ngozi Eze",      email:"ngozi@greenleaf.ng",     phone:"+234 807 890 1234", city:"Enugu",        products:22, sales:650000,  joined:"Apr 2025", status:"active"    },
  { id:6,  name:"SportsPlus NG",      ini:"SP", clr:"bg-orange-100 text-orange-700",category:"Sports",        owner:"Kola Badmus",    email:"kola@sportsplus.ng",     phone:"+234 809 012 3456", city:"Lagos",        products:19, sales:420000,  joined:"Apr 2025", status:"pending"   },
  { id:7,  name:"QuickMeds Store",    ini:"QM", clr:"bg-red-100 text-red-700",      category:"Health",        owner:"Fatima Usman",   email:"fat@quickmeds.ng",       phone:"+234 701 234 5678", city:"Kano",         products:0,  sales:0,       joined:"May 2025", status:"pending"   },
  { id:8,  name:"FakeGoods Ltd",      ini:"FG", clr:"bg-neutral-100 text-neutral-600",category:"Mixed",      owner:"Anon Seller",    email:"anon@fake.ng",           phone:"+234 900 000 0000", city:"Unknown",      products:4,  sales:180000,  joined:"Feb 2025", status:"suspended", reason:"Counterfeit products reported by 12 customers" },
];

// ─── Product Approval Queue ──────────────────────────────────────────────────
export type ProductApprovalStatus = "pending" | "approved" | "rejected";

export interface AdminProduct {
  id: number;
  name: string;
  vendor: string;
  vendorIni: string;
  category: string;
  price: number;
  stock: number;
  submittedAt: string;
  status: ProductApprovalStatus;
  img: string;
  description: string;
  reason?: string;
}

export const ADMIN_PRODUCTS: AdminProduct[] = [
  { id:1,  name:"Sony WH-1000XM5 Headphones",  vendor:"TechHub Lagos",     vendorIni:"TH", category:"Electronics",   price:89000, stock:14, submittedAt:"Mar 22, 2026", status:"pending",  img:"🎧", description:"Premium noise-cancelling wireless headphones with 30-hour battery and LDAC support." },
  { id:2,  name:"Ankara Maxi Dress (Red)",      vendor:"Fashionista NG",    vendorIni:"FN", category:"Fashion",       price:18000, stock:30, submittedAt:"Mar 22, 2026", status:"pending",  img:"👗", description:"Handcrafted Ankara maxi dress, available in sizes S-XXL. Machine washable." },
  { id:3,  name:"Bamboo Kitchen Set 12pcs",     vendor:"HomeEase Store",    vendorIni:"HE", category:"Home & Living", price:25000, stock:20, submittedAt:"Mar 21, 2026", status:"pending",  img:"🍳", description:"Eco-friendly bamboo kitchen utensils set. BPA-free and food-safe." },
  { id:4,  name:"iPhone 16 Pro Max (Sealed)",   vendor:"NaijaPhones Hub",   vendorIni:"NP", category:"Electronics",   price:980000,stock:3,  submittedAt:"Mar 21, 2026", status:"pending",  img:"📱", description:"Brand new sealed iPhone 16 Pro Max 256GB. Comes with Apple warranty." },
  { id:5,  name:"Vitamin C Serum 30ml",         vendor:"GreenLeaf Organics",vendorIni:"GL", category:"Health",        price:8500,  stock:60, submittedAt:"Mar 20, 2026", status:"approved", img:"🧴", description:"20% Vitamin C + Hyaluronic Acid brightening serum. Dermatologist tested." },
  { id:6,  name:"Nike Air Max 270 (Replica)",   vendor:"FakeGoods Ltd",     vendorIni:"FG", category:"Sports",        price:35000, stock:50, submittedAt:"Mar 19, 2026", status:"rejected", img:"👟", description:"Nike Air Max 270.", reason:"Counterfeit product — trademark violation. Vendor account suspended." },
  { id:7,  name:"Protein Powder 2kg (Vanilla)", vendor:"SportsPlus NG",     vendorIni:"SP", category:"Sports",        price:42000, stock:25, submittedAt:"Mar 20, 2026", status:"pending",  img:"💪", description:"Whey protein isolate, 25g protein per serving. No artificial sweeteners." },
  { id:8,  name:"JBL Flip 6 Speaker",           vendor:"TechHub Lagos",     vendorIni:"TH", category:"Electronics",   price:45000, stock:7,  submittedAt:"Mar 19, 2026", status:"approved", img:"🔊", description:"Portable waterproof Bluetooth speaker with 12-hour playtime." },
];

// ─── All Platform Users (Vendors + Riders combined) ────────────────────────
export type UserRole = "vendor" | "rider";
export type UserStatus = "active" | "suspended" | "pending";

export interface PlatformUser {
  id: number;
  name: string;
  ini: string;
  email: string;
  phone: string;
  role: UserRole;
  subRole: string;
  city: string;
  joined: string;
  status: UserStatus;
  violations: number;
  reason?: string;
}

export const PLATFORM_USERS: PlatformUser[] = [
  { id:1,  name:"Emeka Okonkwo",  ini:"EO", email:"hello@techhubnig.com",   phone:"+234 801 234 5678", role:"vendor", subRole:"Electronics",  city:"Lagos",        joined:"Jan 2025", status:"active",    violations:0 },
  { id:2,  name:"Adaeze Obi",     ini:"AO", email:"adaeze@fashionista.ng",  phone:"+234 803 456 7890", role:"vendor", subRole:"Fashion",       city:"Abuja",        joined:"Feb 2025", status:"active",    violations:0 },
  { id:3,  name:"Emeka Okafor",   ini:"EK", email:"emeka@lagosexpress.ng",  phone:"+234 812 345 6789", role:"rider",  subRole:"Motorcycle",    city:"Lagos",        joined:"Jan 2024", status:"active",    violations:0 },
  { id:4,  name:"Aisha Ibrahim",  ini:"AI", email:"aisha@swiftmove.ng",     phone:"+234 802 345 6789", role:"rider",  subRole:"Bicycle",       city:"Abuja",        joined:"Feb 2024", status:"active",    violations:0 },
  { id:5,  name:"Biodun Afolabi", ini:"BA", email:"info@homeease.ng",       phone:"+234 805 678 9012", role:"vendor", subRole:"Home & Living", city:"Ibadan",       joined:"Mar 2025", status:"active",    violations:0 },
  { id:6,  name:"Kola Badmus",    ini:"KB", email:"kola@sportsplus.ng",     phone:"+234 809 012 3456", role:"vendor", subRole:"Sports",        city:"Lagos",        joined:"Apr 2025", status:"pending",   violations:0 },
  { id:7,  name:"Bola Oluwaseun", ini:"BO", email:"bola@quickdash.ng",      phone:"+234 814 567 8901", role:"rider",  subRole:"Motorcycle",    city:"Port Harcourt",joined:"Mar 2024", status:"suspended", violations:3, reason:"Three customer complaints about rude behaviour and package tampering" },
  { id:8,  name:"Anon Seller",    ini:"AS", email:"anon@fake.ng",           phone:"+234 900 000 0000", role:"vendor", subRole:"Mixed",         city:"Unknown",      joined:"Feb 2025", status:"suspended", violations:12,reason:"Selling counterfeit products — Nike, Samsung, Apple trademark violations" },
  { id:9,  name:"Chidi Obiora",   ini:"CO", email:"chidi@lagosexpress.ng",  phone:"+234 803 111 2222", role:"rider",  subRole:"Motorcycle",    city:"Lagos",        joined:"Apr 2024", status:"active",    violations:0 },
  { id:10, name:"Ngozi Eze",      ini:"NE", email:"ngozi@greenleaf.ng",     phone:"+234 807 890 1234", role:"vendor", subRole:"Health",        city:"Enugu",        joined:"Apr 2025", status:"active",    violations:0 },
];

// ─── Withdrawal Requests ────────────────────────────────────────────────────
export type WithdrawalStatus = "pending" | "approved" | "rejected" | "processing";

export interface WithdrawalRequest {
  id: string;
  vendor: string;
  vendorIni: string;
  vendorClr: string;
  amount: number;
  bank: string;
  account: string;
  requestedAt: string;
  status: WithdrawalStatus;
  availableBalance: number;
  note?: string;
}

export const WITHDRAWAL_REQUESTS: WithdrawalRequest[] = [
  { id:"WD-0012", vendor:"TechHub Lagos",      vendorIni:"TH", vendorClr:"bg-blue-100 text-blue-700",    amount:940000,  bank:"GTBank",       account:"0123456789", requestedAt:"Mar 22, 2026 09:14", status:"pending",    availableBalance:940000 },
  { id:"WD-0011", vendor:"Fashionista NG",     vendorIni:"FN", vendorClr:"bg-pink-100 text-pink-700",    amount:480000,  bank:"Access Bank",  account:"0987654321", requestedAt:"Mar 21, 2026 15:30", status:"pending",    availableBalance:480000 },
  { id:"WD-0010", vendor:"HomeEase Store",     vendorIni:"HE", vendorClr:"bg-green-100 text-green-700",  amount:210000,  bank:"Zenith Bank",  account:"1234567890", requestedAt:"Mar 21, 2026 11:05", status:"processing", availableBalance:210000 },
  { id:"WD-0009", vendor:"NaijaPhones Hub",    vendorIni:"NP", vendorClr:"bg-violet-100 text-violet-700",amount:156000,  bank:"First Bank",   account:"0192837465", requestedAt:"Mar 20, 2026 08:45", status:"approved",   availableBalance:156000 },
  { id:"WD-0008", vendor:"GreenLeaf Organics", vendorIni:"GL", vendorClr:"bg-teal-100 text-teal-700",    amount:88500,   bank:"UBA",          account:"2345678901", requestedAt:"Mar 19, 2026 16:20", status:"approved",   availableBalance:88500  },
  { id:"WD-0007", vendor:"FakeGoods Ltd",      vendorIni:"FG", vendorClr:"bg-neutral-100 text-neutral-600",amount:75000, bank:"Opay",         account:"0011223344", requestedAt:"Mar 18, 2026 10:00", status:"rejected",   availableBalance:0, note:"Account suspended — funds frozen pending investigation" },
];

// ─── Platform Finances ───────────────────────────────────────────────────────
export interface FinanceTx {
  id: string;
  date: string;
  description: string;
  type: "vendor_sale" | "commission" | "payout" | "refund" | "platform_fee";
  vendor: string;
  amount: number;
  direction: "in" | "out";
  status: "settled" | "pending" | "failed";
}

export const FINANCE_TRANSACTIONS: FinanceTx[] = [
  { id:"TX-3041", date:"Mar 22, 2026", description:"Order #AH-20245 — Sony XM5",       type:"vendor_sale",  vendor:"TechHub Lagos",      amount:89000,   direction:"in",  status:"settled" },
  { id:"TX-3040", date:"Mar 22, 2026", description:"Commission (8%) — Order #AH-20245",type:"commission",   vendor:"TechHub Lagos",      amount:7120,    direction:"in",  status:"settled" },
  { id:"TX-3039", date:"Mar 21, 2026", description:"Vendor Payout — TechHub Lagos",     type:"payout",       vendor:"TechHub Lagos",      amount:380000,  direction:"out", status:"settled" },
  { id:"TX-3038", date:"Mar 21, 2026", description:"Order #AH-20244 — JBL Flip 6",      type:"vendor_sale",  vendor:"TechHub Lagos",      amount:45000,   direction:"in",  status:"settled" },
  { id:"TX-3037", date:"Mar 20, 2026", description:"Order #AH-20890 — Ankara Dress",    type:"vendor_sale",  vendor:"Fashionista NG",     amount:18000,   direction:"in",  status:"settled" },
  { id:"TX-3036", date:"Mar 20, 2026", description:"Commission (8%) — Order #AH-20890", type:"commission",   vendor:"Fashionista NG",     amount:1440,    direction:"in",  status:"settled" },
  { id:"TX-3035", date:"Mar 19, 2026", description:"Refund — Order #AH-20780",          type:"refund",       vendor:"FakeGoods Ltd",      amount:35000,   direction:"out", status:"settled" },
  { id:"TX-3034", date:"Mar 19, 2026", description:"Platform Fee — March 2026",         type:"platform_fee", vendor:"System",             amount:15000,   direction:"in",  status:"settled" },
  { id:"TX-3033", date:"Mar 18, 2026", description:"Order #AH-20241 — Samsung Buds",    type:"vendor_sale",  vendor:"TechHub Lagos",      amount:34500,   direction:"in",  status:"pending" },
  { id:"TX-3032", date:"Mar 18, 2026", description:"Vendor Payout — Fashionista NG",    type:"payout",       vendor:"Fashionista NG",     amount:220000,  direction:"out", status:"pending" },
  { id:"TX-3031", date:"Mar 17, 2026", description:"Order #AH-20680 — Bamboo Set",      type:"vendor_sale",  vendor:"HomeEase Store",     amount:25000,   direction:"in",  status:"settled" },
  { id:"TX-3030", date:"Mar 17, 2026", description:"Withdrawal WD-0009 — NaijaPhones",  type:"payout",       vendor:"NaijaPhones Hub",    amount:156000,  direction:"out", status:"settled" },
];
