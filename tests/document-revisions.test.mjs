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

test("cart removal is a compact dedicated action instead of a stretched pill", () => {
  const cart = read("src/app/cart/page.tsx");
  const styles = read("src/styles/ecommerce.module.css");
  assert.match(cart, /styles\.cartRemoveAction/);
  assert.match(styles, /\.cartRemoveAction\s*\{[\s\S]*?align-self:\s*center;[\s\S]*?min-height:\s*42px;[\s\S]*?border-radius:\s*8px;/);
});

test("storefront command buttons use restrained corners", () => {
  const styles = read("src/styles/ecommerce.module.css");
  assert.match(styles, /\.primaryPill,\s*\.secondaryPill\s*\{[\s\S]*?border-radius:\s*8px;/);
});

test("display headings reserve room for descenders before adjacent content", () => {
  const styles = read("src/styles/ecommerce.module.css");
  assert.match(styles, /\.sectionHead\s*\{[\s\S]*?margin:\s*0 auto 32px;/);
  assert.match(styles, /\.principlesHead h2\s*\{[\s\S]*?line-height:\s*1\.02;/);
  assert.match(styles, /\.darkCard h2\s*\{[\s\S]*?line-height:\s*1\.02;/);
});

test("collection toolbar keeps search and sort controls legible on dark backgrounds", () => {
  const styles = read("src/styles/ecommerce.module.css");
  assert.match(styles, /\.darkBand \.field input,\s*\.darkBand \.field select\s*\{[\s\S]*?background:\s*rgba\(255, 255, 255, 0\.08\);[\s\S]*?color:\s*white;/);
  assert.match(styles, /\.darkBand \.field input::placeholder\s*\{[\s\S]*?color:\s*rgba\(255, 255, 255, 0\.68\);/);
});

test("demo studio title keeps its words together as one display line", () => {
  const styles = read("src/components/demohome/DemoHomePage.module.css");
  assert.match(styles, /\.studioTitle\s*\{[^}]*justify-content:\s*flex-start;[^}]*gap:\s*16px;/);
  assert.match(styles, /\.studioTitle h2:last-child\s*\{[^}]*text-align:\s*left;/);
});

test("demo footer omits the category strip while keeping its contact utilities", () => {
  const demoHome = read("src/components/demohome/DemoHomePage.tsx");
  assert.doesNotMatch(demoHome, /Footer categories/);
  assert.match(demoHome, /styles\.socialLinks/);
  assert.match(demoHome, /showroomMapUrl/);
});
