-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Requires schema.sql to have been run first.
-- Replaces "project details" with Challenge / Our approach / Results,
-- and adds YouTube videos, a numbers section and a client quote.

alter table public.case_studies
  add column if not exists challenge_en text not null default '',
  add column if not exists challenge_ar text not null default '',
  add column if not exists approach_en text not null default '',
  add column if not exists approach_ar text not null default '',
  add column if not exists results_en text not null default '',
  add column if not exists results_ar text not null default '',
  -- YouTube links, e.g. https://www.youtube.com/watch?v=...
  add column if not exists videos text[] not null default '{}',
  -- Numbers section: [{ "value": "+250%", "label_en": "...", "label_ar": "..." }]
  add column if not exists stats jsonb not null default '[]',
  add column if not exists quote_en text not null default '',
  add column if not exists quote_ar text not null default '',
  add column if not exists quote_author_en text not null default '',
  add column if not exists quote_author_ar text not null default '',
  add column if not exists quote_role_en text not null default '',
  add column if not exists quote_role_ar text not null default '';

-- Keep any existing "project details" text by moving it into "The challenge"
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'case_studies' and column_name = 'content_en'
  ) then
    update public.case_studies
      set challenge_en = content_en, challenge_ar = content_ar
      where challenge_en = '' and challenge_ar = '';
    alter table public.case_studies drop column content_en, drop column content_ar;
  end if;
end $$;
