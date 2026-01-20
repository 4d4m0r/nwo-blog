import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-helpers'
import { createClient } from '@/lib/supabase-server'
import { ArticleForm } from '@/components/admin/article-form'
import { Article } from '@/types/database.types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

async function getArticle(id: string): Promise<Article | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/admin/login')
  }

  const { id } = await params
  const article = await getArticle(id)

  if (!article) {
    redirect('/admin')
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/admin">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Article</h1>
        <p className="text-muted-foreground mt-1">
          Update the article details
        </p>
      </div>

      <ArticleForm article={article} />
    </div>
  )
}
