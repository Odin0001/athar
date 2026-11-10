-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Requires schema.sql to have been run first (it creates public.is_admin()).

-- ---------- Client logos for the home page carousel ----------
create table if not exists public.logos (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.logos enable row level security;

drop policy if exists "Public can read logos" on public.logos;
create policy "Public can read logos"
  on public.logos for select
  using (true);

drop policy if exists "Admins can insert logos" on public.logos;
create policy "Admins can insert logos"
  on public.logos for insert
  with check (public.is_admin());

drop policy if exists "Admins can update logos" on public.logos;
create policy "Admins can update logos"
  on public.logos for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete logos" on public.logos;
create policy "Admins can delete logos"
  on public.logos for delete
  using (public.is_admin());

-- ---------- Storage bucket for logo images ----------
insert into storage.buckets (id, name, public)
values ('logos', 'logos', true)
on conflict (id) do nothing;

drop policy if exists "Admins can upload logos" on storage.objects;
create policy "Admins can upload logos"
  on storage.objects for insert
  with check (bucket_id = 'logos' and public.is_admin());

drop policy if exists "Admins can delete logos" on storage.objects;
create policy "Admins can delete logos"
  on storage.objects for delete
  using (bucket_id = 'logos' and public.is_admin());
