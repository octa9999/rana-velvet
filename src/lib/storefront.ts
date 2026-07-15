export const readyMadeCurtains = [
  {
    id: "curtain-one-piece",
    name: "Premium Velvet Eyelet Curtain - One Piece",
    slug: "premium-velvet-eyelet-curtain-one-piece",
    price: 3100,
    category: "Curtains",
    description: "50 x 90 inches; 1 curtain piece; premium velvet; 350 GSM; eyelet header.",
    image: "/demohome-zenspace/curtains.jpg",
    colors: ["Ivory", "Mocha", "Forest Green", "Burgundy", "Midnight Navy"],
    included: "1 curtain piece",
  },
  {
    id: "curtain-two-piece",
    name: "Premium Velvet Eyelet Curtains - Two-Piece Set",
    slug: "premium-velvet-eyelet-curtains-two-piece-set",
    price: 5900,
    category: "Curtains",
    description: "50 x 90 inches per piece; 2 curtain pieces; premium velvet; 350 GSM; eyelet header.",
    image: "/demohome-zenspace/curtains.jpg",
    colors: ["Ivory", "Mocha", "Forest Green", "Burgundy", "Midnight Navy"],
    included: "2 curtain pieces",
  },
];

export const officialContactNote =
  "Store phone, WhatsApp, address, and delivery promises must be verified by Rana Velvet before launch.";

export function referenceNumber(prefix: string) {
  const date = new Date();
  const stamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  return `${prefix}-${stamp}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function whatsappHref(message: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!number) return `/contact?message=${encodeURIComponent(message)}`;
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
