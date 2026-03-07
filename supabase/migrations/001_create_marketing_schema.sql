-- Create marketing schema
CREATE SCHEMA IF NOT EXISTS marketing;

-- Grant usage to Supabase roles
GRANT USAGE ON SCHEMA marketing TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA marketing
  GRANT ALL ON TABLES TO anon, authenticated, service_role;

-- Signups table
CREATE TABLE IF NOT EXISTS marketing.signups (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT NOT NULL,
  email            TEXT NOT NULL UNIQUE,
  people_count     INTEGER NOT NULL CHECK (people_count BETWEEN 1 AND 5),
  marketing_opt_in BOOLEAN NOT NULL DEFAULT FALSE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast email lookups / duplicate checks
CREATE INDEX IF NOT EXISTS signups_email_idx ON marketing.signups (email);

-- Enable Row Level Security
ALTER TABLE marketing.signups ENABLE ROW LEVEL SECURITY;

-- Only the service role (used by the API route) may insert or select
CREATE POLICY "service_role_insert" ON marketing.signups
  FOR INSERT TO service_role WITH CHECK (TRUE);

CREATE POLICY "service_role_select" ON marketing.signups
  FOR SELECT TO service_role USING (TRUE);
