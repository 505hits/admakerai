-- Create video_tasks table for tracking video generation status
-- This replaces the in-memory Map which doesn't work with Vercel serverless functions

CREATE TABLE IF NOT EXISTS video_tasks (
    task_id TEXT PRIMARY KEY,
    status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    video_url TEXT,
    error TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_video_tasks_status ON video_tasks(status);
CREATE INDEX IF NOT EXISTS idx_video_tasks_created_at ON video_tasks(created_at);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_video_tasks_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER video_tasks_updated_at
    BEFORE UPDATE ON video_tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_video_tasks_updated_at();

-- Clean up old tasks (older than 24 hours)
DELETE FROM video_tasks WHERE created_at < NOW() - INTERVAL '24 hours';
