-- Add expires_at column to videos table
-- Veo URLs are valid for 60 days after generation
ALTER TABLE videos ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE;

-- Create index for expiration queries
CREATE INDEX IF NOT EXISTS idx_videos_expires_at ON videos(expires_at);

-- Update existing videos to have expiration date (60 days from creation)
UPDATE videos 
SET expires_at = created_at + INTERVAL '60 days'
WHERE expires_at IS NULL;
