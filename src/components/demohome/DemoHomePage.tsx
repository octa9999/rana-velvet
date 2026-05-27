/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import styles from "./DemoHomePage.module.css";

const asset = (file: string) => `/demohome-zenspace/${file}`;

const headerGroups = [
  {
    label: "Collections",
    href: "/demohome/products",
    note: "Room-led edits",
    items: ["Bedroom", "Living Room", "Sofas & Seating", "Curtains & Fabrics"],
  },
  {
    label: "Products",
    href: "/demohome/products",
    note: "Shop the house",
    items: ["Velvet Royale Bed", "Cloud Comfort Sofa", "Royal Armchair", "Diamond Coffee Table"],
  },
  {
    label: "Studio",
    href: "/demohome",
    note: "Consultation flow",
    items: ["Design Process", "Material Edit", "Custom Furniture", "Installation"],
  },
  {
    label: "Support",
    href: "/demohome/checkout",
    note: "Order journey",
    items: ["Wishlist", "Cart", "Checkout", "Talk With Us"],
  },
];

const products = [
  {
    name: "Velvet Royale Bed",
    category: "Bedroom",
    price: "Rs. 89,999",
    image: "bedroom.jpg",
  },
  {
    name: "Cloud Comfort Sofa",
    category: "Living Room",
    price: "Rs. 129,999",
    image: "living-room.jpg",
  },
  {
    name: "Elite Ottoman",
    category: "Seating",
    price: "Rs. 34,999",
    image: "seating.jpg",
  },
  {
    name: "Imperial Curtains",
    category: "Curtains",
    price: "Rs. 12,999",
    image: "curtains.jpg",
  },
  {
    name: "Royal Armchair",
    category: "Seating",
    price: "Rs. 54,999",
    image: "hero-rana-chair.png",
  },
  {
    name: "Prestige Dining Set",
    category: "Dining",
    price: "Rs. 189,999",
    image: "dining.jpg",
  },
];

const categories = [
  ["Bedroom", "Layered comfort and tailored sleeping spaces."],
  ["Living Room", "Statement seating built for daily gathering."],
  ["Sofas & Seating", "Soft proportions, velvet textures, ergonomic support."],
  ["Curtains & Fabrics", "Drapery, sheers, and signature fabric finishes."],
  ["Home Decor", "Tables, accents, and finishing pieces."],
  ["Custom Furniture", "Made-to-measure pieces for distinctive rooms."],
];

const process = [
  ["01", "Consultation", "A focused design conversation around your room, materials, budget, and lifestyle."],
  ["02", "Material Edit", "Velvet, wood, upholstery, and finishing options are narrowed into a cohesive palette."],
  ["03", "Craft & Install", "Your selected pieces are produced, delivered, and placed with a polished final setup."],
];

export function DemoHomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <nav className={styles.topNav} aria-label="Demo navigation">
          <Link className={styles.brandMark} href="/demohome">
            Rana Velvet
          </Link>
          <details className={styles.mobileMenu}>
            <summary>
              Menu
              <ArrowRight size={14} />
            </summary>
            <div className={styles.mobileMenuPanel}>
              {headerGroups.map((group) => (
                <Link key={group.label} href={group.href}>
                  <span>{group.label}</span>
                  <small>{group.note}</small>
                </Link>
              ))}
              <Link href="/demohome/wishlist">
                <span>Wishlist</span>
                <small>Saved pieces</small>
              </Link>
              <Link href="/demohome/cart">
                <span>Cart</span>
                <small>Order review</small>
              </Link>
            </div>
          </details>
          <div className={styles.navGroups}>
            {headerGroups.map((group) => (
              <div className={styles.navGroup} key={group.label}>
                <Link className={styles.navTrigger} href={group.href}>
                  {group.label}
                  <ArrowRight size={13} />
                </Link>
                <div className={styles.megaPanel}>
                  <div>
                    <span>{group.note}</span>
                    <strong>{group.label}</strong>
                  </div>
                  <div className={styles.megaLinks}>
                    {group.items.map((item) => (
                      <Link key={item} href={group.href}>
                        {item}
                        <ArrowRight size={13} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.navTools}>
            <Link href="/demohome/wishlist">Wishlist</Link>
            <Link href="/demohome/cart">Cart</Link>
          </div>
        </nav>

        <div className={styles.heroStage}>
          <h1>Rana Velvet</h1>
          <img
            className={styles.heroImage}
            src={asset("hero-cutout.png")}
            alt="Rana Velvet sculptural lounge chair"
          />
          <div className={styles.heroMeta}>
            <p>
              Furniture with presence: sculptural forms, rich upholstery, and
              rooms composed with restraint.
            </p>
            <Link href="/contact" className={styles.talkPill}>
              <span>RV</span>
              Talk With Us
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.studio}>
        <div className={styles.studioTitle}>
          <h2>we design</h2>
          <h2>with restraint</h2>
        </div>
        <div className={styles.studioGrid}>
          <div className={styles.studioCard}>
            <span>Since 1960</span>
            <p>
              Rana Velvet is a luxury furniture and fabric house built around
              touch, proportion, and made-for-home comfort.
            </p>
          </div>
          <img src={asset("hero.png")} alt="Rana Velvet living room" />
          <div className={styles.studioCopy}>
            <p>
              We keep the page language editorial: fewer decorations, stronger
              product moments, generous spacing, and interaction that reveals
              details only when the user asks for them.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.collections}>
        <div className={styles.sectionHead}>
          <p>
            Real categories from Rana Velvet, redesigned as a quiet product
            gallery instead of a standard ecommerce grid.
          </p>
          <h2>collections</h2>
          <Link href="/products">
            Shop Now <ArrowRight size={15} />
          </Link>
        </div>

        <div className={styles.productGrid}>
          {products.map((product) => (
            <article key={product.name} className={styles.productCard}>
              <Link href="/demohome/product" className={styles.productMedia}>
                <img src={asset(product.image)} alt={product.name} />
                <div className={styles.productActions}>
                  <button type="button" aria-label={`Wishlist ${product.name}`}>
                    <Heart size={17} />
                  </button>
                  <button type="button" aria-label={`Add ${product.name} to cart`}>
                    <ShoppingBag size={17} />
                  </button>
                </div>
                <div className={styles.productOverlay}>
                  <span>{product.price}</span>
                  <small>{product.category}</small>
                </div>
              </Link>
              <div className={styles.productInfo}>
                <span>{product.category}</span>
                <strong>{product.name}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.categoryStudio}>
        <div>
          <h2>made for rooms</h2>
          <p>
            Instead of forcing every category into the same card, each range is
            treated like a room direction: what it solves, what it feels like,
            and how it supports a complete interior.
          </p>
        </div>
        <div className={styles.categoryList}>
          {categories.map(([name, description]) => (
            <Link href="/demohome/products" key={name}>
              <span>{name}</span>
              <small>{description}</small>
              <ArrowRight size={16} />
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.process}>
        <div className={styles.processHead}>
          <h2>design process</h2>
        <Link href="/demohome/checkout">
            Book Consultation <ArrowRight size={15} />
          </Link>
        </div>
        <div className={styles.processGrid}>
          {process.map(([step, title, body]) => (
            <article key={step}>
              <span>{step}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <img src={asset("custom.jpg")} alt="Rana Velvet consultation setting" />
      </section>

      <section className={styles.talk}>
        <div className={styles.talkCopy}>
          <p>
            Embark on your interior design journey with a personalized
            consultation tailored to your unique preferences and requirements.
          </p>
        </div>
        <h2>Talk With Us</h2>
        <Link href="/contact" className={styles.centerPill}>
          <span>RV</span>
          Talk Now
          <ArrowRight size={15} />
        </Link>
        <img className={styles.talkBg} src={asset("talk-sofa-cutout.png")} alt="" aria-hidden="true" />
        <div className={styles.talkImages}>
          <p>
            Our experts blend design professionalism with Rana Velvet
            authenticity to create spaces that reflect your taste and lifestyle.
          </p>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInfo}>
          <p>
            We are dedicated to offering discerning clientele a curated
            selection of furniture that embodies timeless elegance.
          </p>
          <p>+21 1291 210109<br />+21 1291 9181</p>
          <p>123 Elegance Avenue, Suite 101,<br />Metropolitan City</p>
        </div>
        <strong>Rana Velvet</strong>
        <div className={styles.footerLinks}>
          <nav aria-label="Footer categories">
            {categories.map(([label]) => (
              <Link key={label} href="/demohome/products">
                {label}
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
        </div>
      </footer>
    </main>
  );
}
