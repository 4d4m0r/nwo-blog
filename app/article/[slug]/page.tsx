import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase'
import { Article } from '@/types/database.types'
import { Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

async function getArticle(slug: string): Promise<Article | null> {
  // For now, return mock data. Replace with actual Supabase query when database is set up
  // const { data, error } = await supabase
  //   .from('articles')
  //   .select('*')
  //   .eq('slug', slug)
  //   .single()
  
  // if (error || !data) {
  //   return null
  // }
  
  // return data

  // Mock data for demonstration
  const mockArticles: Article[] = [
    {
      id: '1',
      title: 'The Future of AI: Trends to Watch in 2024',
      slug: 'future-of-ai-trends-2024',
      content: `
        <h2>Introduction</h2>
        <p>Artificial intelligence continues to evolve at an unprecedented pace. As we navigate through 2024, several key trends are shaping the future of AI technology.</p>
        
        <h2>Large Language Models</h2>
        <p>Large language models (LLMs) have revolutionized natural language processing. Companies are investing heavily in developing more efficient and capable models that can understand context better and provide more accurate responses.</p>
        
        <h2>Edge Computing and AI</h2>
        <p>The integration of AI with edge computing is enabling real-time processing and decision-making at the device level. This trend is particularly important for applications requiring low latency, such as autonomous vehicles and IoT devices.</p>
        
        <h2>AI Ethics and Regulation</h2>
        <p>As AI becomes more prevalent, there's an increasing focus on ethical AI development and regulatory frameworks. Governments and organizations are working to establish guidelines that ensure AI is developed and deployed responsibly.</p>
        
        <h2>Conclusion</h2>
        <p>The future of AI is bright, with exciting developments on the horizon. Staying informed about these trends is crucial for anyone working in or interested in the field of artificial intelligence.</p>
      `,
      excerpt: 'Explore the latest trends shaping the future of artificial intelligence, from large language models to edge computing and beyond.',
      cover_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
      author_name: 'AI Editor',
      category: 'Technology',
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'How Machine Learning is Transforming Healthcare',
      slug: 'ml-transforming-healthcare',
      content: `
        <h2>Introduction</h2>
        <p>Machine learning is revolutionizing the healthcare industry, offering new ways to diagnose diseases, develop treatments, and improve patient outcomes.</p>
        
        <h2>Medical Diagnosis</h2>
        <p>ML algorithms are being used to analyze medical images, detect patterns in patient data, and assist doctors in making more accurate diagnoses. These tools can process vast amounts of data quickly and identify subtle patterns that might be missed by human eyes.</p>
        
        <h2>Drug Discovery</h2>
        <p>The drug discovery process is being accelerated through machine learning. AI models can predict how different compounds will interact with target proteins, potentially reducing the time and cost of developing new medications.</p>
        
        <h2>Personalized Medicine</h2>
        <p>Machine learning enables personalized treatment plans by analyzing individual patient data, including genetic information, medical history, and lifestyle factors. This approach can lead to more effective treatments with fewer side effects.</p>
      `,
      excerpt: 'Discover how machine learning algorithms are revolutionizing medical diagnosis, treatment, and patient care.',
      cover_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=600&fit=crop',
      author_name: 'AI Editor',
      category: 'Healthcare',
      published_at: new Date(Date.now() - 86400000).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Understanding Neural Networks: A Beginner\'s Guide',
      slug: 'neural-networks-beginners-guide',
      content: `
        <h2>Introduction</h2>
        <p>Neural networks are a fundamental concept in artificial intelligence, inspired by the structure and function of the human brain. This guide will help you understand the basics.</p>
        
        <h2>What are Neural Networks?</h2>
        <p>Neural networks are computing systems made up of interconnected nodes (neurons) that process information. Each connection has a weight that adjusts as the network learns from data.</p>
        
        <h2>How They Work</h2>
        <p>Neural networks learn by processing training data and adjusting their weights to minimize errors. This process, called backpropagation, allows networks to improve their performance over time.</p>
        
        <h2>Types of Neural Networks</h2>
        <p>There are many types of neural networks, including feedforward networks, convolutional neural networks (CNNs) for image processing, and recurrent neural networks (RNNs) for sequential data.</p>
        
        <h2>Applications</h2>
        <p>Neural networks power many applications we use daily, including image recognition, natural language processing, recommendation systems, and autonomous vehicles.</p>
      `,
      excerpt: 'A comprehensive introduction to neural networks, explaining how they work and why they\'re so powerful.',
      cover_image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=600&fit=crop',
      author_name: 'AI Editor',
      category: 'Education',
      published_at: new Date(Date.now() - 172800000).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]

  const article = mockArticles.find(a => a.slug === slug)
  return article || null
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

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
    <article className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative py-6 lg:py-10">
      <Link href="/">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
      
      {article.cover_image && (
        <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
          <Image
            src={article.cover_image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="mb-4 flex items-center gap-2">
        {article.category && (
          <Badge variant="secondary">{article.category}</Badge>
        )}
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          {publishedDate}
        </div>
      </div>

      <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tighter md:text-5xl">
        {article.title}
      </h1>

      <div className="mb-8 flex items-center space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={article.author_avatar} alt={article.author_name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">
            {article.author_name || 'AI Writer'}
          </p>
        </div>
      </div>

      <div
        className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-8 prose-h2:text-3xl prose-h3:mt-6 prose-h3:text-2xl prose-p:leading-7 prose-a:text-primary prose-a:underline prose-strong:text-foreground"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <div className="mt-12 border-t pt-8">
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            View More Articles
          </Button>
        </Link>
      </div>
    </article>
  )
}
