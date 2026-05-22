import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rana Velvet | Luxury Furniture & Fabrics Since 1960",
    template: "%s | Rana Velvet",
  },
  description:
    "Premium furniture and signature velvets crafted with heritage since 1960. Explore our curated collections of luxury furniture, curtains, and home furnishings.",
  keywords: [
    "luxury furniture",
    "velvet furniture",
    "home decor",
    "curtains",
    "furnishing fabrics",
    "Pakistan furniture",
    "Rana Velvet",
  ],
  authors: [{ name: "Rana Velvet" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ranavelvet.com",
    siteName: "Rana Velvet",
    title: "Rana Velvet | Luxury Furniture & Fabrics Since 1960",
    description:
      "Premium furniture and signature velvets crafted with heritage since 1960.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rana Velvet | Luxury Furniture & Fabrics Since 1960",
    description:
      "Premium furniture and signature velvets crafted with heritage since 1960.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-full flex flex-col antialiased bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}