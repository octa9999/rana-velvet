-- Product images are uploaded by the server-side admin route and displayed publicly.
-- Keep the bucket public so stored URLs work on storefront product pages.
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do update set public = true;
