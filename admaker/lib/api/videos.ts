import { createClient } from '@/lib/supabase/client';

export interface Video {
    id: string;
    user_id: string;
    task_id: string;
    video_url: string;
    actor_name: string;
    actor_image_url: string;
    script: string;
    scene_description?: string;
    duration: number;
    format: string;
    status: string;
    created_at: string;
    expires_at?: string; // Veo URLs expire after 60 days
}

/**
 * Save a generated video to Supabase
 */
export async function saveVideo(video: Omit<Video, 'id' | 'created_at'>): Promise<Video | null> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('videos')
        .insert([video])
        .select()
        .single();

    if (error) {
        console.error('Error saving video to Supabase:', error);
        return null;
    }

    return data;
}

/**
 * Get all videos for the current user
 */
export async function getUserVideos(limit = 20): Promise<Video[]> {
    const supabase = createClient();

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        console.error('Error getting user:', authError);
        return [];
    }

    const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('user_id', user.id) // Filter by current user
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching user videos:', error);
        return [];
    }

    return data || [];
}

/**
 * Get a video by task ID
 */
export async function getVideoByTaskId(taskId: string): Promise<Video | null> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('task_id', taskId)
        .single();

    if (error) {
        console.error('Error fetching video by task ID:', error);
        return null;
    }

    return data;
}

/**
 * Delete a video
 */
export async function deleteVideo(id: string): Promise<boolean> {
    const supabase = createClient();

    const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting video:', error);
        return false;
    }

    return true;
}
