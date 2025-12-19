-- Migration: Add credits columns to profiles table
-- This migration adds the credits and actor_credits columns if they don't exist

-- Add credits column for video generation
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS credits INTEGER DEFAULT 0;

-- Add actor_credits column for AI actor generation
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS actor_credits INTEGER DEFAULT 0;

-- Add subscription_end_date if it doesn't exist
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMP WITH TIME ZONE;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_credits ON profiles(credits);
CREATE INDEX IF NOT EXISTS idx_profiles_actor_credits ON profiles(actor_credits);
