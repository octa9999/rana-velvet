import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("checkout advertises the 70/30 advance cash option for orders over Rs. 20,000", () => {
  const checkout = read("src/app/checkout/page.tsx");
  assert.match(checkout, /Advance Cash \(70%\)/);
  assert.match(checkout, /subtotal > 20000/);
});

test("cart presents recommended products after an item is added", () => {
  const cart = read("src/app/cart/page.tsx");
  assert.match(cart, /Recommended For Your Room/);
});

test("primary navigation keeps Home as a direct link and lists Ready-Made Curtains under Shop", () => {
  const header = read("src/components/layout/Header.tsx");
  assert.match(header, /isDirect/);
  assert.match(header, /Ready-Made Curtains/);
  assert.doesNotMatch(header, /Curtains & Fabrics/);
});

test("custom curtain requests ask for pieces and accessories instead of windows", () => {
  const curtains = read("src/app/customize-curtain/page.tsx");
  assert.match(curtains, /Accessories Required/);
  assert.doesNotMatch(curtains, /Pieces\/windows/);
});

test("the supplied Rana Velvet logo is used across the storefront and as the app icon", () => {
  const header = read("src/components/layout/Header.tsx");
  const demoHome = read("src/components/demohome/DemoHomePage.tsx");
  const footer = read("src/components/layout/Footer.tsx");
  assert.match(header, /rana-velvet-logo\.png/);
  assert.match(demoHome, /rana-velvet-logo\.png/);
  assert.match(footer, /rana-velvet-logo\.png/);
  assert.ok(existsSync(new URL("../src/app/icon.png", import.meta.url)));
});

test("footer always directs visitors to the approved Google Maps location", () => {
  const footer = read("src/components/layout/Footer.tsx");
  assert.match(footer, /showroomMapUrl/);
  assert.doesNotMatch(footer, /settings\.showroom_address/);
});
