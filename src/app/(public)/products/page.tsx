"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { isOutOfStock } from "@/lib/product-availability";
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
  stock?: number;
  reserved?: number;
  stockStatus?: "in_stock" | "out_of_stock" | "low_stock";
};

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

function matchesCategory(product: ProductCard, category: string) {
  if (category === "All") return true;

  const primaryCategory = product.category.toLowerCase();
  const subcategory = product.subcategory?.toLowerCase() || "";
  const target = category.toLowerCase();

  if (target === "sofas") return primaryCategory.includes("sofa") || primaryCategory.includes("seating");
  if (target === "curtains") return primaryCategory.includes("curtain") || subcategory.includes("curtain");

  return primaryCategory === target;
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState<ProductCard[]>([]);
  const [isCatalogLoading, setIsCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState(false);
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetch("/api/catalog/products")
      .then((response) => {
        if (!response.ok) throw new Error("Catalog request failed");
        return response.json();
      })
      .then((payload) => {
        setProducts(Array.isArray(payload.products) ? payload.products : []);
      })
      .catch(() => setCatalogError(true))
      .finally(() => setIsCatalogLoading(false));
  }, []);

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get("category");
    if (category) setActiveCategory(category);
    if (new URLSearchParams(window.location.search).get("search")) {
      window.setTimeout(() => document.getElementById("product-search")?.focus(), 100);
    }
  }, []);

  const categories = ["All", "Bedroom", "Sofas", "Living Room", "Curtains", ...Array.from(new Set(products.map((product) => product.category === "Curtain" ? "Curtains" : product.category).filter(Boolean)))].filter(
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

          {isCatalogLoading ? (
            <div className={styles.emptyState}>
              <p className={styles.muted}>Loading the collection...</p>
            </div>
          ) : catalogError ? (
            <div className={styles.emptyState}>
              <h2>Collection unavailable</h2>
              <p className={styles.muted}>Please refresh the page to load the current collection.</p>
            </div>
          ) : filtered.length === 0 ? (
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
                {(() => {
                  const outOfStock = isOutOfStock(product);
                  return <>
                <Link className={styles.productMedia} href={`/products/${product.slug}`}>
                  <img src={product.image} alt={product.name} />
                  {outOfStock && <span className={styles.stockBadge}>Out of stock</span>}
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
                      disabled={outOfStock}
                      onClick={(event) => {
                        event.preventDefault();
                        if (outOfStock) return;
                        addToCart({ ...product, quantity: 1, color: product.category });
                      }}
                    >
                      <ShoppingBag size={17} />
                    </button>
                  </div>
                  <div className={styles.productOverlay}>
                    <span>{formatPrice(product.price)}</span>
                    <small>{outOfStock ? "Out of stock" : product.category === "Curtains" ? "Choose colour" : "View details"}</small>
                  </div>
                </Link>
                <div className={styles.productInfo}>
                  <span>{product.category}</span>
                  <strong>{product.name}</strong>
                </div>
                  </>;
                })()}
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
