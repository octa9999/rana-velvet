"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { readyMadeCurtains } from "@/lib/storefront";
import styles from "@/styles/ecommerce.module.css";

type ProductCard = {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  subcategory?: string;
  description: string;
  image: string;
};

const seedProducts: ProductCard[] = [
  ...readyMadeCurtains,
  { id: "1", name: "Velvet Royale Bed", slug: "velvet-royale-bed", price: 89999, category: "Bedroom", description: "Luxurious velvet upholstered bed with premium frame", image: "/demohome-zenspace/bedroom.jpg" },
  { id: "2", name: "Cloud Comfort Sofa", slug: "cloud-comfort-sofa", price: 129999, category: "Living Room", description: "3-seater plush sofa in premium velvet fabric", image: "/demohome-zenspace/living-room.jpg" },
  { id: "3", name: "Elite Ottoman", slug: "elite-ottoman", price: 34999, category: "Seating", description: "Multi-functional ottoman with storage space", image: "/demohome-zenspace/seating.jpg" },
  { id: "4", name: "Imperial Curtains", slug: "imperial-curtains", price: 12999, category: "Curtains", description: "Premium heavy velvet curtains with elegant drapes", image: "/demohome-zenspace/curtains.jpg" },
  { id: "5", name: "Royal Armchair", slug: "royal-armchair", price: 54999, category: "Seating", description: "Classic armchair with refined Rana Velvet proportions", image: "/demohome-zenspace/hero-rana-chair.png" },
  { id: "6", name: "Diamond Coffee Table", slug: "diamond-coffee-table", price: 45999, category: "Living Room", description: "Elegant coffee table for composed lounge settings", image: "/demohome-zenspace/coffee-table.jpg" },
  { id: "7", name: "Silk Drape Collection", slug: "silk-drape-collection", price: 18999, category: "Curtains", description: "Layered drapery and fabric finishes for softened rooms", image: "/demohome-zenspace/decor.jpg" },
  { id: "8", name: "Prestige Dining Set", slug: "prestige-dining-set", price: 189999, category: "Dining", description: "Dining pieces with tailored wood and upholstery detail", image: "/demohome-zenspace/dining.jpg" },
];

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

function matchesCategory(product: ProductCard, category: string) {
  if (category === "All") return true;

  const values = [product.category, product.subcategory]
    .filter(Boolean)
    .map((value) => value!.toLowerCase());
  const target = category.toLowerCase();

  if (target === "sofas") return values.some((value) => value.includes("sofa") || value.includes("seating"));
  if (target === "curtains") return values.some((value) => value.includes("curtain"));

  return values.includes(target);
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState<ProductCard[]>(seedProducts);
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetch("/api/catalog/products")
      .then((response) => response.json())
      .then((payload) => {
        if (Array.isArray(payload.products) && payload.products.length) setProducts(payload.products);
      })
      .catch(() => setProducts(seedProducts));
  }, []);

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get("category");
    if (category) setActiveCategory(category);
    if (new URLSearchParams(window.location.search).get("search")) {
      window.setTimeout(() => document.getElementById("product-search")?.focus(), 100);
    }
  }, []);

  const categories = ["All", "Bedroom", "Sofas", "Living Room", "Curtains", ...Array.from(new Set(products.map((product) => product.category).filter(Boolean)))].filter(
    (category, index, list) => list.indexOf(category) === index && (category === "All" || products.some((product) => matchesCategory(product, category)))
  );
  const filtered = products
    .filter((product) => matchesCategory(product, activeCategory))
    .filter((product) => {
      const query = searchTerm.trim().toLowerCase();
      if (!query) return true;
      return `${product.name} ${product.category} ${product.subcategory || ""} ${product.description}`.toLowerCase().includes(query);
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "az") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className={styles.shell}>
      <Header />
      <main>
        <section className={`${styles.hero} ${styles.heroCompact}`}>
          <span className={styles.heroKicker}>Rana Velvet Collection</span>
          <h1 className={styles.displayTitle}>Shop Pieces</h1>
          <p className={styles.heroCopy}>
            Furniture, fabrics, curtains and custom pieces presented with the same quiet editorial rhythm as the Rana Velvet studio.
          </p>
        </section>

        <section className={styles.darkBand}>
          <div className={styles.sectionHead}>
            <p>{filtered.length} pieces available. Explore the collection by room, material direction, and furnishing mood.</p>
            <h2>Collections</h2>
            <Link className={styles.secondaryPill} href="/contact">
              Talk With Us <ArrowRight size={15} />
            </Link>
          </div>

          <div className={styles.toolbar}>
            <label className={styles.field}>
              <span>Search product name or category</span>
              <input
                id="product-search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search curtains, bedroom, sofa..."
              />
            </label>
            <label className={styles.field}>
              <span>Sort</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price low to high</option>
                <option value="price-high">Price high to low</option>
                <option value="az">Alphabetical</option>
              </select>
            </label>
          </div>

          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              {categories.map((category) => (
                <button
                  className={`${styles.pill} ${activeCategory === category ? styles.pillActive : ""}`}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <h2>No matching products</h2>
              <p className={styles.muted}>Try another product name or reset the filters to see the full collection.</p>
              <button
                className={styles.primaryPill}
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                }}
                type="button"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className={styles.productGrid}>
              {filtered.map((product) => (
              <article className={styles.productCard} key={product.id}>
                <Link className={styles.productMedia} href={`/products/${product.slug}`}>
                  <img src={product.image} alt={product.name} />
                  <div className={styles.productActions}>
                    <button
                      className={styles.iconPill}
                      type="button"
                      aria-label={`Wishlist ${product.name}`}
                      onClick={(event) => {
                        event.preventDefault();
                        if (isInWishlist(product.id)) removeFromWishlist(product.id);
                        else addToWishlist({ ...product, color: product.category });
                      }}
                    >
                      <Heart size={17} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                    </button>
                    <button
                      className={styles.iconPill}
                      type="button"
                      aria-label={`Add ${product.name} to cart`}
                      onClick={(event) => {
                        event.preventDefault();
                        addToCart({ ...product, quantity: 1, color: product.category });
                      }}
                    >
                      <ShoppingBag size={17} />
                    </button>
                  </div>
                  <div className={styles.productOverlay}>
                    <span>{formatPrice(product.price)}</span>
                    <small>{product.category === "Curtains" ? "Choose colour" : "View Details"}</small>
                  </div>
                </Link>
                <div className={styles.productInfo}>
                  <span>{product.category}</span>
                  <strong>{product.name}</strong>
                </div>
              </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
