"use client";

/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Banknote, Check, CreditCard, Store, Truck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import styles from "@/styles/ecommerce.module.css";

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank_transfer">("cod");
  const [deliveryPreference, setDeliveryPreference] = useState<"standard" | "pickup" | "confirm">("confirm");
  const [acceptedConfirmation, setAcceptedConfirmation] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "Faisalabad",
    province: "punjab",
    postalCode: "",
    notes: "",
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 50000 || subtotal === 0 ? 0 : 2500;
  const total = subtotal + deliveryFee;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handlePlaceOrder = async () => {
    if (!acceptedConfirmation) {
      setError("Please accept the confirmation note before submitting.");
      return;
    }
    setPlacing(true);
    setError("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            ...formData,
            email: formData.email || "no-email@ranavelvet.local",
            lastName: formData.lastName || "-",
            address: deliveryPreference === "pickup" ? "Store pickup" : formData.address,
          },
          paymentMethod,
          items: items.map((item) => ({
            productId: item.id,
            name: item.name,
            slug: item.slug,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            color: `${item.color} | Delivery: ${deliveryPreference} | Notes: ${formData.notes || "None"}`,
          })),
          deliveryFee,
          subtotal,
          total,
        }),
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Order could not be placed");

      window.localStorage.setItem("rana-velvet-last-order", JSON.stringify(payload.order));
      clearCart();
      router.push(`/order-confirmation?order=${encodeURIComponent(payload.order.order_number)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Order could not be placed");
      setPlacing(false);
    }
  };

  return (
    <div className={styles.shell}>
      <Header />
      <main>
        <section className={`${styles.hero} ${styles.heroCompact}`}>
          <span className={styles.heroKicker}>Secure checkout</span>
          <h1 className={styles.displayTitle}>checkout</h1>
          <p className={styles.heroCopy}>
            Confirm your delivery details and choose the payment method that suits your order.
          </p>
        </section>

        <section className={styles.paperSection}>
          <div className={styles.contentGrid}>
            <div className={styles.formCard}>
              <div className={styles.choiceRow} style={{ marginBottom: 28 }}>
                <button className={`${styles.secondaryPill} ${step === 1 ? styles.primaryPill : ""}`} onClick={() => setStep(1)} type="button">
                  {step > 1 ? <Check size={15} /> : "01"} Shipping
                </button>
                <button className={`${styles.secondaryPill} ${step === 2 ? styles.primaryPill : ""}`} onClick={() => setStep(2)} disabled={items.length === 0} type="button">
                  02 Payment
                </button>
              </div>

              {step === 1 ? (
                <>
                  <h2>contact and delivery</h2>
                  <div className={styles.formGrid} style={{ marginTop: 26 }}>
                    {[
                      ["firstName", "Full Name", "Your full name"],
                      ["email", "Email optional", "you@example.com"],
                      ["phone", "Phone or WhatsApp", "Phone number"],
                    ].map(([name, label, placeholder]) => (
                      <label className={styles.field} key={name}>
                        <span>{label}</span>
                        <input name={name} value={formData[name as keyof typeof formData]} onChange={handleInputChange} placeholder={placeholder} />
                      </label>
                    ))}
                    <label className={`${styles.field} ${styles.wide}`}>
                      <span>Delivery Address</span>
                      <input name="address" value={formData.address} onChange={handleInputChange} placeholder="Complete address unless store pickup" />
                    </label>
                    <label className={styles.field}>
                      <span>Delivery choice</span>
                      <select value={deliveryPreference} onChange={(event) => setDeliveryPreference(event.target.value as typeof deliveryPreference)}>
                        <option value="standard">Standard delivery</option>
                        <option value="pickup">Store pickup</option>
                        <option value="confirm">Confirm with me first</option>
                      </select>
                    </label>
                    <label className={styles.field}>
                      <span>City</span>
                      <input name="city" value={formData.city} onChange={handleInputChange} />
                    </label>
                    <label className={styles.field}>
                      <span>Postal code</span>
                      <input name="postalCode" value={formData.postalCode} onChange={handleInputChange} />
                    </label>
                    <label className={styles.field}>
                      <span>Province</span>
                      <select name="province" value={formData.province} onChange={handleInputChange}>
                        <option value="punjab">Punjab</option>
                        <option value="sindh">Sindh</option>
                        <option value="kpk">Khyber Pakhtunkhwa</option>
                        <option value="balochistan">Balochistan</option>
                        <option value="islamabad">Islamabad</option>
                      </select>
                    </label>
                    <label className={`${styles.field} ${styles.wide}`}>
                      <span>Order notes</span>
                      <input name="notes" value={formData.notes} onChange={handleInputChange} placeholder="Optional delivery, stock, or timing notes" />
                    </label>
                  </div>
                  <button className={styles.primaryPill} onClick={() => setStep(2)} disabled={items.length === 0} style={{ marginTop: 24 }} type="button">
                    Continue to payment <ArrowRight size={15} />
                  </button>
                </>
              ) : (
                <>
                  <button className={styles.secondaryPill} onClick={() => setStep(1)} type="button">
                    <ArrowLeft size={15} /> Edit shipping
                  </button>
                  <h2 style={{ marginTop: 24 }}>payment method</h2>
                  <div className={styles.methodGrid} style={{ marginTop: 24 }}>
                    {[
                      { key: "cod", label: "Cash on delivery or confirmation", icon: Banknote, body: "The team confirms stock, timing, and payment before dispatch." },
                      { key: "bank_transfer", label: "Bank transfer or deposit after quotation", icon: CreditCard, body: "Use for bank transfer, quotation deposits, and custom order confirmation." },
                    ].map((method) => {
                      const Icon = method.icon;
                      const active = paymentMethod === method.key;
                      return (
                        <button
                          className={`${styles.method} ${active ? styles.methodActive : ""}`}
                          key={method.key}
                          onClick={() => setPaymentMethod(method.key as "cod" | "bank_transfer")}
                          type="button"
                        >
                          <Icon size={24} />
                          <h3>{method.label}</h3>
                          <p>{method.body}</p>
                        </button>
                      );
                    })}
                  </div>
                  <label className={styles.checkField} style={{ marginTop: 18 }}>
                    <input
                      checked={acceptedConfirmation}
                      onChange={(event) => setAcceptedConfirmation(event.target.checked)}
                      type="checkbox"
                    />
                    <span>
                      I understand that large, custom, or furniture orders need final confirmation of stock, timing, delivery, and payment before they are fully confirmed.
                    </span>
                  </label>
                  <button className={styles.primaryPill} onClick={handlePlaceOrder} disabled={placing || items.length === 0} style={{ marginTop: 24, width: "100%" }} type="button">
                    {placing ? "Submitting..." : `Place Order Request - ${formatPrice(total)}`}
                  </button>
                  {error && <p style={{ color: "#9f1d1d", marginTop: 14 }}>{error}</p>}
                </>
              )}
            </div>

            <aside className={styles.summaryCard}>
              <h2>order summary</h2>
              <div className={styles.summaryRows}>
                <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
                <div><span>Delivery</span><strong>{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</strong></div>
                <div className={styles.totalRow}><span>Total</span><strong>{formatPrice(total)}</strong></div>
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {items.length === 0 ? (
                  <p className={styles.muted}>Your cart is empty.</p>
                ) : (
                  items.map((item) => (
                    <div className={styles.drawerItem} key={`${item.id}-${item.color}`}>
                      <img src={item.image} alt={item.name} />
                      <div>
                        <strong>{item.name}</strong>
                        <p className={styles.muted}>{item.color} - Qty {item.quantity}</p>
                        <p>{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className={styles.card} style={{ marginTop: 18, display: "flex", gap: 14, alignItems: "center" }}>
                {deliveryPreference === "pickup" ? <Store size={20} /> : <Truck size={20} />}
                <span>Order status after submission: Pending Confirmation. The team will confirm stock, delivery, production time, and payment.</span>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
