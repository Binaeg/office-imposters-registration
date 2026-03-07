-- Add time_slot column to marketing.signups
ALTER TABLE marketing.signups
  ADD COLUMN IF NOT EXISTS time_slot TEXT NOT NULL DEFAULT '';

-- Remove the temporary default so future inserts must supply a value
ALTER TABLE marketing.signups
  ALTER COLUMN time_slot DROP DEFAULT;

-- Index for fast capacity-count queries per slot
CREATE INDEX IF NOT EXISTS signups_time_slot_idx ON marketing.signups (time_slot);

-- RLS: service_role bypass (covers INSERT and SELECT used by the API route)
-- Drop first to make migration idempotent
DROP POLICY IF EXISTS "service_role_insert" ON marketing.signups;
DROP POLICY IF EXISTS "service_role_select" ON marketing.signups;
DROP POLICY IF EXISTS "service_role_update" ON marketing.signups;

CREATE POLICY "service_role_insert" ON marketing.signups
  FOR INSERT TO anon WITH CHECK (TRUE);

CREATE POLICY "service_role_select" ON marketing.signups
  FOR SELECT TO anon USING (TRUE);

CREATE POLICY "service_role_update" ON marketing.signups
  FOR UPDATE TO anon USING (TRUE) WITH CHECK (TRUE);
