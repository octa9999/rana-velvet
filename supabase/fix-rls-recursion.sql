-- Prevent public catalog reads from evaluating admin policies that reference admin_users.

drop policy if exists "Admins read admin users" on public.admin_users;
create policy "Admins read own admin user" on public.admin_users
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Admins manage products" on public.products;
create policy "Admins manage products" on public.products
for all
to authenticated
using (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.is_active))
with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.is_active));

drop policy if exists "Admins manage categories" on public.categories;
create policy "Admins manage categories" on public.categories
for all
to authenticated
using (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.is_active))
with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.is_active));

drop policy if exists "Admins manage orders" on public.orders;
create policy "Admins manage orders" on public.orders
for all
to authenticated
using (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.is_active))
with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.is_active));

drop policy if exists "Admins manage order items" on public.order_items;
create policy "Admins manage order items" on public.order_items
for all
to authenticated
using (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.is_active))
with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.is_active));
