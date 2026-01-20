import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-helpers'
import { createClient } from '@/lib/supabase-server'
import { Article } from '@/types/database.types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DeleteArticleButton } from '@/components/admin/delete-article-button'
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

export default async function DeleteArticlePage({
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
    <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/admin">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Delete Article</CardTitle>
          <CardDescription>
            Are you sure you want to delete this article? This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{article.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{article.excerpt}</p>
            </div>
            
            <div className="flex gap-4 pt-4">
              <DeleteArticleButton articleId={article.id} />
              <Link href="/admin">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
