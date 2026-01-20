import { createClient } from './supabase-server'
import bcrypt from 'bcryptjs'

export interface AdminUser {
  id: string
  username: string
  email: string
}

export async function verifyAdminLogin(username: string, password: string): Promise<AdminUser | null> {

  const supabaseServer = await createClient()
  
  try {
    // Check if admin exists
    const { data: admin, error } = await supabaseServer
      .from('admin_users')
      .select('id, username, email, password_hash')
      .eq('username', username)
      .single()

    if (error || !admin) {
      return null
    }

    // Verify password - try bcrypt first, then fall back to pgcrypto
    let isValid = false
    
    // Try bcrypt comparison (if password was hashed with bcrypt)
    try {
      isValid = await bcrypt.compare(password, admin.password_hash)
    } catch {
      // If bcrypt fails, try PostgreSQL crypt function
      const { data: verifyResult } = await supabaseServer
        .rpc('crypt_check', { 
          input_password: password, 
          stored_hash: admin.password_hash 
        })
        .single()
      
      if (verifyResult !== null) {
        // For pgcrypto, we check if the hash matches
        isValid = verifyResult === admin.password_hash
      }
    }

    if (!isValid) {
      // Fallback: check if password_hash starts with $2 (bcrypt) or $ (pgcrypto)
      // For pgcrypto crypt() function, we need to use a different approach
      const { data: checkHash } = await supabaseServer
        .rpc('crypt', {
          password_text: password,
          salt: admin.password_hash.substring(0, 29) // Extract salt from stored hash
        })

      if (checkHash === admin.password_hash) {
        isValid = true
      }
    }

    if (!isValid) {
      return null
    }

    return {
      id: admin.id,
      username: admin.username,
      email: admin.email
    }
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}

// Helper function to hash password using bcrypt
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}
