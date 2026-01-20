import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-helpers'
import { ArticleForm } from '@/components/admin/article-form'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default async function NewArticlePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/admin/login')
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
        <h1 className="text-3xl font-bold">Create New Article</h1>
        <p className="text-muted-foreground mt-1">
          Fill in the details to create a new article
        </p>
      </div>

      <ArticleForm />
    </div>
  )
}
