/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import styles from "@/styles/ecommerce.module.css";

const categories = [
  {
    name: "Bedroom Furniture",
    slug: "bedroom",
    description: "Transform your sanctuary with our curated bedroom pieces",
    count: 24,
    image: "/demohome-zenspace/bedroom.jpg",
  },
  {
    name: "Living Room",
    slug: "living-room",
    description: "Create inviting spaces for family and guests",
    count: 32,
    image: "/demohome-zenspace/living-room.jpg",
  },
  {
    name: "Sofas & Seating",
    slug: "sofas",
    description: "Comfort meets elegance in every stitch",
    count: 18,
    image: "/demohome-zenspace/seating.jpg",
  },
  {
    name: "Curtains & Fabrics",
    slug: "curtains",
    description: "Signature velvets and premium textiles",
    count: 45,
    image: "/demohome-zenspace/curtains.jpg",
  },
  {
    name: "Home Accessories",
    slug: "accessories",
    description: "The finishing touches that complete your space",
    count: 56,
    image: "/demohome-zenspace/decor.jpg",
  },
  {
    name: "Custom Furniture",
    slug: "custom",
    description: "Bespoke pieces tailored to your vision",
    count: 12,
    image: "/demohome-zenspace/custom.jpg",
  },
];

export default function CategoriesPage() {
  return (
    <div className={styles.shell}>
      <Header />
      <main>
        <section className={`${styles.hero} ${styles.heroCompact}`}>
          <span className={styles.heroKicker}>Our Collections</span>
          <h1 className={styles.displayTitle}>room edits</h1>
          <p className={styles.heroCopy}>
            Browse furniture, curtains, fabrics, decor, and custom pieces as complete room directions.
          </p>
        </section>

        <section className={styles.darkBand}>
          <div className={styles.sectionHead}>
            <p>Each collection is presented as a complete room cue, with materials, finish, and function considered together.</p>
            <h2>collections</h2>
            <Link className={styles.secondaryPill} href="/products">
              Shop All <ArrowRight size={15} />
            </Link>
          </div>

          <div className={styles.productGrid}>
            {categories.map((category) => (
              <article className={styles.productCard} key={category.slug}>
                <Link className={styles.productMedia} href={`/products?category=${encodeURIComponent(category.name.replace(" Furniture", ""))}`}>
                  <img src={category.image} alt={category.name} />
                  <div className={styles.productOverlay}>
                    <span>{category.count} Products</span>
                    <small>Explore</small>
                  </div>
                </Link>
                <div className={styles.productInfo}>
                  <span>{category.description}</span>
                  <strong>{category.name}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
