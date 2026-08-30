"use client";

import Link from "next/link";
import { showroomMapUrl } from "@/lib/storefront";
import styles from "@/components/demohome/DemoHomePage.module.css";

export function HomeFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInfo}>
        <p>
          We are dedicated to offering discerning clientele a curated
          selection of furniture that embodies timeless elegance.
        </p>
        <p>Talk To Us Through The Contact Form.</p>
        <p><a className={styles.footerMapLink} href={showroomMapUrl} target="_blank" rel="noreferrer">Get Directions On Google Maps</a></p>
      </div>
      <strong>Rana Velvet</strong>
      <div className={styles.footerLinks}>
        <div className={styles.socialLinks} aria-label="Social links">
          <Link href="/" aria-label="Instagram">IG</Link>
          <Link href="/" aria-label="Facebook">FB</Link>
          <Link href="/" aria-label="LinkedIn">IN</Link>
        </div>
      </div>
    </footer>
  );
}
