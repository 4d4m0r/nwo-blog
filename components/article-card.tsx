import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Article } from '@/types/database.types'
import { Calendar } from 'lucide-react'

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  const publishedDate = new Date(article.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const initials = article.author_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || 'AI'

  return (
    <Link href={`/article/${article.slug}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
        {article.cover_image && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={article.cover_image}
              alt={article.title}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          {article.category && (
            <Badge variant="secondary" className="w-fit mb-2">
              {article.category}
            </Badge>
          )}
          <CardTitle className="line-clamp-2">{article.title}</CardTitle>
          <CardDescription className="line-clamp-3">
            {article.excerpt}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={article.author_avatar} alt={article.author_name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {article.author_name || 'AI Writer'}
              </span>
            </div>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="mr-1 h-3 w-3" />
            {publishedDate}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
