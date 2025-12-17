-- Create table for custom AI actors
CREATE TABLE IF NOT EXISTS custom_actors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  task_id TEXT NOT NULL UNIQUE,
  actor_name TEXT NOT NULL,
  prompt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  person_reference_url TEXT,
  object_reference_url TEXT,
  decor_reference_url TEXT,
  aspect_ratio TEXT DEFAULT '1:1',
  resolution TEXT DEFAULT '1K',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for actor generation metadata (temporary storage for webhook)
CREATE TABLE IF NOT EXISTS actor_generation_metadata (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  actor_name TEXT NOT NULL,
  prompt TEXT NOT NULL,
  person_reference_url TEXT,
  object_reference_url TEXT,
  decor_reference_url TEXT,
  aspect_ratio TEXT DEFAULT '1:1',
  resolution TEXT DEFAULT '1K',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_custom_actors_user_id ON custom_actors(user_id);
CREATE INDEX IF NOT EXISTS idx_custom_actors_created_at ON custom_actors(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_actor_metadata_task_id ON actor_generation_metadata(task_id);
CREATE INDEX IF NOT EXISTS idx_actor_metadata_user_id ON actor_generation_metadata(user_id);

-- Enable Row Level Security
ALTER TABLE custom_actors ENABLE ROW LEVEL SECURITY;
ALTER TABLE actor_generation_metadata ENABLE ROW LEVEL SECURITY;

-- RLS Policies for custom_actors
CREATE POLICY "Users can view their own actors"
  ON custom_actors FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own actors"
  ON custom_actors FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own actors"
  ON custom_actors FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own actors"
  ON custom_actors FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for actor_generation_metadata
CREATE POLICY "Users can view their own metadata"
  ON actor_generation_metadata FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own metadata"
  ON actor_generation_metadata FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Service role can do everything (for webhook)
CREATE POLICY "Service role can manage all metadata"
  ON actor_generation_metadata FOR ALL
  USING (true)
  WITH CHECK (true);
