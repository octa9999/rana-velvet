-- Fix policies for tables that were manually created before the full setup ran.

alter table public.categories enable row level security;
alter table public.orders enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Public read active categories" on public.categories;
create policy "Public read active categories" on public.categories
for select
using (is_active = true);

drop policy if exists "Admins manage categories" on public.categories;
create policy "Admins manage categories" on public.categories
for all
using (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.is_active))
with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.is_active));

drop policy if exists "Admins manage orders" on public.orders;
create policy "Admins manage orders" on public.orders
for all
using (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.is_active))
with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.is_active));

drop policy if exists "Public create orders" on public.orders;
create policy "Public create orders" on public.orders
for insert
with check (true);

drop policy if exists "Admins read admin users" on public.admin_users;
create policy "Admins read admin users" on public.admin_users
for select
using (
  user_id = auth.uid()
  or exists (
    select 1
    from public.admin_users au
    where au.user_id = auth.uid()
      and au."role" = 'super_admin'
      and au.is_active
  )
);
