-- Add replicator_credits column to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS replicator_credits INTEGER DEFAULT 0;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_replicator_credits ON profiles(replicator_credits);
