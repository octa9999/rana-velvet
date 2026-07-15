"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import styles from "@/styles/ecommerce.module.css";

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCart();
  const drawerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal > 50000 || subtotal === 0 ? 0 : 2500;
  const total = subtotal + delivery;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeCart]);

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
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        ref={drawerRef}
        className={`${styles.drawer} ${isOpen ? "" : styles.hiddenState}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        aria-hidden={!isOpen}
        inert={!isOpen}
        onKeyDown={trapFocus}
      >
        <div className={styles.drawerHeader}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 18, alignItems: "center" }}>
            <div>
              <span className={styles.heroKicker}>Order edit</span>
              <h2 id="cart-drawer-title" style={{ margin: 0 }}>Your Cart</h2>
            </div>
            <button ref={closeButtonRef} className={styles.iconPill} onClick={closeCart} type="button" aria-label="Close cart">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className={styles.drawerBody}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "54px 18px" }}>
              <ShoppingBag size={38} />
              <h3>Your cart is empty</h3>
              <p className={styles.muted}>Start with a collection piece.</p>
              <Link className={styles.primaryPill} href="/products" onClick={closeCart}>
                Shop Now <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <article className={styles.drawerItem} key={`${item.id}-${item.color}`}>
                <Link href={`/products/${item.slug}`} onClick={closeCart}>
                  <img src={item.image} alt={item.name} />
                </Link>
                <div style={{ display: "grid", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <Link href={`/products/${item.slug}`} onClick={closeCart}>
                      <strong>{item.name}</strong>
                    </Link>
                    <button className={styles.iconPill} onClick={() => removeItem(item.id)} type="button" aria-label={`Remove ${item.name}`}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <small className={styles.muted}>{item.color}</small>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "end" }}>
                    <div className={styles.quantity}>
                      <button onClick={() => updateQuantity(item.id, -1)} type="button"><Minus size={12} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} type="button"><Plus size={12} /></button>
                    </div>
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.drawerFooter}>
            <div className={styles.summaryRows}>
              <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <div><span>Delivery</span><strong>{delivery === 0 ? "Free" : formatPrice(delivery)}</strong></div>
              <div className={styles.totalRow}><span>Total</span><strong>{formatPrice(total)}</strong></div>
            </div>
            <Link className={styles.primaryPill} href="/checkout" onClick={closeCart} style={{ width: "100%" }}>
              Checkout <ArrowRight size={15} />
            </Link>
            <Link className={styles.secondaryPill} href="/products" onClick={closeCart} style={{ width: "100%", marginTop: 10 }}>
              Continue Shopping
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
