-- World Tour Travel OS — Supabase Master Schema
-- For a FRESH install: paste this entire file in the Supabase SQL editor.
-- For an EXISTING install: run supabase/migrations/ files in order (001–005).
--
-- All tables use Row Level Security.
-- User-data tables: each user sees only their own rows.
-- Content tables (places, place_images): any authenticated user can read;
--   writes require service_role key (seed script / dashboard only).
--
-- trip_id conventions:
--   'japan2027'  — Japan Nov–Dec 2027
--   'scotland'   — Scotland Oct 2028
--   'norway2028' — Norway Jun 2028
--   (add new trip IDs here as trips are activated)

-- ─────────────────────────────────────────────────────────────────────────────
-- EXPENSES
-- PK: id (client-generated UUID for stable cross-device identity)
-- trip_id: required for multi-trip expense tracking
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists expenses (
  id          text primary key,
  user_id     uuid references auth.users on delete cascade not null,
  trip_id     text not null default 'japan2027',
  day_num     varchar(3),
  city        varchar(50),
  category    varchar(50),
  description text,
  inr         numeric(12,2) default 0,
  jpy         numeric(12,2) default 0,
  created_at  timestamptz default now()
);
alter table expenses enable row level security;
create policy "expenses_own" on expenses
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index if not exists idx_expenses_trip on expenses (user_id, trip_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- BOOKINGS  (trip-scoped: one row per booking item per trip per user)
-- PK changed in migration 003: (user_id, item_id) → (user_id, trip_id, item_id)
-- Reason: 'flights', 'accommodation', 'travel-insurance' exist in all 3 roadmaps
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists bookings (
  user_id     uuid references auth.users on delete cascade not null,
  trip_id     text not null default 'japan2027',
  item_id     text not null,
  done        boolean default false,
  notes       text default '',
  link        text default '',
  confirm_ref text default '',
  updated_at  timestamptz default now(),
  primary key (user_id, trip_id, item_id)
);
alter table bookings enable row level security;
create policy "bookings_own" on bookings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index if not exists idx_bookings_trip on bookings (user_id, trip_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- PLACE STATUS  (one row per place per user)
-- PK: (user_id, place_id) — place IDs are globally unique across all trips
-- trip_id added in migration 004 for efficient trip-scoped queries
-- column names: place_id / want (post-migration 002)
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists place_status (
  user_id    uuid references auth.users on delete cascade not null,
  place_id   text not null,
  trip_id    text default 'japan2027',
  want       boolean default false,
  booked     boolean default false,
  visited    boolean default false,
  notes      text default '',
  priority   varchar(20) default '',
  updated_at timestamptz default now(),
  primary key (user_id, place_id)
);
alter table place_status enable row level security;
create policy "place_status_own" on place_status
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index if not exists idx_place_status_trip on place_status (user_id, trip_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- SAVINGS  (intentionally trip-agnostic — one savings pot for all future trips)
-- PK: (user_id, month_key) e.g. ('Apr2026')
-- No trip_id: savings goal is per-trip in TRIP_META; the amounts here are global
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists savings (
  user_id    uuid references auth.users on delete cascade not null,
  month_key  text not null,
  cash       numeric(12,2) default 0,
  fd         numeric(12,2) default 0,
  mf         numeric(12,2) default 0,
  updated_at timestamptz default now(),
  primary key (user_id, month_key)
);
alter table savings enable row level security;
create policy "savings_own" on savings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- PACKING  (trip-scoped: one row per item per trip per user)
-- PK changed in migration 003: (user_id, item_id) → (user_id, trip_id, item_id)
-- Reason: 'doc_passport', 'tec_phone', 'clo_jacket' appear in all 3 packing lists
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists packing (
  user_id    uuid references auth.users on delete cascade not null,
  trip_id    text not null default 'japan2027',
  item_id    text not null,
  packed     boolean default false,
  updated_at timestamptz default now(),
  primary key (user_id, trip_id, item_id)
);
alter table packing enable row level security;
create policy "packing_own" on packing
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index if not exists idx_packing_trip on packing (user_id, trip_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- PHOTO LOG  (trip-scoped)
-- PK: id (client-generated UUID)
-- trip_id: required — same day_num values (e.g. '05') exist across all trips
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists photo_log (
  id          text primary key,
  user_id     uuid references auth.users on delete cascade not null,
  trip_id     text not null default 'japan2027',
  day_num     varchar(3),
  camera      varchar(50),
  description text,
  favorite    boolean default false,
  tags        text[] default '{}',
  created_at  timestamptz default now()
);
alter table photo_log enable row level security;
create policy "photo_log_own" on photo_log
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index if not exists idx_photo_log_trip on photo_log (user_id, trip_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- GIFTS  (trip-scoped: one row per gift per trip per user; migration 005)
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists gifts (
  id          text not null,
  user_id     uuid references auth.users on delete cascade not null,
  trip_id     text not null default 'japan2027',
  name        text default '',
  location    text default '',
  est         numeric(12,2) default 0,
  done        boolean default false,
  updated_at  timestamptz default now(),
  primary key (user_id, trip_id, id)
);
alter table gifts enable row level security;
create policy "gifts_own" on gifts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index if not exists idx_gifts_trip on gifts (user_id, trip_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- JOURNAL  (trip_id stored per-entry, but reads are user-scoped only —
-- one continuous memories log across every trip; migration 005)
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
create policy "journal_own" on journal
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index if not exists idx_journal_user on journal (user_id);
create index if not exists idx_journal_trip on journal (user_id, trip_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- PLACES  (content master — shared across all users, seeded from local JS files)
-- Writes: service_role only (run supabase/seed/seedPlaces.mjs to populate).
-- Reads:  any authenticated user.
-- Enable VITE_PLACES_SOURCE=supabase in .env.local to activate reads from here.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists places (
  id               text primary key,              -- globally unique: 'tokyo-sensoji', 'oslo-opera-house'
  slug             text not null,                 -- URL segment: 'sensoji-temple'
  name             text not null,
  city             text not null,                 -- 'Tokyo' | 'Oslo' | 'Bergen' | 'Fjords' | ...
  region           text,
  country          text not null default 'Japan', -- 'Japan' | 'Scotland' | 'Norway'
  category         text not null,                 -- landmark|shrine|nature|food|entertainment|...
  description      text,
  coordinates      jsonb,                         -- { "lat": 35.71, "lng": 139.79 }
  opening_hours    text,
  estimated_cost   integer default 0,             -- local currency; 0 = free; null = variable
  booking_required boolean default false,
  maps_url         text,
  website          text,
  image_url        text,
  priority         text default 'optional',       -- must | high | optional
  trip_day         text,                          -- '01'–'13' matching itinerary day num; null = off-itinerary
  tags             text[] default '{}',
  source_id        text,                          -- links basketball.js / cars.js entries
  trip_id          text default 'japan2027',      -- 'japan2027' | 'scotland' | 'norway2028'
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);
alter table places enable row level security;
create policy "places_read" on places
  for select using (auth.role() = 'authenticated');
create index if not exists idx_places_trip on places (trip_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- PLACE IMAGES  (ordered gallery per place — one row per image)
-- Normalises the images[] array from local JS place files.
-- Seeded alongside places by seedPlaces.mjs (when images[] present).
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists place_images (
  id          bigserial primary key,
  place_id    text references places(id) on delete cascade not null,
  url         text not null,
  sort_order  integer default 0,
  created_at  timestamptz default now()
);
alter table place_images enable row level security;
create policy "place_images_read" on place_images
  for select using (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────────────────────
-- AUTO-UPDATE places.updated_at
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists places_updated_at on places;
create trigger places_updated_at
  before update on places
  for each row execute function update_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- DEFERRED: FK place_status.place_id → places.id
-- ─────────────────────────────────────────────────────────────────────────────
-- Run AFTER seedPlaces.mjs has been executed (all 85 places in DB).
-- NOT VALID avoids a full table scan on existing data.
--
-- alter table place_status
--   add constraint place_status_place_fk
--   foreign key (place_id) references places(id)
--   not valid;
-- alter table place_status validate constraint place_status_place_fk;
