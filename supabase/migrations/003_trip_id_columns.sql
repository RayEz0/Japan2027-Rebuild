-- Migration 003: Add trip_id to user-data tables for multi-trip support
--
-- Tables affected:
--   expenses    — add trip_id (no PK change; id is already a unique client UUID)
--   bookings    — add trip_id + PK change: (user_id, item_id) → (user_id, trip_id, item_id)
--   packing     — add trip_id + PK change: (user_id, item_id) → (user_id, trip_id, item_id)
--   photo_log   — add trip_id (no PK change; id is already a unique client UUID)
--
-- Tables NOT affected:
--   savings     — intentionally trip-agnostic (one savings pot, trip-agnostic)
--   place_status— place IDs are globally unique; see migration 004 for optional trip_id
--   places      — already has trip_id since migration 001 ✓
--
-- Safe to run multiple times: each step is guarded by column/constraint existence checks.
-- Run BEFORE deploying code that reads/writes trip_id on these tables.
-- Backward compatible: all new columns default to 'japan2027' so existing rows stay valid.

-- ─────────────────────────────────────────────────────────────────────────────
-- EXPENSES — add trip_id
-- ─────────────────────────────────────────────────────────────────────────────

alter table expenses
  add column if not exists trip_id text not null default 'japan2027';

-- Index for trip-scoped expense queries (dashboard total, export)
create index if not exists idx_expenses_trip
  on expenses (user_id, trip_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- PHOTO LOG — add trip_id
-- ─────────────────────────────────────────────────────────────────────────────

alter table photo_log
  add column if not exists trip_id text not null default 'japan2027';

create index if not exists idx_photo_log_trip
  on photo_log (user_id, trip_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- BOOKINGS — add trip_id + update composite PK
-- ─────────────────────────────────────────────────────────────────────────────
-- The old PK (user_id, item_id) allows only one record per item_id per user.
-- Since 'flights', 'accommodation', 'travel-insurance' etc. appear in all three
-- trip roadmaps, the PK must include trip_id to prevent cross-trip collisions.

do $$
begin

  -- 1. Add trip_id column (idempotent)
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'bookings' and column_name = 'trip_id'
  ) then
    alter table bookings add column trip_id text not null default 'japan2027';
    raise notice 'Added bookings.trip_id';
  else
    raise notice 'bookings.trip_id already exists — skipping column add';
  end if;

  -- 2. Drop old PK if it only covers (user_id, item_id)
  --    New PK will be (user_id, trip_id, item_id).
  --    We detect the old PK by checking it has exactly 2 columns.
  if exists (
    select 1
    from information_schema.table_constraints tc
    join information_schema.key_column_usage kcu
      on tc.constraint_name = kcu.constraint_name
      and tc.table_schema   = kcu.table_schema
    where tc.table_schema   = 'public'
      and tc.table_name     = 'bookings'
      and tc.constraint_type = 'PRIMARY KEY'
      and kcu.column_name NOT IN ('trip_id')
    group by tc.constraint_name
    having count(*) = 2
  ) then
    alter table bookings drop constraint bookings_pkey;
    raise notice 'Dropped old bookings PK (user_id, item_id)';
  end if;

  -- 3. Add new PK if it doesn't exist yet
  if not exists (
    select 1
    from information_schema.table_constraints
    where table_schema = 'public'
      and table_name   = 'bookings'
      and constraint_type = 'PRIMARY KEY'
  ) then
    alter table bookings add primary key (user_id, trip_id, item_id);
    raise notice 'Added new bookings PK (user_id, trip_id, item_id)';
  else
    raise notice 'bookings PK already exists — skipping';
  end if;

end $$;

create index if not exists idx_bookings_trip
  on bookings (user_id, trip_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- PACKING — add trip_id + update composite PK
-- ─────────────────────────────────────────────────────────────────────────────
-- The old PK (user_id, item_id) allows only one record per item_id per user.
-- But item_ids like 'doc_passport', 'tec_phone', 'clo_jacket' are identical
-- across Japan, Scotland, and Norway packing lists — they WILL collide.

do $$
begin

  -- 1. Add trip_id column
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'packing' and column_name = 'trip_id'
  ) then
    alter table packing add column trip_id text not null default 'japan2027';
    raise notice 'Added packing.trip_id';
  else
    raise notice 'packing.trip_id already exists — skipping column add';
  end if;

  -- 2. Drop old PK
  if exists (
    select 1
    from information_schema.table_constraints tc
    join information_schema.key_column_usage kcu
      on tc.constraint_name = kcu.constraint_name
      and tc.table_schema   = kcu.table_schema
    where tc.table_schema   = 'public'
      and tc.table_name     = 'packing'
      and tc.constraint_type = 'PRIMARY KEY'
      and kcu.column_name NOT IN ('trip_id')
    group by tc.constraint_name
    having count(*) = 2
  ) then
    alter table packing drop constraint packing_pkey;
    raise notice 'Dropped old packing PK (user_id, item_id)';
  end if;

  -- 3. Add new PK
  if not exists (
    select 1
    from information_schema.table_constraints
    where table_schema = 'public'
      and table_name   = 'packing'
      and constraint_type = 'PRIMARY KEY'
  ) then
    alter table packing add primary key (user_id, trip_id, item_id);
    raise notice 'Added new packing PK (user_id, trip_id, item_id)';
  else
    raise notice 'packing PK already exists — skipping';
  end if;

end $$;

create index if not exists idx_packing_trip
  on packing (user_id, trip_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- VERIFY
-- ─────────────────────────────────────────────────────────────────────────────
-- Run this after migration to confirm all columns exist:
--
-- select table_name, column_name, column_default
-- from information_schema.columns
-- where table_schema = 'public'
--   and column_name = 'trip_id'
-- order by table_name;
--
-- Expected: expenses, bookings, packing, photo_log, places (5 rows)
