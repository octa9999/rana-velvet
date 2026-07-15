"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { officialContactNote } from "@/lib/storefront";
import styles from "@/styles/ecommerce.module.css";

export function Footer() {
  const [settings, setSettings] = useState({
    business_name: "Rana Velvet",
    showroom_address: "",
    business_phone: "",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((response) => response.json())
      .then((payload) => setSettings((current) => ({ ...current, ...(payload.settings || {}) })))
      .catch(() => null);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTitle}>{settings.business_name}</div>
      <div className={styles.footerGrid}>
        <div>
          <strong>Store details</strong>
          <p className={styles.muted}>{settings.showroom_address || officialContactNote}</p>
          {settings.business_phone && <p className={styles.muted}>{settings.business_phone}</p>}
        </div>
        <div className={styles.footerLinks}>
          <Link className={styles.secondaryPill} href="/products">Shop</Link>
          <Link className={styles.secondaryPill} href="/customize-curtain">Customize Curtain</Link>
          <Link className={styles.secondaryPill} href="/custom-furniture">Custom Furniture</Link>
          <Link className={styles.secondaryPill} href="/consultation">Consultation</Link>
          <Link className={styles.secondaryPill} href="/contact">Contact</Link>
          <Link className={styles.secondaryPill} href="/shipping">Shipping</Link>
          <Link className={styles.secondaryPill} href="/returns">Returns</Link>
          <Link className={styles.secondaryPill} href="/privacy">Privacy</Link>
          <Link className={styles.secondaryPill} href="/terms">Terms</Link>
        </div>
        <Link className={styles.primaryPill} href="/contact">
          <span>Talk With Us</span>
          <ArrowRight size={15} />
        </Link>
      </div>
      <div className={styles.footerGrid} style={{ marginTop: 20 }}>
        <p className={styles.muted}>© 2026 {settings.business_name} Furniture. All rights reserved.</p>
        <p className={styles.muted}>Luxury furniture, curtains, fabrics, custom interiors, and partner support.</p>
        <Link className={styles.secondaryPill} href="/partners">Interior Designer Partners</Link>
      </div>
    </footer>
  );
}
