export type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  price: number;
  stock: number;
  reserved: number;
  status: "active" | "draft" | "archived";
  featured: boolean;
  image: string;
  sku: string;
  material: string;
  color: string;
  description: string;
  images: string[];
};

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  count: number;
  image: string;
  children: { id: string; name: string; slug: string; count: number }[];
};

export type AdminOrder = {
  id: string;
  customer: string;
  city: string;
  amount: number;
  payment: "COD" | "Card" | "Bank";
  status: "new" | "processing" | "ready" | "delivered";
  items: number;
  date: string;
};

export const adminProducts: AdminProduct[] = [
  {
    id: "rv-001",
    name: "Velvet Royale Bed",
    slug: "velvet-royale-bed",
    category: "Bedroom",
    subcategory: "Beds",
    price: 89999,
    stock: 12,
    reserved: 2,
    status: "active",
    featured: true,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    sku: "RV-BED-001",
    material: "Velvet / solid wood",
    color: "Emerald",
    description: "Premium velvet upholstered bed with a reinforced solid wood frame.",
    images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"],
  },
  {
    id: "rv-002",
    name: "Cloud Comfort Sofa",
    slug: "cloud-comfort-sofa",
    category: "Living Room",
    subcategory: "Sofas",
    price: 129999,
    stock: 8,
    reserved: 1,
    status: "active",
    featured: true,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    sku: "RV-SOF-002",
    material: "Premium velvet",
    color: "Pearl",
    description: "Three-seater plush sofa in premium velvet fabric.",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"],
  },
  {
    id: "rv-003",
    name: "Elite Ottoman",
    slug: "elite-ottoman",
    category: "Sofas & Seating",
    subcategory: "Ottomans",
    price: 34999,
    stock: 15,
    reserved: 3,
    status: "active",
    featured: false,
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80",
    sku: "RV-OTT-003",
    material: "Velvet / storage frame",
    color: "Charcoal",
    description: "Multi-functional ottoman with a practical storage compartment.",
    images: ["https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80"],
  },
  {
    id: "rv-004",
    name: "Imperial Curtains",
    slug: "imperial-curtains",
    category: "Furnishing Fabric",
    subcategory: "Velvet Curtains",
    price: 12999,
    stock: 30,
    reserved: 5,
    status: "active",
    featured: false,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
    sku: "RV-CUR-004",
    material: "Heavy velvet",
    color: "Champagne",
    description: "Premium heavy velvet curtains with an elegant, finished drape.",
    images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80"],
  },
];

export const adminCategories: AdminCategory[] = [
  {
    id: "cat-home-decor",
    name: "Home Decor",
    slug: "home-decor",
    count: 56,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80",
    children: [
      { id: "decor", name: "Decor", slug: "decor", count: 18 },
      { id: "lamps", name: "Lamps", slug: "lamps", count: 12 },
      { id: "mirrors", name: "Mirrors", slug: "mirrors", count: 9 },
      { id: "planters", name: "Planters", slug: "planters", count: 17 },
    ],
  },
  {
    id: "cat-fabric",
    name: "Furnishing Fabric",
    slug: "furnishing-fabric",
    count: 72,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
    children: [
      { id: "velvet", name: "Velvet", slug: "velvet", count: 18 },
      { id: "jacquard", name: "Jacquard", slug: "jacquard", count: 14 },
      { id: "silk", name: "Silk", slug: "silk", count: 11 },
      { id: "sheer", name: "Sheer Curtain", slug: "sheer-curtain", count: 16 },
    ],
  },
  {
    id: "cat-cushions",
    name: "Cushions",
    slug: "cushions",
    count: 28,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
    children: [
      { id: "solid", name: "Solid / Plain", slug: "solid-plain", count: 15 },
      { id: "digital", name: "Digital", slug: "digital", count: 13 },
    ],
  },
  {
    id: "cat-smart",
    name: "Smart Furniture",
    slug: "smart-furniture",
    count: 41,
    image: "https://images.unsplash.com/photo-1533090481720-856c6e5f6e2d?w=600&q=80",
    children: [
      { id: "tables", name: "Tables", slug: "tables", count: 11 },
      { id: "chairs", name: "Chairs", slug: "chairs", count: 10 },
      { id: "stools", name: "Stools", slug: "stools", count: 7 },
      { id: "steel", name: "Steel Furniture", slug: "steel-furniture", count: 6 },
    ],
  },
  {
    id: "cat-prestige",
    name: "Prestige Furniture",
    slug: "prestige-furniture",
    count: 12,
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80",
    children: [{ id: "appointments", name: "Appointment Booking", slug: "appointment-booking", count: 12 }],
  },
];

export const adminOrders: AdminOrder[] = [
  { id: "RV-2401", customer: "Ahmed Khan", city: "Pakistan", amount: 129999, payment: "COD", status: "new", items: 2, date: "Today" },
  { id: "RV-2400", customer: "Sara Malik", city: "Lahore", amount: 89999, payment: "Card", status: "processing", items: 1, date: "Yesterday" },
  { id: "RV-2399", customer: "Bilal Raza", city: "Islamabad", amount: 219998, payment: "Bank", status: "ready", items: 3, date: "Jun 08" },
  { id: "RV-2398", customer: "Ayesha Noor", city: "Karachi", amount: 34999, payment: "COD", status: "delivered", items: 1, date: "Jun 07" },
];

export function formatAdminPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}
