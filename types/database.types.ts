export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  cover_image?: string
  author_name?: string
  author_avatar?: string
  category?: string
  published_at: string
  created_at: string
  updated_at: string
}
