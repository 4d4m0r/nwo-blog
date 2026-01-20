import { cookies } from 'next/headers'

export interface AdminSession {
  id: string
  username: string
  email: string
}

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')

    if (!sessionCookie?.value) {
      return null
    }

    const session = JSON.parse(sessionCookie.value) as AdminSession
    return session
  } catch {
    return null
  }
}

export async function requireAdmin() {
  const session = await getAdminSession()
  
  if (!session) {
    throw new Error('Unauthorized')
  }

  return session
}
