export interface VendorProduct {
  id: number;
  name: string;
  cat: string;
  subcat: string;
  price: number;
  stock: number;
  status: "active" | "out" | "draft" | "inactive";
  img: string;
}

export interface VendorOrder {
  id: string;
  customer: string;
  product: string;
  total: number;
  delivery: "Local" | "Interstate";
  date: string;
}

export interface VendorReview {
  id: number;
  product: string;
  customer: string;
  rating: number;
  date: string;
  text: string;
  reply: string | null;
}

export const VENDOR_PRODUCTS: VendorProduct[] = [
  { id:1, name:"Sony WH-1000XM5 Headphones",    cat:"Electronics", subcat:"Headphones",    price:89000, stock:14, status:"active", img:"🎧" },
  { id:2, name:"JBL Flip 6 Bluetooth Speaker",   cat:"Electronics", subcat:"Speakers",      price:45000, stock:7,  status:"active", img:"🔊" },
  { id:3, name:"Logitech MX Master 3S Mouse",    cat:"Electronics", subcat:"PC Accessories",price:67000, stock:3,  status:"active", img:"🖱️" },
  { id:4, name:"iPhone 15 Clear Case",           cat:"Electronics", subcat:"Accessories",   price:6000,  stock:82, status:"active", img:"📱" },
  { id:5, name:"Samsung Galaxy Buds2 Pro",       cat:"Electronics", subcat:"Earbuds",       price:34500, stock:19, status:"active", img:"🎵" },
  { id:6, name:"Anker PowerCore 26800",          cat:"Electronics", subcat:"Accessories",   price:28000, stock:0,  status:"out",    img:"🔋" },
  { id:7, name:"USB-C Hub 7-in-1",              cat:"Electronics", subcat:"PC Accessories",price:18500, stock:2,  status:"active", img:"🔌" },
  { id:8, name:"Belkin Charging Pad",            cat:"Electronics", subcat:"Accessories",   price:14500, stock:0,  status:"draft",  img:"⚡" },
];

export const VENDOR_ORDERS: Record<string, VendorOrder[]> = {
  pending: [
    { id:"AH-20245", customer:"Adaeze Obi",    product:"Sony WH-1000XM5",        total:89000,  delivery:"Local",       date:"Mar 20, 2026" },
    { id:"AH-20244", customer:"Tunde Bakare",  product:"JBL Flip 6",              total:45000,  delivery:"Local",       date:"Mar 20, 2026" },
    { id:"AH-20242", customer:"Chidi Nweke",   product:"Logitech MX Master",      total:67000,  delivery:"Interstate",  date:"Mar 19, 2026" },
    { id:"AH-20240", customer:"Kemi Adeyemi",  product:"Samsung Galaxy Buds × 2", total:69000,  delivery:"Local",       date:"Mar 19, 2026" },
    { id:"AH-20238", customer:"Bode Olatunji", product:"iPhone 15 Case × 5",      total:30000,  delivery:"Local",       date:"Mar 18, 2026" },
    { id:"AH-20237", customer:"Amaka Eze",     product:"USB-C Hub",               total:18500,  delivery:"Interstate",  date:"Mar 18, 2026" },
    { id:"AH-20236", customer:"Sule Musa",     product:"Anker PowerCore",         total:28000,  delivery:"Local",       date:"Mar 17, 2026" },
  ],
  processing: [
    { id:"AH-20241", customer:"Ngozi Eze",   product:"Samsung Galaxy Buds",  total:34500, delivery:"Local",      date:"Mar 18, 2026" },
    { id:"AH-20234", customer:"Emeka Obi",   product:"Sony WH-1000XM5",      total:89000, delivery:"Interstate", date:"Mar 14, 2026" },
  ],
  ready: [
    { id:"AH-20233", customer:"Funmilayo Ade", product:"JBL Flip 6", total:45000, delivery:"Local", date:"Mar 13, 2026" },
  ],
  delivered: [
    { id:"AH-20239", customer:"Tunde Bakare",  product:"JBL Flip 6",        total:45000,  delivery:"Local",      date:"Mar 15, 2026" },
    { id:"AH-20235", customer:"Fatima Usman",  product:"Sony XM5 × 3",      total:267000, delivery:"Interstate", date:"Mar 10, 2026" },
  ],
  cancelled: [
    { id:"AH-20230", customer:"Chidi Nweke", product:"Logitech Mouse", total:38000, delivery:"Local", date:"Mar 5, 2026" },
  ],
};

export const VENDOR_REVIEWS: VendorReview[] = [
  { id:1, product:"Sony WH-1000XM5", customer:"Adaeze Obi",   rating:5, date:"Mar 18, 2026", text:"Absolutely love these headphones! The noise cancellation is incredible. Sound quality is top-notch. Fast delivery too.", reply:null },
  { id:2, product:"JBL Flip 6",      customer:"Tunde Bakare",  rating:4, date:"Mar 12, 2026", text:"Great speaker, sounds amazing. Delivery was a day late but the product is worth it. Packaging was very secure.", reply:"Thank you for your kind words! We apologise for the slight delay. We're glad you love the JBL Flip 6!" },
  { id:3, product:"iPhone 15 Case",  customer:"Fatima Usman",  rating:2, date:"Mar 8, 2026",  text:"Case came with a small scratch on the back. Not what I expected for the price. Packaging could be better.", reply:null },
];

export const SUBCATS: Record<string, string[]> = {
  "Electronics":     ["Smartphones","Headphones","Earbuds","Speakers","Tablets","Accessories","PC Accessories","Cameras"],
  "Fashion":         ["Men's Clothing","Women's Clothing","Shoes","Bags","Watches","Jewellery"],
  "Home & Living":   ["Furniture","Kitchen","Bedding","Decor","Lighting"],
  "Health & Beauty": ["Skincare","Haircare","Vitamins","Fitness"],
  "Sports":          ["Gym Equipment","Outdoor","Team Sports","Swimming"],
  "Books":           ["Fiction","Non-Fiction","Academic","Children"],
  "Agriculture":     ["Seeds","Tools","Fertilisers","Livestock"],
  "Automobiles":     ["Car Parts","Accessories","Tyres","Oils"],
};
