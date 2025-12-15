-- Create videos table for storing generated video metadata
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  task_id TEXT UNIQUE NOT NULL,
  video_url TEXT NOT NULL,
  actor_name TEXT NOT NULL,
  actor_image_url TEXT NOT NULL,
  script TEXT NOT NULL,
  scene_description TEXT,
  duration INTEGER NOT NULL,
  format TEXT NOT NULL,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_videos_user_id ON videos(user_id);
CREATE INDEX IF NOT EXISTS idx_videos_created_at ON videos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_videos_task_id ON videos(task_id);

-- Enable Row Level Security
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own videos
CREATE POLICY "Users can view own videos"
  ON videos FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own videos (from client)
CREATE POLICY "Users can insert own videos"
  ON videos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Service role can insert videos (for webhooks/callbacks)
-- This allows the Veo callback to insert videos using the service_role key
CREATE POLICY "Service role can insert videos"
  ON videos FOR INSERT
  WITH CHECK (true);

-- Policy: Users can delete their own videos
CREATE POLICY "Users can delete own videos"
  ON videos FOR DELETE
  USING (auth.uid() = user_id);
