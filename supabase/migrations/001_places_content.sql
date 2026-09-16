-- Migration 001: Places content tables
-- Run in Supabase SQL Editor BEFORE enabling VITE_PLACES_SOURCE=supabase
-- Safe to run multiple times (uses IF NOT EXISTS / CREATE OR REPLACE).

-- ─────────────────────────────────────────────────────────────────────────────
-- PLACES  (content master — seeded from local JS files)
-- ─────────────────────────────────────────────────────────────────────────────
-- Columns mirror src/data/places/*.js shape.
-- snake_case ↔ camelCase translation lives in placeService.js (dbRowToPlace).

create table if not exists places (
  id               text primary key,             -- e.g. 'tokyo-sensoji'
  slug             text not null,                -- e.g. 'sensoji-temple'
  name             text not null,
  city             text not null,                -- 'Tokyo' | 'Kyoto' | ...
  region           text,
  country          text not null default 'Japan',
  category         text not null,                -- landmark|shrine|temple|food|sports|...
  description      text,
  coordinates      jsonb,                        -- { "lat": 35.71, "lng": 139.79 }
  opening_hours    text,
  estimated_cost   integer default 0,            -- JPY; 0 = free
  booking_required boolean default false,
  maps_url         text,
  website          text,
  image_url        text,                         -- canonical thumbnail
  priority         text default 'optional',      -- must | high | optional
  trip_day         integer,                      -- null = not on itinerary
  tags             text[] default '{}',
  source_id        text,                         -- links basketball.js / cars.js entries
  trip_id          text default 'japan2027',     -- World Tour: 'japan2027'|'korea2029'|...
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- Places are shared content — all authenticated users can read.
-- Writes happen via service_role key (seed script or Supabase dashboard).
alter table places enable row level security;

drop policy if exists "places_read" on places;
create policy "places_read" on places
  for select using (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────────────────────
-- PLACE IMAGES  (ordered gallery per place)
-- ─────────────────────────────────────────────────────────────────────────────
-- In the local JS files images are an array on each place object.
-- This table normalises them for Supabase so they can be managed independently.

create table if not exists place_images (
  id          bigserial primary key,
  place_id    text references places(id) on delete cascade not null,
  url         text not null,
  sort_order  integer default 0,
  created_at  timestamptz default now()
);

alter table place_images enable row level security;

drop policy if exists "place_images_read" on place_images;
create policy "place_images_read" on place_images
  for select using (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────────────────────
-- AUTO-UPDATE updated_at
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists places_updated_at on places;
create trigger places_updated_at
  before update on places
  for each row execute function update_updated_at();
