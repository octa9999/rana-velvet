-- Run after creating the auth user in Supabase Authentication.
-- Change the email if you use a different admin email.

insert into public.admin_users (user_id, email, name, "role", is_active)
select id, email, 'Rana Admin', 'super_admin', true
from auth.users
where email = 'admin@ranavelvet.com'
on conflict (email) do update set
  user_id = excluded.user_id,
  name = excluded.name,
  "role" = excluded."role",
  is_active = true,
  updated_at = now();
