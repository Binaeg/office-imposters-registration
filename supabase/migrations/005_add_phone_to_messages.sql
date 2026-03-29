CREATE TABLE IF NOT EXISTS marketing.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE marketing.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_insert_messages" ON marketing.messages
  FOR INSERT TO service_role WITH CHECK (TRUE);

CREATE POLICY "service_role_select_messages" ON marketing.messages
  FOR SELECT TO service_role USING (TRUE);

ALTER TABLE marketing.messages
  ADD COLUMN IF NOT EXISTS phone TEXT;
