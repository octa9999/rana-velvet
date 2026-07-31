-- Rana Velvet remaining catalog + ecommerce setup
-- Run after categories, orders, and admin_users already exist.

create extension if not exists "uuid-ossp";

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  short_description text,
  price numeric(12,2) not null default 0,
  sku text,
  stock_quantity integer not null default 0,
  stock integer not null default 0,
  reserved_stock integer not null default 0,
  stock_status text not null default 'in_stock',
  category_id uuid references public.categories(id) on delete set null,
  category_name text,
  subcategory text,
  material text,
  color text,
  colors text[] not null default '{}',
  materials text[] not null default '{}',
  tags text[] not null default '{}',
  details text[] not null default '{}',
  dimensions jsonb not null default '{}',
  width text,
  depth text,
  height text,
  weight text,
  image_url text,
  thumbnail_url text,
  seo_title text,
  seo_description text,
  is_featured boolean not null default false,
  featured boolean not null default false,
  is_active boolean not null default true,
  status text not null default 'active',
  order_index integer not null default 0,
  rating numeric(3,2) not null default 4.8,
  reviews integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete cascade,
  url text not null,
  image_url text,
  alt_text text,
  is_primary boolean not null default false,
  sort_order integer not null default 0,
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.product_variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete cascade,
  name text not null,
  sku text,
  price numeric(12,2) not null default 0,
  stock_quantity integer not null default 0,
  options jsonb not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  sku text,
  quantity integer not null default 1,
  unit_price numeric(12,2) not null default 0,
  selected_variant jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.inventory_movements (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete cascade,
  movement_type text not null check (movement_type in ('stock_in', 'stock_out', 'reserved', 'released', 'adjustment')),
  quantity integer not null,
  reference_type text,
  reference_id uuid,
  note text,
  created_by uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.banners (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  subtitle text,
  link_url text,
  link_text text,
  image text,
  image_url text,
  mobile_image text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  order_index integer not null default 0,
  start_date timestamptz,
  end_date timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  role text,
  content text not null,
  avatar text,
  rating integer not null default 5 check (rating between 1 and 5),
  is_active boolean not null default true,
  sort_order integer not null default 0,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text not null,
  date date not null,
  time text not null,
  service text not null,
  message text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payment_providers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  provider_key text unique not null,
  is_enabled boolean not null default false,
  config jsonb not null default '{}',
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.checkout_settings (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists public.order_print_logs (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders(id) on delete cascade,
  printed_by uuid references public.admin_users(id) on delete set null,
  document_type text not null default 'packing_slip',
  created_at timestamptz not null default now()
);

create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_products_category on public.products(category_id);
create index if not exists idx_product_images_product on public.product_images(product_id);
create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_inventory_movements_product_id on public.inventory_movements(product_id);

alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_variants enable row level security;
alter table public.order_items enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.banners enable row level security;
alter table public.testimonials enable row level security;
alter table public.appointments enable row level security;
alter table public.inquiries enable row level security;
alter table public.payment_providers enable row level security;
alter table public.checkout_settings enable row level security;
alter table public.order_print_logs enable row level security;

drop policy if exists "Public read active products" on public.products;
create policy "Public read active products" on public.products for select using (is_active = true);
drop policy if exists "Public read product images" on public.product_images;
create policy "Public read product images" on public.product_images for select using (true);
drop policy if exists "Public create order items" on public.order_items;
create policy "Public create order items" on public.order_items for insert with check (true);
drop policy if exists "Public read active banners" on public.banners;
create policy "Public read active banners" on public.banners for select using (is_active = true);
drop policy if exists "Public read active testimonials" on public.testimonials;
create policy "Public read active testimonials" on public.testimonials for select using (is_active = true);
drop policy if exists "Public insert appointments" on public.appointments;
create policy "Public insert appointments" on public.appointments for insert with check (true);
drop policy if exists "Public insert inquiries" on public.inquiries;
create policy "Public insert inquiries" on public.inquiries for insert with check (true);

drop policy if exists "Admins manage products" on public.products;
create policy "Admins manage products" on public.products for all
using (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.is_active))
with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.is_active));

drop policy if exists "Admins manage order items" on public.order_items;
create policy "Admins manage order items" on public.order_items for all
using (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.is_active))
with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.is_active));

insert into public.products (name, slug, category_name, subcategory, price, stock_quantity, stock, reserved_stock, status, is_active, is_featured, featured, image_url, sku, material, color, colors, details, dimensions, weight, short_description, description, order_index)
values
  ('Velvet Royale Bed', 'velvet-royale-bed', 'Bedroom', 'Beds', 89999, 12, 12, 2, 'active', true, true, true, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80', 'RV-BED-001', 'Velvet / solid wood', 'Emerald', array['Emerald','Ivory','Charcoal','Champagne'], array['Premium upholstery with high-density cushioning','Solid wood frame with reinforced joints','Made to order finishes available from the showroom'], '{"width":"Custom","depth":"Custom","height":"Custom"}', 'Made to order', 'A composed bedroom statement with soft upholstery and generous proportion.', 'Premium velvet upholstered bed with a reinforced solid wood frame.', 1),
  ('Cloud Comfort Sofa', 'cloud-comfort-sofa', 'Living Room', 'Sofas', 129999, 8, 8, 1, 'active', true, true, true, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80', 'RV-SOF-002', 'Premium velvet', 'Pearl', array['Ivory','Sage','Dusty Rose','Charcoal'], array['High-resilience foam cushions','Kiln-dried hardwood frame','Stain-resistant premium velvet'], '{"width":"Custom","depth":"Custom","height":"Custom"}', 'Made to order', 'A low, soft living-room anchor built around comfort and restraint.', 'Three-seater plush sofa in premium velvet fabric.', 2),
  ('Elite Ottoman', 'elite-ottoman', 'Sofas & Seating', 'Ottomans', 34999, 15, 15, 3, 'active', true, false, false, 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=900&q=80', 'RV-OTT-003', 'Velvet / storage frame', 'Charcoal', array['Navy','Emerald','Burgundy'], array['Hidden storage compartment','Premium upholstered top','Solid wood base'], '{"width":"Custom","depth":"Custom","height":"Custom"}', 'Made to order', 'A compact accent piece for seating, storage, and styling.', 'Multi-functional ottoman with storage space.', 3),
  ('Imperial Curtains', 'imperial-curtains', 'Furnishing Fabric', 'Velvet Curtains', 12999, 30, 30, 5, 'active', true, false, false, 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900&q=80', 'RV-CUR-004', 'Heavy velvet', 'Champagne', array['Champagne','Ivory','Charcoal'], array['Heavy velvet fall','Custom sizing available','Showroom fabric matching'], '{"width":"Custom","depth":"Custom","height":"Custom"}', 'Custom', 'Premium drapery for softened luxury interiors.', 'Premium heavy velvet curtains with elegant drape.', 4)
on conflict (slug) do update set
  name = excluded.name,
  price = excluded.price,
  stock_quantity = excluded.stock_quantity,
  stock = excluded.stock,
  reserved_stock = excluded.reserved_stock,
  is_active = excluded.is_active,
  is_featured = excluded.is_featured,
  featured = excluded.featured,
  image_url = excluded.image_url,
  sku = excluded.sku,
  material = excluded.material,
  color = excluded.color,
  colors = excluded.colors,
  details = excluded.details,
  dimensions = excluded.dimensions,
  weight = excluded.weight,
  short_description = excluded.short_description,
  description = excluded.description,
  order_index = excluded.order_index;

insert into public.product_images (product_id, url, image_url, alt_text, is_primary, sort_order)
select p.id, p.image_url, p.image_url, p.name, true, 0
from public.products p
where p.image_url is not null
  and not exists (select 1 from public.product_images pi where pi.product_id = p.id and pi.url = p.image_url);

insert into public.payment_providers (name, provider_key, is_enabled, config, sort_order)
values
  ('Cash on Delivery', 'cod', true, '{"handling_fee":0}', 1),
  ('Bank Transfer', 'bank_transfer', true, '{"instructions":"Share payment proof on WhatsApp after placing order."}', 2)
on conflict (provider_key) do update set name = excluded.name, is_enabled = excluded.is_enabled, config = excluded.config, sort_order = excluded.sort_order;

insert into public.checkout_settings (key, value)
values
  ('delivery', '{"fee":2500,"free_delivery_threshold":50000}'),
  ('payments', '{"enabled":["cod","bank_transfer"]}')
on conflict (key) do update set value = excluded.value, updated_at = now();

insert into public.site_settings (key, value, type, group_name)
values
  ('business_name', 'Rana Velvet', 'string', 'brand'),
  ('showroom_address', 'Directions available on Google Maps', 'string', 'contact'),
  ('business_phone', '', 'string', 'contact'),
  ('business_email', 'info@ranavelvet.com', 'string', 'contact'),
  ('showroom_hours', 'Monday - Saturday: 10:00 AM - 8:00 PM', 'string', 'contact')
on conflict (key) do update set value = excluded.value, type = excluded.type, group_name = excluded.group_name, updated_at = now();
