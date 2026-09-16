-- Migration 004: Add trip_id to place_status (optional denormalization)
--
-- place IDs are globally unique across all trips (e.g. 'oslo-opera-house' vs
-- 'tokyo-sensoji') so the existing PK (user_id, place_id) is safe as-is.
-- Adding trip_id as a non-PK column enables:
--   1. Direct trip-scoped queries without joining the places table
--   2. Efficient "show me my Norway wishlist" type queries
--   3. Future per-trip dashboard stats
--
-- The column is nullable — existing rows stay valid without trip_id.
-- New writes from the app should supply trip_id; old writes degrade gracefully.
-- Safe to run multiple times.

alter table place_status
  add column if not exists trip_id text;

-- Back-fill from the places table where a matching place exists
-- (covers all Japan, Scotland, and Norway places seeded in migration 005)
update place_status ps
set trip_id = p.trip_id
from places p
where ps.place_id = p.id
  and ps.trip_id is null;

-- Any remaining rows without a places match stay null (handled as 'japan2027' in app)
-- Set them to the legacy default
update place_status
set trip_id = 'japan2027'
where trip_id is null;

-- Now set not-null default going forward
alter table place_status
  alter column trip_id set default 'japan2027';

create index if not exists idx_place_status_trip
  on place_status (user_id, trip_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- DEFERRED: FK constraint place_status.place_id → places.id
-- ─────────────────────────────────────────────────────────────────────────────
-- Run AFTER migration 005 (places seeded) to enforce referential integrity.
-- Use NOT VALID + VALIDATE pattern to avoid full table scan on busy tables.
--
-- alter table place_status
--   add constraint place_status_place_fk
--   foreign key (place_id) references places(id)
--   not valid;
--
-- alter table place_status
--   validate constraint place_status_place_fk;
