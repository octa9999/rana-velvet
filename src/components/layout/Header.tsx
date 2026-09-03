"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import styles from "@/styles/ecommerce.module.css";

type NavItem = {
  label: string;
  href: string;
  note: string;
  isDirect?: boolean;
  subcategories: Array<{ name: string; href: string }>;
};

const fallbackNavItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    note: "Landing page",
    isDirect: true,
    subcategories: [],
  },
  {
    label: "Shop",
    href: "/products",
    note: "Products and categories",
    subcategories: [
      { name: "Ready-Made Curtains", href: "/products?category=Curtains" },
      { name: "Bedroom", href: "/products?category=Bedroom" },
      { name: "Living Room", href: "/products?category=Living%20Room" },
      { name: "Sofas & Seating", href: "/products?category=Seating" },
    ],
  },
  {
    label: "Customize Curtain",
    href: "/customize-curtain",
    note: "Measurements or visit",
    subcategories: [
      { name: "I Have Measurements", href: "/customize-curtain?path=measurements" },
      { name: "Book Measurement Visit", href: "/customize-curtain?path=visit" },
      { name: "Fabric & Lining Options", href: "/customize-curtain?path=measurements" },
    ],
  },
  {
    label: "Custom Furniture",
    href: "/custom-furniture",
    note: "Made to order",
    subcategories: [
      { name: "Sofas", href: "/custom-furniture?type=Sofa" },
      { name: "Beds", href: "/custom-furniture?type=Bed" },
      { name: "Tables", href: "/custom-furniture?type=Table" },
      { name: "Book A Consultation", href: "/consultation" },
    ],
  },
  {
    label: "About Us",
    href: "/about",
    note: "Rana Velvet story",
    subcategories: [
      { name: "Since 1960", href: "/about" },
      { name: "Explore Collection", href: "/products" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
];

export function Header({ variant = "default" }: { variant?: "default" | "hero" }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`${styles.nav} ${variant === "hero" ? styles.navHero : ""}`}>
      <Link className={styles.brandMark} href="/">
        <Image className={styles.brandLogo} src="/rana-velvet-logo.png" alt="Rana Velvet logo" width={38} height={38} priority />
        Rana Velvet
      </Link>

      <details className={styles.mobileMenu} open={mobileMenuOpen}>
        <summary
          className={styles.navTrigger}
          onClick={(event) => {
            event.preventDefault();
            setMobileMenuOpen((open) => !open);
          }}
        >
          {mobileMenuOpen ? "Close" : "Menu"}
          {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
        </summary>
        <div className={styles.megaPanel} style={{ opacity: 1, pointerEvents: "auto", transform: "translate(-50%, 8px)" }}>
          <div className={styles.megaLinks}>
            {fallbackNavItems.map((item) => (
              <div className={styles.mobileNavGroup} key={item.label}>
                <Link href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                  <ArrowRight size={13} />
                </Link>
                {item.subcategories.map((sub) => (
                  <Link className={styles.mobileSubLink} key={sub.name} href={sub.href} onClick={() => setMobileMenuOpen(false)}>
                    {sub.name}
                  </Link>
                ))}
              </div>
            ))}
            <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)}>
              Wishlist
              <Heart size={13} />
            </Link>
            <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>
              Cart
              <ShoppingBag size={13} />
            </Link>
          </div>
        </div>
      </details>

      <nav className={styles.navGroups} aria-label="Primary navigation">
        {fallbackNavItems.map((item) => (
          <div className={styles.navGroup} key={item.label}>
            <Link className={`${styles.navTrigger} ${pathname === item.href ? styles.navActive : ""}`} href={item.href}>
              {item.label}
              {!item.isDirect && <ArrowRight size={13} />}
            </Link>
            {!item.isDirect && <div className={styles.megaPanel}>
              <div>
                <span>{item.note}</span>
                <strong>{item.label}</strong>
              </div>
              <div className={styles.megaLinks}>
                {(item.subcategories.length ? item.subcategories : [{ name: item.label, href: item.href }]).map((sub) => (
                  <Link key={sub.name} href={sub.href}>
                    {sub.name}
                    <ArrowRight size={13} />
                  </Link>
                ))}
              </div>
            </div>}
          </div>
        ))}
      </nav>

      <div className={styles.navTools}>
        <Link className={styles.navTool} href="/products?search=1" aria-label="Search products">
          <Search size={14} />
          Search
        </Link>
        <Link className={styles.navTool} href="/wishlist">
          <Heart size={14} />
          Wishlist
          {wishlistCount > 0 && <span className={styles.count}>{wishlistCount}</span>}
        </Link>
        <Link className={styles.navTool} href="/cart">
          <ShoppingBag size={14} />
          Cart
          {cartCount > 0 && <span className={styles.count}>{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
}
