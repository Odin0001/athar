-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

-- ---------- Admins allow-list ----------
-- Only users listed here can create / edit / delete case studies and upload images.
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ---------- Case studies ----------
create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_ar text not null,
  summary_en text not null,
  summary_ar text not null,
  content_en text not null default '',
  content_ar text not null default '',
  cover_image text not null,
  gallery text[] not null default '{}',
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.case_studies enable row level security;

drop policy if exists "Public can read published case studies" on public.case_studies;
create policy "Public can read published case studies"
  on public.case_studies for select
  using (published or public.is_admin());

drop policy if exists "Admins can insert case studies" on public.case_studies;
create policy "Admins can insert case studies"
  on public.case_studies for insert
  with check (public.is_admin());

drop policy if exists "Admins can update case studies" on public.case_studies;
create policy "Admins can update case studies"
  on public.case_studies for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete case studies" on public.case_studies;
create policy "Admins can delete case studies"
  on public.case_studies for delete
  using (public.is_admin());

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists case_studies_updated_at on public.case_studies;
create trigger case_studies_updated_at
  before update on public.case_studies
  for each row execute function public.set_updated_at();

-- ---------- Storage bucket for images ----------
insert into storage.buckets (id, name, public)
values ('case-studies', 'case-studies', true)
on conflict (id) do nothing;

drop policy if exists "Admins can upload case study images" on storage.objects;
create policy "Admins can upload case study images"
  on storage.objects for insert
  with check (bucket_id = 'case-studies' and public.is_admin());

drop policy if exists "Admins can update case study images" on storage.objects;
create policy "Admins can update case study images"
  on storage.objects for update
  using (bucket_id = 'case-studies' and public.is_admin());

drop policy if exists "Admins can delete case study images" on storage.objects;
create policy "Admins can delete case study images"
  on storage.objects for delete
  using (bucket_id = 'case-studies' and public.is_admin());

-- ---------- Make yourself an admin ----------
-- 1. Authentication -> Users -> Add user (email + password, tick "Auto Confirm User").
-- 2. Replace the email below with that user's email and run this line:
-- insert into public.admins (user_id) select id from auth.users where email = 'you@example.com';
