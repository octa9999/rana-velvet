"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Copy, MapPin, Package, Phone } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { StoreOrder } from "@/lib/orders";
import { whatsappHref } from "@/lib/storefront";
import styles from "@/styles/ecommerce.module.css";

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<OrderConfirmationShell />}>
      <OrderConfirmationContent />
    </Suspense>
  );
}

function OrderConfirmationShell() {
  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.hero}>
        <p className={styles.heroCopy}>Loading order...</p>
      </main>
      <Footer />
    </div>
  );
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const [order, setOrder] = useState<StoreOrder | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      if (orderNumber) {
        const response = await fetch(`/api/orders/${encodeURIComponent(orderNumber)}`);
        if (response.ok) {
          const payload = await response.json();
          setOrder(payload.order);
          return;
        }
      }

      const fallback = window.localStorage.getItem("rana-velvet-last-order");
      if (fallback) setOrder(JSON.parse(fallback));
      setLoaded(true);
    };

    loadOrder();
  }, [orderNumber]);

  return (
    <div className={styles.shell}>
      <Header />
      <main>
        <section className={styles.hero}>
          <span className={styles.heroKicker}>Order confirmed</span>
          <h1 className={styles.displayTitle}>thank you</h1>
          <p className={styles.heroCopy}>
            {order ? `Thank you${order.customer_name ? `, ${order.customer_name}` : ""}. Your order request has been received.` : loaded ? "No recent order found." : "Loading your order request."}
          </p>
          <div style={{ display: "grid", placeItems: "center", marginTop: 30 }}>
            <span className={styles.primaryPill}>
              <Check size={16} />
              {order ? `Order #${order.order_number}` : loaded ? "No order loaded" : "Processing"}
            </span>
          </div>
        </section>

        <section className={styles.paperSection}>
          {!order && loaded ? (
            <div className={styles.emptyState}>
              <h2>No recent order found</h2>
              <p className={styles.muted}>Open the shop to start a new order request, or contact Rana Velvet if you need help finding a reference.</p>
              <Link className={styles.primaryPill} href="/products">
                Visit Shop <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
          <>
          <div className={styles.confirmGrid}>
            <article className={styles.confirmCard}>
              <Package size={24} />
              <h3 style={{ marginTop: 20 }}>order details</h3>
              <div className={styles.summaryRows}>
                <div><span>Payment</span><strong>{order?.payment_method === "bank_transfer" ? "Bank Transfer" : "Cash on Delivery"}</strong></div>
                <div><span>Status</span><strong>Pending Confirmation</strong></div>
                <div className={styles.totalRow}><span>Total</span><strong>{formatPrice(order?.total || 0)}</strong></div>
              </div>
              {order && (
                <button
                  className={styles.secondaryPill}
                  onClick={() => {
                    navigator.clipboard.writeText(order.order_number);
                    setCopied(true);
                  }}
                  type="button"
                >
                  <Copy size={15} />
                  {copied ? "Copied" : "Copy Reference"}
                </button>
              )}
            </article>

            <article className={styles.confirmCard}>
              <MapPin size={24} />
              <h3 style={{ marginTop: 20 }}>delivery</h3>
              <p className={styles.muted}>{order ? `${order.shipping_address}, ${order.city}` : "Address saved with your order"}</p>
              <p className={styles.muted} style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 18 }}>
                <Phone size={16} /> {order?.customer_phone || "Phone saved with your order"}
              </p>
            </article>

            <article className={styles.confirmCard}>
              <h3>next step</h3>
              <p className={styles.muted}>
                Rana Velvet will confirm stock, delivery, production time, and payment before the order is treated as fully confirmed.
              </p>
              <div className={styles.summaryRows}>
                {(order?.items || []).map((item) => (
                  <div key={item.id}>
                    <span>{item.product_name} x {item.quantity}</span>
                    <strong>{formatPrice(item.total_price)}</strong>
                  </div>
                ))}
                {!order?.items?.length && <p className={styles.muted}>Order items will appear here after Supabase is connected.</p>}
              </div>
            </article>
          </div>

          <div className={styles.choiceRow} style={{ justifyContent: "center", marginTop: 34 }}>
            {order && (
              <Link className={styles.whatsappButton} href={whatsappHref(`Hi Rana Velvet, please confirm my order ${order.order_number} with total ${formatPrice(order.total)}.`)}>
                Confirm on WhatsApp
              </Link>
            )}
            <Link className={styles.primaryPill} href="/products">
              Continue Shopping <ArrowRight size={15} />
            </Link>
            <Link className={styles.secondaryPill} href="/">
              Return Home
            </Link>
          </div>
          </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
