'use server'

import { createClient } from '@/lib/supabase/server'

export async function getUserData() {
    const supabase = await createClient()

    try {
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
            return { user: null, profile: null, error: userError?.message || 'No user found' }
        }

        // Get user profile from database with explicit field selection
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('id, credits, actor_credits, subscription_plan, subscription_status, subscription_end_date, created_at, updated_at')
            .eq('id', user.id)
            .maybeSingle()

        if (profileError) {
            return { user, profile: null, error: profileError.message }
        }

        if (!profile) {
            // Create default profile if doesn't exist
            const { data: newProfile, error: insertError } = await supabase
                .from('profiles')
                .insert([{
                    id: user.id,
                    credits: 0,
                    actor_credits: 0,
                    subscription_plan: 'free',
                    subscription_status: 'inactive'
                }])
                .select()
                .single()

            if (insertError) {
                return { user, profile: null, error: 'Failed to create default profile: ' + insertError.message }
            }
            return { user, profile: newProfile, error: null }
        } else {
            return { user, profile, error: null }
        }
    } catch (error) {
        return { user: null, profile: null, error: 'Internal server error: ' + String(error) }
    }
}
