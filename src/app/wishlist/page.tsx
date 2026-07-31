"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRight, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import styles from "@/styles/ecommerce.module.css";

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();

  return (
    <div className={styles.shell}>
      <Header />
      <main>
        <section className={`${styles.hero} ${styles.heroCompact}`}>
          <span className={styles.heroKicker}>Saved edit</span>
          <h1 className={styles.displayTitle}>Wishlist</h1>
          <p className={styles.heroCopy}>
            Keep the pieces you are considering, then move them into your cart when the room direction feels right.
          </p>
        </section>

        <section className={styles.paperSection}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <Heart size={42} />
              <h2>Your wishlist is empty</h2>
              <p className={styles.muted}>Save products from the collection to build a focused Rana Velvet edit.</p>
              <Link className={styles.primaryPill} href="/products">
                Explore Collection <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            <>
              <div className={styles.wishlistToolbar}>
                <p>{items.length} saved {items.length === 1 ? "piece" : "pieces"}</p>
                <button className={styles.secondaryPill} onClick={clearWishlist} type="button">
                  Clear Wishlist
                </button>
              </div>
              <div className={styles.productGrid}>
                {items.map((item) => (
                  <article className={styles.productCard} key={item.id}>
                    <Link className={styles.productMedia} href={`/products/${item.slug}`}>
                      <img src={item.image} alt={item.name} />
                      <div className={styles.productOverlay}>
                        <span>{formatPrice(item.price)}</span>
                        <small>{item.category}</small>
                      </div>
                    </Link>
                    <div className={styles.productInfo}>
                      <span>{item.color}</span>
                      <strong>{item.name}</strong>
                    </div>
                    <div className={styles.choiceRow} style={{ marginTop: 16 }}>
                      <button
                        className={styles.primaryPill}
                        onClick={() => addToCart({ ...item, quantity: 1 })}
                        type="button"
                      >
                        <ShoppingBag size={16} />
                        Add to Cart
                      </button>
                      <button className={styles.secondaryPill} onClick={() => removeItem(item.id)} type="button">
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
