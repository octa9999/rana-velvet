"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import styles from "@/styles/ecommerce.module.css";

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal > 50000 || subtotal === 0 ? 0 : 2500;
  const total = subtotal + delivery;

  return (
    <div className={styles.shell}>
      <Header />
      <main>
        <section className={`${styles.hero} ${styles.heroCompact}`}>
          <span className={styles.heroKicker}>Order review</span>
          <h1 className={styles.displayTitle}>your cart</h1>
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
                <h2>summary</h2>
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
        </section>
      </main>
      <Footer />
    </div>
  );
}
