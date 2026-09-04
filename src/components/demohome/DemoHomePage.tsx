"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { HomeFooter } from "@/components/layout/HomeFooter";
import { Header } from "@/components/layout/Header";
import styles from "./DemoHomePage.module.css";

const asset = (file: string) => `/demohome-zenspace/${file}`;

type CollectionProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  image: string;
};

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

const process = [
  ["01", "Consultation", "A focused design conversation around your room, materials, budget, and lifestyle."],
  ["02", "Material Edit", "Velvet, wood, upholstery, and finishing options are narrowed into a cohesive palette."],
  ["03", "Craft & Install", "Your selected pieces are produced, delivered, and placed with a polished final setup."],
];

export function DemoHomePage() {
  const [collectionProducts, setCollectionProducts] = useState<CollectionProduct[]>([]);
  const [catalogProducts, setCatalogProducts] = useState<CollectionProduct[]>([]);

  useEffect(() => {
    fetch("/api/catalog/products")
      .then((response) => response.json())
      .then((payload: { products?: CollectionProduct[] }) => {
        if (!Array.isArray(payload.products)) return;
        setCatalogProducts(payload.products);
        setCollectionProducts(payload.products.slice(0, 6));
      })
      .catch(() => {
        setCatalogProducts([]);
        setCollectionProducts([]);
      });
  }, []);

  const activeCategories = Array.from(
    catalogProducts.reduce((categories, product) => {
      const name = product.category.trim();
      if (!name) return categories;
      categories.set(name, (categories.get(name) || 0) + 1);
      return categories;
    }, new Map<string, number>())
  )
    .map(([name, count]) => ({ name, count }))
    .sort((left, right) => right.count - left.count)
    .slice(0, 6);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Header variant="hero" />

        <div className={styles.heroStage}>
          <img
            className={styles.heroImage}
            src={asset("curtains-hero-room.png")}
            alt="Rana Velvet curtains framing a warm living room"
          />
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={styles.heroContent}>
            <span>Curtains Collection - 2025</span>
            <h1>Fabric That Changes The Room.</h1>
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
          <h2>We Design</h2>
          <h2>With Restraint</h2>
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
          <h2>Collections</h2>
          <Link href="/products">
            Shop Now <ArrowRight size={15} />
          </Link>
        </div>

        <div className={styles.productGrid}>
          {collectionProducts.map((product) => (
            <article key={product.id} className={styles.productCard}>
              <div className={styles.productMedia}>
                <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
                  <img src={product.image} alt={product.name} />
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
                  <span>{formatPrice(product.price)}</span>
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
          <h2>Made For Rooms</h2>
          <p>
            Instead of forcing every category into the same card, each range is
            treated like a room direction: what it solves, what it feels like,
            and how it supports a complete interior.
          </p>
        </div>
        <div className={styles.categoryList}>
          {activeCategories.map((category) => (
            <Link href={`/products?category=${encodeURIComponent(category.name)}`} key={category.name}>
              <span>{category.name}</span>
              <small>{`${category.count} ${category.count === 1 ? "piece" : "pieces"} available`}</small>
              <ArrowRight size={16} />
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.process}>
        <div className={styles.processHead}>
          <h2>Design Process</h2>
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
        <h2>Talk With Us</h2>
        <Link href="/contact" className={styles.centerPill}>
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

      <HomeFooter />
    </main>
  );
}
