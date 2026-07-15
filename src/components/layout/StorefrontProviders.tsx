"use client";

import { usePathname } from "next/navigation";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WishlistDrawer } from "@/components/wishlist/WishlistDrawer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { whatsappHref } from "@/lib/storefront";
import styles from "@/styles/ecommerce.module.css";

export function StorefrontProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminSurface = pathname.startsWith("/admin") || pathname.startsWith("/login");

  if (isAdminSurface) return <>{children}</>;

  return (
    <CartProvider>
      <WishlistProvider>
        <CartDrawer />
        <WishlistDrawer />
        {children}
        <a className={styles.helpFloat} href={whatsappHref("Hi Rana Velvet, I need help with the website.")}>
          WhatsApp Help
        </a>
      </WishlistProvider>
    </CartProvider>
  );
}
