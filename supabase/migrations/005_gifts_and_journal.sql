-- Migration 005: Trip-scoped persistence (Phase 2)
--
-- Part A: Add two Supabase tables that previously had no server-side
--         persistence at all — gifts and journal.
-- Part B: Notes on the accompanying app-layer fix (no SQL needed there).
--
-- Tables NOT touched here, by design:
--   savings — stays intentionally trip-agnostic (one pot across every trip).
--             See schema.sql comment; confirmed as deliberate in Phase 2.
--   expenses / bookings / packing / photo_log / place_status — already have
--             trip_id from migrations 003/004. The bug fixed in Phase 2 was
--             entirely in the app layer: every hook's Supabase query filtered
--             by user_id only (never trip_id), so switching trips pulled
--             every trip's rows into view, and bookings/packing upserted
--             with a stale onConflict target ('user_id,item_id') that no
--             longer matched the real PK ('user_id,trip_id,item_id') added
--             in migration 003. Fixed in src/hooks/*.js — no schema change
--             required for those five tables.
--
-- Safe to run multiple times: every statement is guarded by "if not exists".

-- ─────────────────────────────────────────────────────────────────────────────
-- GIFTS  (trip-scoped: one row per gift per trip per user)
-- id is a client-generated string (Date.now() based); PK includes trip_id so
-- the same numeric id minted on two different trips never collides.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists gifts (
  id          text not null,
  user_id     uuid references auth.users on delete cascade not null,
  trip_id     text not null default 'japan2027',
  name        text default '',
  location    text default '',   -- client field is `where`; `where` is avoided as a column name
  est         numeric(12,2) default 0,
  done        boolean default false,
  updated_at  timestamptz default now(),
  primary key (user_id, trip_id, id)
);
alter table gifts enable row level security;
drop policy if exists "gifts_own" on gifts;
create policy "gifts_own" on gifts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index if not exists idx_gifts_trip on gifts (user_id, trip_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- JOURNAL  (trip_id present per-entry, but reads are NOT trip-filtered)
-- The Journal is intentionally one continuous "memories" log across every
-- trip — the app has always shown all entries together (see TravelJournal,
-- Export, TravelHome), with each entry self-tagging which trip/arc it
-- belongs to. trip_id is stored for that reason (and for future per-trip
-- filtering/export) but user_id is the only isolation boundary enforced
-- by RLS and by the app's queries.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists journal (
  id           text primary key,
  user_id      uuid references auth.users on delete cascade not null,
  trip_id      text not null default 'japan2027',
  arc_year     integer,
  place_id     text default '',
  country      text default '',
  city         text default '',
  entry_date   text default '',
  title        text default '',
  mood         text default '',
  weather      text default '',
  notes        text default '',
  highlights   text[] default '{}',
  companions   text[] default '{}',
  tags         text[] default '{}',
  photos       jsonb default '[]',
  favourite    boolean default false,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);
alter table journal enable row level security;
drop policy if exists "journal_own" on journal;
create policy "journal_own" on journal
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index if not exists idx_journal_user on journal (user_id);
create index if not exists idx_journal_trip on journal (user_id, trip_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- VERIFY
-- ─────────────────────────────────────────────────────────────────────────────
-- select table_name, column_name from information_schema.columns
-- where table_schema = 'public' and table_name in ('gifts', 'journal')
-- order by table_name, ordinal_position;
