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

test("the supplied Rana Velvet logo is used in the header and as the app icon", () => {
  const header = read("src/components/layout/Header.tsx");
  const demoHome = read("src/components/demohome/DemoHomePage.tsx");
  assert.match(header, /rana-velvet-logo\.png/);
  assert.match(demoHome, /<Header variant="hero" \/>/);
  assert.ok(existsSync(new URL("../src/app/icon.png", import.meta.url)));
});

test("footer always directs visitors to the approved Google Maps location", () => {
  const footer = read("src/components/layout/HomeFooter.tsx");
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
  assert.match(demoHome, /<HomeFooter\s*\/>/);
});

test("footers remove logo images and center their mobile content", () => {
  const footer = read("src/components/layout/Footer.tsx");
  const demoHome = read("src/components/demohome/DemoHomePage.tsx");
  const storefrontStyles = read("src/styles/ecommerce.module.css");
  const demoStyles = read("src/components/demohome/DemoHomePage.module.css");

  assert.match(footer, /return <HomeFooter\s*\/>/);
  assert.match(demoHome, /<HomeFooter\s*\/>/);
  assert.match(storefrontStyles, /@media \(max-width: 980px\) \{[\s\S]*?\.footerGrid\s*\{[\s\S]*?text-align:\s*center;/);
  assert.match(demoStyles, /@media \(max-width: 900px\) \{[\s\S]*?\.footerInfo p:nth-child\(3\)\s*\{[\s\S]*?text-align:\s*center;/);
});

test("catalog filters match curtain subcategories and do not render empty category chips", () => {
  const products = read("src/app/(public)/products/page.tsx");
  assert.match(products, /subcategory\?:\s*string/);
  assert.match(products, /product\.subcategory/);
  assert.match(products, /products\.some\(\(product\) => matchesCategory\(product, category\)\)/);
});

test("empty Supabase category tables preserve the storefront fallback taxonomy", () => {
  const catalog = read("src/lib/catalog.ts");
  const categoriesFunction = catalog.slice(catalog.indexOf("export async function listCategories"), catalog.indexOf("export async function upsertProduct"));
  assert.match(categoriesFunction, /if \(error \|\| !data\?\.length\) \{/);
  assert.match(categoriesFunction, /return fallbackCategories;/);
});

test("admin product writes keep the editor open and report failed saves or deletes", () => {
  const products = read("src/app/(admin)/admin/products/page.tsx");
  assert.match(products, /id: editing\.id \|\| undefined/);
  assert.match(products, /if \(!response\.ok\) \{[\s\S]*?setNotice\([\s\S]*?return;/);
  assert.match(products, /const response = await fetch\([\s\S]*?method: "DELETE"[\s\S]*?if \(!response\.ok\) \{[\s\S]*?return;/);
});

test("product editor persists the complete customer-facing product information", () => {
  const products = read("src/app/(admin)/admin/products/page.tsx");
  const api = read("src/app/api/admin/products/route.ts");
  const catalog = read("src/lib/catalog.ts");

  assert.match(products, /Product description/);
  assert.match(products, /Picture URLs/);
  assert.match(products, /images: editing\.images\?\.length \? editing\.images : parseImageUrls\(editing\.image\)/);
  assert.match(api, /images: z\.array\(z\.string\(\)\.url\(\)\)\.optional\(\)/);
  assert.match(catalog, /const imageUrls = Array\.from\(new Set\(/);
  assert.match(catalog, /await supabase\.from\("product_images"\)\.delete\(\)\.eq\("product_id", data\.id\)/);
});

test("public product detail shows the saved description and core product specifications", () => {
  const detail = read("src/app/(public)/products/[slug]/page.tsx");
  assert.match(detail, /Product code/);
  assert.match(detail, /Material/);
  assert.match(detail, /Description/);
  assert.match(detail, /product\.description/);
});

test("product editor inputs expose their visible field names to assistive technology", () => {
  const products = read("src/app/(admin)/admin/products/page.tsx");
  assert.match(products, /aria-label=\{label\}/);
  assert.match(products, /aria-label="Product description"/);
  assert.match(products, /aria-label="Picture URLs"/);
});

test("Supabase setup provisions a public products Storage bucket for product image uploads", () => {
  const migration = read("supabase/migrations/20260820073737_ensure_product_image_bucket.sql");
  assert.match(migration, /insert into storage\.buckets/);
  assert.match(migration, /\('products', 'products', true\)/);
});

test("all storefront pages use the shared header, including the home hero", () => {
  const home = read("src/components/demohome/DemoHomePage.tsx");
  const header = read("src/components/layout/Header.tsx");

  assert.match(home, /import \{ Header \} from "@\/components\/layout\/Header"/);
  assert.match(home, /<Header variant="hero" \/>/);
  assert.match(header, /Ready-Made Curtains/);
  assert.doesNotMatch(header, /api\/catalog\/categories/);
});

test("checkout reservations update product availability and the migration clears stale reserved stock", () => {
  const orders = read("src/lib/orders.ts");
  const migration = read("supabase/migrations/20260820075802_reconcile_product_reservations.sql");

  assert.match(orders, /const reservationQuantities = new Map<string, number>\(\)/);
  assert.match(orders, /const nextReserved = Math\.max\(0, Number\(product\.reserved_stock \|\| 0\) \+ quantity\)/);
  assert.match(migration, /inventory_movements/);
  assert.match(migration, /reserved_stock = coalesce\(totals\.reserved_stock, 0\)/);
});

test("product descriptions separate a readable summary from imported labelled specifications", () => {
  const detail = read("src/app/(public)/products/[slug]/page.tsx");

  assert.match(detail, /function splitProductDescription/);
  assert.match(detail, /Dimensions|What's Included|Care Instructions/);
  assert.match(detail, /descriptionContent\.summary/);
  assert.match(detail, /descriptionContent\.specifications\.map/);
});

test("hero dropdowns keep their panel and link text readable against the glass navigation", () => {
  const styles = read("src/styles/ecommerce.module.css");

  assert.match(styles, /\.navHero \.megaPanel\s*\{[\s\S]*?color:\s*var\(--ink\)/);
  assert.match(styles, /\.navHero \.megaLinks a\s*\{[\s\S]*?color:\s*var\(--ink\)/);
});

test("new categories persist with Supabase-generated IDs and appear in the product category selector", () => {
  const categories = read("src/app/(admin)/admin/categories/page.tsx");
  const products = read("src/app/(admin)/admin/products/page.tsx");

  assert.match(categories, /id: editing\.id \|\| undefined/);
  assert.match(categories, /if \(!response\.ok\) \{[\s\S]*?return;/);
  assert.match(categories, /await loadCategories\(\)/);
  assert.match(products, /category\.children\.map/);
  assert.match(products, /cache: "no-store"/);
  assert.match(products, /category_id: selectedCategory\?\.id/);
});
