import { ArticleCard } from "@/components/article-card"
import { Footer } from "@/components/footer"
import { supabase } from "@/lib/supabase"
import { Article } from "@/types/database.types"

async function getArticles(): Promise<Article[]> {
  // For now, return mock data. Replace with actual Supabase query when database is set up
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching articles:', error)
    return []
  }
  
  return data || []

}

export default async function Home() {
  const articles = await getArticles()

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h1 className="text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
              NWO
            </h1>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Your source for the latest AI news, insights, and trends
            </p>
          </div>
        </section>
        
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 py-8 md:py-12">
          <h2 className="text-3xl font-bold tracking-tight">Latest Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
