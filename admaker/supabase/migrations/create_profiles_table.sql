-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  credits INTEGER DEFAULT 0,
  actor_credits INTEGER DEFAULT 0,
  subscription_plan TEXT DEFAULT 'free',
  subscription_status TEXT DEFAULT 'inactive',
  subscription_end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add columns if table already exists but columns are missing
DO $$ 
BEGIN
  -- Add credits column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'profiles' AND column_name = 'credits') THEN
    ALTER TABLE profiles ADD COLUMN credits INTEGER DEFAULT 0;
  END IF;

  -- Add actor_credits column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'profiles' AND column_name = 'actor_credits') THEN
    ALTER TABLE profiles ADD COLUMN actor_credits INTEGER DEFAULT 0;
  END IF;

  -- Add subscription_plan column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'profiles' AND column_name = 'subscription_plan') THEN
    ALTER TABLE profiles ADD COLUMN subscription_plan TEXT DEFAULT 'free';
  END IF;

  -- Add subscription_status column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'profiles' AND column_name = 'subscription_status') THEN
    ALTER TABLE profiles ADD COLUMN subscription_status TEXT DEFAULT 'inactive';
  END IF;

  -- Add subscription_end_date column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'profiles' AND column_name = 'subscription_end_date') THEN
    ALTER TABLE profiles ADD COLUMN subscription_end_date TIMESTAMP WITH TIME ZONE;
  END IF;

  -- Add created_at column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'profiles' AND column_name = 'created_at') THEN
    ALTER TABLE profiles ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;

  -- Add updated_at column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'profiles' AND column_name = 'updated_at') THEN
    ALTER TABLE profiles ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
  END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_credits ON profiles(credits);
CREATE INDEX IF NOT EXISTS idx_profiles_actor_credits ON profiles(actor_credits);
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_plan ON profiles(subscription_plan);
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_status ON profiles(subscription_status);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if it exists
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;

-- Trigger to update updated_at on profile changes
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
