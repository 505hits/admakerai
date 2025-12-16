-- Drop video_tasks table as it's no longer needed
-- We now store video URLs directly in the videos table via webhook

DROP TABLE IF EXISTS video_tasks CASCADE;
