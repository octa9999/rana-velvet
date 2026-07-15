"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Heart, Trash2, X } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import styles from "@/styles/ecommerce.module.css";

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export function WishlistDrawer() {
  const { items, isOpen, closeWishlist, removeItem } = useWishlist();
  const drawerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeWishlist();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeWishlist]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      closeButtonRef.current?.focus();
      return;
    }
    previousFocusRef.current?.focus?.();
  }, [isOpen]);

  const trapFocus = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") return;
    const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <div
        className={`${styles.drawerBackdrop} ${isOpen ? "" : styles.hiddenState}`}
        onClick={closeWishlist}
        aria-hidden="true"
      />
      <aside
        ref={drawerRef}
        className={`${styles.drawer} ${isOpen ? "" : styles.hiddenState}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="wishlist-drawer-title"
        aria-hidden={!isOpen}
        inert={!isOpen}
        onKeyDown={trapFocus}
      >
        <div className={styles.drawerHeader}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 18, alignItems: "center" }}>
            <div>
              <span className={styles.heroKicker}>Saved edit</span>
              <h2 id="wishlist-drawer-title" style={{ margin: 0 }}>Wishlist</h2>
            </div>
            <button ref={closeButtonRef} className={styles.iconPill} onClick={closeWishlist} type="button" aria-label="Close wishlist">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className={styles.drawerBody}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "54px 18px" }}>
              <Heart size={38} />
              <h3>Your wishlist is empty</h3>
              <p className={styles.muted}>Save pieces while browsing the collection.</p>
              <Link className={styles.primaryPill} href="/products" onClick={closeWishlist}>
                Explore Collection <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <article className={styles.drawerItem} key={item.id}>
                <Link href={`/products/${item.slug}`} onClick={closeWishlist}>
                  <img src={item.image} alt={item.name} />
                </Link>
                <div style={{ display: "grid", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <Link href={`/products/${item.slug}`} onClick={closeWishlist}>
                      <strong>{item.name}</strong>
                    </Link>
                    <button className={styles.iconPill} onClick={() => removeItem(item.id)} type="button" aria-label={`Remove ${item.name}`}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <small className={styles.muted}>{item.category} - {item.color}</small>
                  <strong>{formatPrice(item.price)}</strong>
                  <Link className={styles.secondaryPill} href={`/products/${item.slug}`} onClick={closeWishlist}>
                    View Product <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.drawerFooter}>
            <Link className={styles.primaryPill} href="/products" onClick={closeWishlist} style={{ width: "100%" }}>
              Continue Shopping <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
