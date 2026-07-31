"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { readyMadeCurtains, whatsappHref } from "@/lib/storefront";
import styles from "@/styles/ecommerce.module.css";

type ProductDetail = {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  details: string[];
  dimensions: { width: string; depth: string; height: string };
  weight: string;
  colors: string[];
};

const seedProducts: ProductDetail[] = [
  ...readyMadeCurtains.map((product) => ({
    ...product,
    shortDescription: `${product.included}; ready-made premium velvet curtain for finished rooms.`,
    images: [product.image, "/demohome-zenspace/curtains-hero-room.png"],
    details: [
      product.included,
      "50 x 90 inches per piece",
      "Premium Velvet, 350 GSM",
      "Eyelet / Grommet Header",
      "Machine washable and dry-clean safe",
    ],
    dimensions: { width: "50 inches", depth: "1 piece", height: "90 inches" },
    weight: "350 GSM premium velvet",
    colors: product.colors,
  })),
  {
    id: "1",
    name: "Velvet Royale Bed",
    slug: "velvet-royale-bed",
    price: 89999,
    category: "Bedroom",
    description: "Luxurious velvet upholstered bed with premium frame",
    shortDescription: "A composed bedroom statement with soft upholstery, generous proportion, and a made-for-home finish.",
    image: "/demohome-zenspace/bedroom.jpg",
    images: ["/demohome-zenspace/bedroom.jpg", "/demohome-zenspace/hero.png"],
    details: ["Premium upholstery with high-density cushioning", "Solid wood frame with reinforced joints", "Custom fabric and finish options available", "Delivery and placement support available"],
    dimensions: { width: "180cm", depth: "200cm", height: "120cm" },
    weight: "85kg",
    colors: ["Royal Navy", "Emerald", "Burgundy", "Charcoal"],
  },
  {
    id: "2",
    name: "Cloud Comfort Sofa",
    slug: "cloud-comfort-sofa",
    price: 129999,
    category: "Living Room",
    description: "3-seater plush sofa in premium velvet fabric",
    shortDescription: "A low, soft living-room anchor built around comfort, restraint, and rich upholstery.",
    image: "/demohome-zenspace/living-room.jpg",
    images: ["/demohome-zenspace/living-room.jpg", "/demohome-zenspace/talk-sofa.png"],
    details: ["High-resilience foam cushions", "Kiln-dried hardwood frame", "Stain-resistant premium velvet", "Removable cushion covers"],
    dimensions: { width: "220cm", depth: "95cm", height: "85cm" },
    weight: "65kg",
    colors: ["Ivory", "Sage", "Dusty Rose", "Charcoal"],
  },
  {
    id: "3",
    name: "Elite Ottoman",
    slug: "elite-ottoman",
    price: 34999,
    category: "Seating",
    description: "Multi-functional ottoman with storage space",
    shortDescription: "A compact accent piece for seating, storage, and styling.",
    image: "/demohome-zenspace/seating.jpg",
    images: ["/demohome-zenspace/seating.jpg", "/demohome-zenspace/black-studio-chair.jpg"],
    details: ["Hidden storage compartment", "Premium upholstered top", "Solid wood base", "Available in custom sizes"],
    dimensions: { width: "90cm", depth: "90cm", height: "45cm" },
    weight: "25kg",
    colors: ["Navy", "Emerald", "Burgundy"],
  },
];

function fallbackProduct(slug: string): ProductDetail {
  return seedProducts.find((product) => product.slug === slug) || seedProducts[0];
}

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<ProductDetail>(fallbackProduct(slug));
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetch(`/api/catalog/products/${encodeURIComponent(slug)}`)
      .then((response) => response.json())
      .then((payload) => {
        if (payload.product) setProduct(payload.product);
      })
      .catch(() => setProduct(fallbackProduct(slug)));
  }, [slug]);

  const color = product.colors[selectedColor] || product.colors[0] || product.category;

  const addCurrentToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      category: product.category,
      image: product.image,
      quantity,
      color,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className={styles.shell}>
      <Header />
      <main>
        <section className={styles.paperSection}>
          <Link className={styles.secondaryPill} href="/products">
            <ArrowLeft size={15} />
            Back to collection
          </Link>

          <div className={styles.detailGrid} style={{ marginTop: 34 }}>
            <div className={styles.gallery}>
              <img className={styles.mainImage} src={product.images[selectedImage] || product.image} alt={product.name} />
              <div className={styles.thumbs}>
                {(product.images.length ? product.images : [product.image]).map((image, index) => (
                  <button
                    className={styles.thumbButton}
                    key={image}
                    onClick={() => setSelectedImage(index)}
                    type="button"
                    aria-label={`View ${product.name} image ${index + 1}`}
                  >
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.detailPanel}>
              <span className={styles.heroKicker}>{product.category}</span>
              <h1 className={styles.detailTitle}>{product.name}</h1>
              <p className={styles.heroCopy} style={{ margin: 0, textAlign: "left" }}>{product.shortDescription || product.description}</p>
              <div className={styles.price}>{formatPrice(product.price)}</div>
              <p className={styles.muted}>
                Availability: In stock or pending final team confirmation. Delivery/production timing will be confirmed after order review.
              </p>

              <div>
                <span className={styles.heroKicker}>{product.category === "Curtains" ? "Colour" : "Finish"}</span>
                <div className={styles.choiceRow}>
                  {product.colors.map((item, index) => (
                    <button
                      className={`${styles.secondaryPill} ${selectedColor === index ? styles.primaryPill : ""}`}
                      key={item}
                      onClick={() => setSelectedColor(index)}
                      type="button"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.quantity}>
                <button onClick={() => setQuantity((current) => Math.max(1, current - 1))} type="button" aria-label="Decrease quantity"><Minus size={14} /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((current) => current + 1)} type="button" aria-label="Increase quantity"><Plus size={14} /></button>
              </div>

              <div className={styles.choiceRow}>
                <button className={styles.primaryPill} onClick={addCurrentToCart} type="button">
                  {added ? <Check size={16} /> : <ShoppingBag size={16} />}
                  {added ? "Added" : "Add to Cart"}
                </button>
                <button
                  className={styles.secondaryPill}
                  onClick={() => {
                    if (isInWishlist(product.id)) removeFromWishlist(product.id);
                    else addToWishlist({ id: product.id, name: product.name, slug: product.slug, price: product.price, category: product.category, image: product.image, color });
                  }}
                  type="button"
                >
                  <Heart size={16} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                  Wishlist
                </button>
                <Link className={styles.secondaryPill} href="/checkout">
                  Buy Now <ArrowRight size={15} />
                </Link>
                <Link className={styles.whatsappButton} href={whatsappHref(`Hi Rana Velvet, I want to ask about ${product.name}.`)}>
                  Ask on WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.darkBand}>
          <div className={styles.darkCards}>
            <article className={styles.darkCard}>
              <h2>Details</h2>
              <ul>
                {product.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
            <article className={styles.darkCard}>
              <h2>Dimensions</h2>
              <p>Width: {product.dimensions.width}</p>
              <p>Depth: {product.dimensions.depth}</p>
              <p>Height: {product.dimensions.height}</p>
              <p>Weight: {product.weight}</p>
              <p>{product.category === "Curtains" ? "Ready-made curtains use Add to Cart. Made-to-measure orders should use Customize Your Curtain." : "Large or custom furniture orders require final confirmation before production or dispatch."}</p>
            </article>
          </div>
        </section>

        <section className={styles.paperSection}>
          <div className={styles.sectionHead} style={{ color: "var(--ink)" }}>
            <p className={styles.muted}>Explore related products from the same room or category.</p>
            <h2>Related</h2>
            <Link className={styles.secondaryPill} href="/products">
              Back to Shop <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
