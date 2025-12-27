-- Add ai_script_uses column to profiles table
-- This tracks the number of AI script enhancement uses remaining per account
-- Default is 50 uses per account

DO $$ 
BEGIN
  -- Add ai_script_uses column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'profiles' AND column_name = 'ai_script_uses') THEN
    ALTER TABLE profiles ADD COLUMN ai_script_uses INTEGER DEFAULT 50;
    
    -- Update existing users to have 50 uses
    UPDATE profiles SET ai_script_uses = 50 WHERE ai_script_uses IS NULL;
  END IF;
END $$;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_ai_script_uses ON profiles(ai_script_uses);
