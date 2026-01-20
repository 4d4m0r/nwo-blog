'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'

interface DeleteArticleButtonProps {
  articleId: string
}

export function DeleteArticleButton({ articleId }: DeleteArticleButtonProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', articleId)

      if (error) throw error

      router.push('/admin')
      router.refresh()
    } catch (err: any) {
      alert(err.message || 'An error occurred while deleting the article')
      setLoading(false)
    }
  }

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={loading}>
      {loading ? 'Deleting...' : 'Delete Article'}
    </Button>
  )
}
