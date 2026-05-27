/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRight, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import styles from "./DemoShopMockups.module.css";

const asset = (file: string) => `/demohome-zenspace/${file}`;

const products = [
  {
    name: "Velvet Royale Bed",
    category: "Bedroom",
    price: "Rs. 89,999",
    image: "bedroom.jpg",
    finish: "Walnut frame, deep velvet upholstery",
  },
  {
    name: "Cloud Comfort Sofa",
    category: "Living Room",
    price: "Rs. 129,999",
    image: "talk-sofa-cutout.png",
    finish: "Burnt velvet, generous curved back",
  },
  {
    name: "Royal Armchair",
    category: "Sofas & Seating",
    price: "Rs. 54,999",
    image: "hero-cutout.png",
    finish: "Tan inner shell, dark velvet back",
  },
  {
    name: "Imperial Curtains",
    category: "Curtains & Fabrics",
    price: "Rs. 12,999",
    image: "curtains.jpg",
    finish: "Heavy fall drape, soft lining",
  },
  {
    name: "Diamond Coffee Table",
    category: "Home Decor",
    price: "Rs. 39,999",
    image: "coffee-table.jpg",
    finish: "Low profile table with polished edge",
  },
  {
    name: "Prestige Dining Set",
    category: "Dining",
    price: "Rs. 189,999",
    image: "dining.jpg",
    finish: "Six seat dining composition",
  },
];

const links = [
  ["Home", "/demohome"],
  ["Products", "/demohome/products"],
  ["Wishlist", "/demohome/wishlist"],
  ["Cart", "/demohome/cart"],
  ["Checkout", "/demohome/checkout"],
];

const categories = ["Bedroom", "Living Room", "Sofas & Seating", "Curtains & Fabrics", "Home Decor", "Custom Furniture"];

type DemoShopMockupsProps = {
  view: "products" | "product" | "wishlist" | "cart" | "checkout";
};

export function DemoShopMockups({ view }: DemoShopMockupsProps) {
  const featured = products[1];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/demohome" className={styles.brand}>
          Rana Velvet
        </Link>
        <nav aria-label="Store mockup navigation">
          {links.map(([label, href]) => (
            <Link key={label} href={href} className={view === label.toLowerCase() ? styles.active : ""}>
              {label}
            </Link>
          ))}
        </nav>
      </header>

      {view === "products" && (
        <>
          <section className={styles.hero}>
            <div>
              <p>Editorial shop mockup</p>
              <h1>products with quiet detail</h1>
            </div>
            <Link href="/demohome/product" className={styles.pill}>
              View Featured <ArrowRight size={15} />
            </Link>
          </section>
          <ProductGrid />
        </>
      )}

      {view === "product" && (
        <section className={styles.productDetail}>
          <div className={styles.gallery}>
            <img src={asset(featured.image)} alt={featured.name} />
            <div>
              {products.slice(0, 3).map((product) => (
                <img key={product.name} src={asset(product.image)} alt={product.name} />
              ))}
            </div>
          </div>
          <aside className={styles.buyPanel}>
            <span>{featured.category}</span>
            <h1>{featured.name}</h1>
            <p>{featured.finish}. Built as a hero piece for living rooms that need softness without visual noise.</p>
            <strong>{featured.price}</strong>
            <div className={styles.qty}>
              <button type="button" aria-label="Decrease quantity">
                <Minus size={15} />
              </button>
              <span>1</span>
              <button type="button" aria-label="Increase quantity">
                <Plus size={15} />
              </button>
            </div>
            <div className={styles.actions}>
              <Link href="/demohome/cart">
                <ShoppingBag size={16} /> Add to Cart
              </Link>
              <Link href="/demohome/checkout">Buy Now</Link>
              <Link href="/demohome/wishlist" aria-label="Add to wishlist">
                <Heart size={17} />
              </Link>
            </div>
          </aside>
        </section>
      )}

      {view === "wishlist" && (
        <section className={styles.listView}>
          <div className={styles.listHead}>
            <h1>wishlist</h1>
            <p>Saved pieces stay calm and scannable, with price and cart action visible without clutter.</p>
          </div>
          <ProductGrid limit={3} />
        </section>
      )}

      {view === "cart" && (
        <section className={styles.cart}>
          <div>
            <h1>cart</h1>
            {products.slice(0, 3).map((product) => (
              <article className={styles.cartRow} key={product.name}>
                <img src={asset(product.image)} alt={product.name} />
                <div>
                  <span>{product.category}</span>
                  <strong>{product.name}</strong>
                </div>
                <p>{product.price}</p>
              </article>
            ))}
          </div>
          <aside className={styles.summary}>
            <span>Order Summary</span>
            <p>Subtotal</p>
            <strong>Rs. 274,997</strong>
            <Link href="/demohome/checkout">Proceed to Checkout</Link>
          </aside>
        </section>
      )}

      {view === "checkout" && (
        <section className={styles.checkout}>
          <div className={styles.checkoutForm}>
            <h1>checkout</h1>
            <label>
              Full name
              <input placeholder="Your name" />
            </label>
            <label>
              Phone
              <input placeholder="+92" />
            </label>
            <label>
              Delivery address
              <textarea placeholder="House, street, city" />
            </label>
            <button type="button">Place Mock Order</button>
          </div>
          <aside className={styles.summary}>
            <span>Secure checkout mockup</span>
            <p>Designed now, ready for Supabase and admin-managed products later.</p>
            <strong>Rs. 274,997</strong>
          </aside>
        </section>
      )}

      <footer className={styles.footer}>
        <strong>Rana Velvet</strong>
        <nav aria-label="Demo store footer categories">
          {categories.map((category) => (
            <Link key={category} href="/demohome/products">
              {category}
            </Link>
          ))}
        </nav>
        <div className={styles.socialLinks} aria-label="Social links">
          <Link href="/demohome" aria-label="Instagram">
            IG
          </Link>
          <Link href="/demohome" aria-label="Facebook">
            FB
          </Link>
          <Link href="/demohome" aria-label="LinkedIn">
            IN
          </Link>
        </div>
      </footer>
    </main>
  );
}

function ProductGrid({ limit }: { limit?: number }) {
  return (
    <section className={styles.grid}>
      {products.slice(0, limit ?? products.length).map((product) => (
        <article className={styles.card} key={product.name}>
          <Link href="/demohome/product" className={styles.media}>
            <img src={asset(product.image)} alt={product.name} />
            <div className={styles.cardHover}>
              <span>{product.price}</span>
              <div>
                <button type="button" aria-label={`Wishlist ${product.name}`}>
                  <Heart size={16} />
                </button>
                <button type="button" aria-label={`Add ${product.name} to cart`}>
                  <ShoppingBag size={16} />
                </button>
              </div>
            </div>
          </Link>
          <div className={styles.info}>
            <span>{product.category}</span>
            <strong>{product.name}</strong>
            <p>{product.finish}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
