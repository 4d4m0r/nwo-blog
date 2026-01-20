'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

interface AdminNavbarProps {
  username: string
}

export function AdminNavbar({ username }: AdminNavbarProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_session')
    }
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            NWO Admin
          </span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            {username}
          </span>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            View Site
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}
