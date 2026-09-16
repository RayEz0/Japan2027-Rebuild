-- Migration 002: Rename place_status columns to match places content layer
--
-- place_key     → place_id   (was legacy "day_pi" format; now always a place DB id since Phase 8D)
-- want_to_visit → want       (shorter, matches placeService spec)
--
-- Run AFTER migration 001. Safe to run multiple times (guarded by column existence checks).
-- Update the hook (usePlaceStatus.js) and placeService.js BEFORE running this migration
-- so the app works correctly both before and after it is applied.

do $$
begin

  -- Rename place_key → place_id
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name   = 'place_status'
      and column_name  = 'place_key'
  ) then
    alter table place_status rename column place_key to place_id;
    raise notice 'Renamed place_status.place_key → place_id';
  else
    raise notice 'place_status.place_key not found — already renamed or migration already applied';
  end if;

  -- Rename want_to_visit → want
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name   = 'place_status'
      and column_name  = 'want_to_visit'
  ) then
    alter table place_status rename column want_to_visit to want;
    raise notice 'Renamed place_status.want_to_visit → want';
  else
    raise notice 'place_status.want_to_visit not found — already renamed or migration already applied';
  end if;

end $$;

-- ─────────────────────────────────────────────────────────────────────────────
-- DEFERRED: FK constraint place_status.place_id → places.id
-- ─────────────────────────────────────────────────────────────────────────────
-- Add this only AFTER all 70 local places have been seeded to the places table.
-- Run validate constraint separately to avoid a full table scan at migration time.
--
-- alter table place_status
--   add constraint place_status_place_fk
--   foreign key (place_id) references places(id)
--   not valid;
--
-- alter table place_status
--   validate constraint place_status_place_fk;
