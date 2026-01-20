import { createClient } from './supabase-server'

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }

  // Check if user is admin
  const { data: adminProfile } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('id', user.id)
    .eq('is_admin', true)
    .single()

  if (!adminProfile) {
    return null
  }

  return { ...user, isAdmin: true }
}

export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }
  
  return user
}
