/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRight, Heart, Search, ShoppingBag } from "lucide-react";
import styles from "./DemoHomePage.module.css";

const asset = (file: string) => `/demohome-zenspace/${file}`;

const headerGroups = [
  {
    label: "Home",
    href: "/",
    note: "Rana Velvet",
    items: ["Curtains collection", "Room-led furniture", "Design process", "Talk with us"],
  },
  {
    label: "Shop",
    href: "/products",
    note: "Shop the house",
    items: ["Bedroom", "Living Room", "Sofas & Seating", "Curtains & Fabrics"],
  },
  {
    label: "Customize Curtain",
    href: "/customize-curtain",
    note: "Made to measure",
    items: ["I have measurements", "Book a measurement visit", "Fabric options", "Installation request"],
  },
  {
    label: "Custom Furniture",
    href: "/custom-furniture",
    note: "Made for your space",
    items: ["Sofas", "Beds", "Tables", "Custom quotation"],
  },
  {
    label: "About Us",
    href: "/about",
    note: "Our studio",
    items: ["Rana Velvet story", "Materials", "Craft", "Showroom"],
  },
  {
    label: "Consultation",
    href: "/consultation",
    note: "Plan your space",
    items: ["Book a consultation", "Room planning", "Material direction", "Design support"],
  },
  {
    label: "Contact",
    href: "/contact",
    note: "Talk with us",
    items: ["Send an inquiry", "Order help", "Delivery questions", "Interior designer partners"],
  },
];

const products = [
  {
    name: "Velvet Royale Bed",
    slug: "velvet-royale-bed",
    category: "Bedroom",
    price: "Rs. 89,999",
    image: "bedroom.jpg",
  },
  {
    name: "Cloud Comfort Sofa",
    slug: "cloud-comfort-sofa",
    category: "Living Room",
    price: "Rs. 129,999",
    image: "living-room.jpg",
  },
  {
    name: "Elite Ottoman",
    slug: "elite-ottoman",
    category: "Seating",
    price: "Rs. 34,999",
    image: "seating.jpg",
  },
  {
    name: "Imperial Curtains",
    slug: "imperial-curtains",
    category: "Curtains",
    price: "Rs. 12,999",
    image: "curtains.jpg",
  },
  {
    name: "Royal Armchair",
    slug: "cloud-comfort-sofa",
    category: "Seating",
    price: "Rs. 54,999",
    image: "hero-rana-chair.png",
  },
  {
    name: "Prestige Dining Set",
    slug: "cloud-comfort-sofa",
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
          <Link className={styles.brandMark} href="/">
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
              <Link href="/wishlist">
                <span>Wishlist</span>
                <small>Saved pieces</small>
              </Link>
              <Link href="/cart">
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
            <Link href="/products" aria-label="Search products"><Search size={15} /></Link>
            <Link href="/wishlist">Wishlist</Link>
            <Link href="/cart">Cart</Link>
          </div>
        </nav>

        <div className={styles.heroStage}>
          <img
            className={styles.heroImage}
            src={asset("curtains-hero-room.png")}
            alt="Rana Velvet curtains framing a warm living room"
          />
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={styles.heroContent}>
            <span>Curtains Collection - 2025</span>
            <h1>Fabric that changes the room.</h1>
            <p>
              Elevated, considered drape and made for home comfort-designed to
              soften light and give every space a more finished presence.
            </p>
            <div className={styles.heroActions}>
              <Link href="/products?category=Curtains" className={styles.heroPrimary}>
                Explore Curtains
              </Link>
              <Link href="/customize-curtain" className={styles.heroSecondary}>
                Customize Your Curtain
                <ArrowRight size={18} />
              </Link>
            </div>
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
              Every room is shaped around considered proportions, tactile
              materials, generous comfort, and details that feel quietly
              personal.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.collections}>
        <div className={styles.sectionHead}>
          <p>
            Explore room-led edits across furniture, fabrics, drapery, and
            made-to-measure pieces for a complete interior.
          </p>
          <h2>collections</h2>
          <Link href="/products">
            Shop Now <ArrowRight size={15} />
          </Link>
        </div>

        <div className={styles.productGrid}>
          {products.map((product) => (
            <article key={product.name} className={styles.productCard}>
              <div className={styles.productMedia}>
                <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
                  <img src={asset(product.image)} alt={product.name} />
                </Link>
                <div className={styles.productActions}>
                  <Link href="/wishlist" aria-label={`Save ${product.name} to wishlist`}>
                    <Heart size={17} />
                  </Link>
                  <Link href={`/products/${product.slug}`} aria-label={`Choose ${product.name} before adding to cart`}>
                    <ShoppingBag size={17} />
                  </Link>
                </div>
                <div className={styles.productOverlay}>
                  <span>{product.price}</span>
                  <small>{product.category}</small>
                </div>
              </div>
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
            <Link href="/products" key={name}>
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
          <Link href="/consultation">
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
              <Link key={label} href="/products">
                {label}
              </Link>
            ))}
          </nav>
          <div className={styles.socialLinks} aria-label="Social links">
            <Link href="/" aria-label="Instagram">
              IG
            </Link>
            <Link href="/" aria-label="Facebook">
              FB
            </Link>
            <Link href="/" aria-label="LinkedIn">
              IN
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
