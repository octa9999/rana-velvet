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
  "Use the Google Maps location below for directions. Contact details are managed from the admin settings.";

export const showroomMapUrl =
  "https://www.google.com/maps/place/31%C2%B025'16.2%22N+73%C2%B006'49.0%22E/@31.4211788,73.1110344,17z/data=!3m1!4b1!4m4!3m3!8m2!3d31.4211788!4d73.1136093?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyNi4wIKXMDSoASAFQAw%3D%3D";

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
