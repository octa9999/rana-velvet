"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { type CartItem, useCart } from "@/context/CartContext";
import { readyMadeCurtains } from "@/lib/storefront";
import styles from "@/styles/ecommerce.module.css";

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

type RecommendedProduct = Omit<CartItem, "quantity" | "color"> & { color?: string; colors?: string[] };

export default function CartPage() {
  const { items, updateQuantity, removeItem, addItem } = useCart();
  const [recommendations, setRecommendations] = useState<RecommendedProduct[]>([]);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal > 50000 || subtotal === 0 ? 0 : 2500;
  const total = subtotal + delivery;

  useEffect(() => {
    if (!items.length) return;
    const isNotInCart = (product: RecommendedProduct) => !items.some((item) => item.id === product.id);
    setRecommendations(readyMadeCurtains.filter(isNotInCart).slice(0, 3));
    fetch("/api/catalog/products")
      .then((response) => response.json())
      .then((payload) => {
        if (!Array.isArray(payload.products)) return;
        setRecommendations(
          payload.products.filter(isNotInCart).slice(0, 3)
        );
      })
      .catch(() => setRecommendations([]));
  }, [items]);

  return (
    <div className={styles.shell}>
      <Header />
      <main>
        <section className={`${styles.hero} ${styles.heroCompact}`}>
          <span className={styles.heroKicker}>Order review</span>
          <h1 className={styles.displayTitle}>Your Cart</h1>
          <p className={styles.heroCopy}>
            Review proportions, finishes, and quantities before moving into the checkout flow.
          </p>
        </section>

        <section className={styles.paperSection}>
          {items.length === 0 ? (
            <div className={styles.summaryCard} style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
              <ShoppingBag size={42} />
              <h2 style={{ marginTop: 20 }}>Your cart is empty</h2>
              <p className={styles.muted} style={{ margin: "18px auto 26px", maxWidth: 420 }}>
                Start with a collection piece, then return here to confirm your order.
              </p>
              <Link className={styles.primaryPill} href="/products">
                Explore Collection <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            <div className={styles.contentGrid}>
              <div style={{ display: "grid", gap: 16 }}>
                {items.map((item) => (
                  <article className={styles.cartItem} key={`${item.id}-${item.color}`}>
                    <Link href={`/products/${item.slug}`}>
                      <img src={item.image} alt={item.name} />
                    </Link>
                    <div className={styles.cartMeta}>
                  <div>
                        <small>{item.category}</small>
                        <h3>{item.name}</h3>
                        <p className={styles.muted}>Finish: {item.color}</p>
                        {item.name.toLowerCase().includes("estimate") && (
                          <p className={styles.muted}>Estimate - final price to be confirmed.</p>
                        )}
                      </div>
                      <div className={styles.quantity}>
                        <button onClick={() => updateQuantity(item.id, -1)} type="button" aria-label={`Decrease ${item.name} quantity`}><Minus size={14} /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} type="button" aria-label={`Increase ${item.name} quantity`}><Plus size={14} /></button>
                      </div>
                    </div>
                    <button className={styles.secondaryPill} onClick={() => removeItem(item.id)} type="button" aria-label={`Remove ${item.name}`}>
                      <Trash2 size={15} />
                      Remove
                    </button>
                  </article>
                ))}
              </div>

              <aside className={styles.summaryCard}>
                <h2>Summary</h2>
                <div className={styles.summaryRows}>
                  <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
                  <div><span>Delivery</span><strong>{delivery === 0 ? "Calculated after confirmation" : formatPrice(delivery)}</strong></div>
                  <div className={styles.totalRow}><span>Total</span><strong>{formatPrice(total)}</strong></div>
                </div>
                <p className={styles.muted} style={{ marginBottom: 16, lineHeight: 1.4 }}>
                  Large furniture and custom curtain delivery charges may be confirmed separately before dispatch.
                </p>
                <Link className={styles.primaryPill} href="/checkout" style={{ width: "100%" }}>
                  Proceed to Checkout <ArrowRight size={15} />
                </Link>
                <Link className={styles.secondaryPill} href="/products" style={{ width: "100%", marginTop: 10 }}>
                  <ArrowLeft size={15} /> Continue Shopping
                </Link>
              </aside>
            </div>
          )}

          {items.length > 0 && recommendations.length > 0 && (
            <section style={{ maxWidth: 1400, margin: "56px auto 0" }}>
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: 22, display: "grid", gap: 8 }}>
                <span className={styles.heroKicker}>Complete The Room</span>
                <h2 style={{ color: "var(--ink)", fontSize: "clamp(2.25rem, 4vw, 4.5rem)", lineHeight: 1, margin: 0 }}>Recommended For Your Room</h2>
                <p className={styles.muted}>Pieces selected from the current collection.</p>
              </div>
              <div className={styles.productGrid} style={{ marginTop: 28 }}>
                {recommendations.map((product) => (
                  <article className={styles.productCard} key={product.id}>
                    <Link className={styles.productMedia} href={`/products/${product.slug}`}>
                      <img src={product.image} alt={product.name} />
                    </Link>
                    <div className={styles.productMeta}>
                      <div>
                        <small>{product.category}</small>
                        <h3>{product.name}</h3>
                        <strong>{formatPrice(product.price)}</strong>
                      </div>
                      <button
                        className={styles.primaryPill}
                        onClick={() => addItem({ ...product, color: product.colors?.[0] || product.color || "Default", quantity: 1 })}
                        type="button"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
