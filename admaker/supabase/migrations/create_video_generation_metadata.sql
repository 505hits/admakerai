-- Create table for storing video generation metadata
-- This replaces the in-memory Map to persist metadata between serverless function calls

CREATE TABLE IF NOT EXISTS video_generation_metadata (
    task_id TEXT PRIMARY KEY,
    user_id UUID NOT NULL,
    actor_name TEXT NOT NULL,
    actor_image_url TEXT NOT NULL,
    script TEXT NOT NULL,
    scene_description TEXT,
    duration INTEGER NOT NULL DEFAULT 8,
    format TEXT NOT NULL DEFAULT '16:9',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_video_generation_metadata_created_at 
ON video_generation_metadata(created_at DESC);

-- Auto-cleanup old metadata (older than 1 hour)
CREATE OR REPLACE FUNCTION cleanup_old_metadata()
RETURNS void AS $$
BEGIN
    DELETE FROM video_generation_metadata
    WHERE created_at < NOW() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql;

-- Optional: Create a cron job to run cleanup (requires pg_cron extension)
-- SELECT cron.schedule('cleanup-metadata', '0 * * * *', 'SELECT cleanup_old_metadata()');
