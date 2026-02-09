-- Create payments table to track processed Stripe sessions
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE NOT NULL,
  amount_total INTEGER,
  currency TEXT,
  status TEXT,
  plan_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own payments
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

-- Allow service role to insert/update (implicitly allowed, but good to be explicit about RLS not blocking it)
-- No explicit policy needed for service role as it bypasses RLS, but we ensure no public write access
