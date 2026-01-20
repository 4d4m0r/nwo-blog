# NWO - AI News Blog

A modern AI news blog built with Next.js, shadcn/ui, and Supabase.

## Features

- 🚀 Built with Next.js 16 (App Router)
- 🎨 Beautiful UI with shadcn/ui components
- 🗄️ Supabase for database and backend
- 📱 Fully responsive design
- 🎯 TypeScript for type safety
- ⚡ Fast and optimized

## Tech Stack

- **Framework:** Next.js 16
- **UI Components:** shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 20.9.0 or higher (currently using 18.19.1 may cause warnings)
- npm or yarn
- A Supabase account (free tier works)

### Installation

1. Clone the repository:
```bash
cd nwo-blog
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under API.

### Setting up Supabase

1. Create a new project on [Supabase](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Run the SQL schema from `supabase/schema.sql` to create the articles table
4. Copy your project URL and anon key to `.env.local`

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
nwo-blog/
├── app/
│   ├── article/
│   │   └── [slug]/
│   │       └── page.tsx      # Article detail page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── article-card.tsx      # Article card component
│   ├── footer.tsx            # Footer component
│   └── navbar.tsx            # Navigation bar
├── lib/
│   ├── supabase.ts           # Supabase client
│   └── utils.ts              # Utility functions
├── types/
│   └── database.types.ts     # TypeScript types
└── supabase/
    └── schema.sql            # Database schema
```

## Database Schema

The `articles` table includes:
- `id` - UUID primary key
- `title` - Article title
- `slug` - URL-friendly slug (unique)
- `content` - Full article content (HTML)
- `excerpt` - Short excerpt for previews
- `cover_image` - Cover image URL
- `author_name` - Author name
- `author_avatar` - Author avatar URL
- `category` - Article category
- `published_at` - Publication timestamp
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Adding Articles

Currently, the app uses mock data for demonstration. To use real data from Supabase:

1. Uncomment the Supabase queries in `app/page.tsx` and `app/article/[slug]/page.tsx`
2. Remove or comment out the mock data
3. Insert articles into your Supabase database

Example SQL to insert an article:

```sql
INSERT INTO articles (title, slug, content, excerpt, category, author_name)
VALUES (
  'Your Article Title',
  'your-article-slug',
  '<p>Your HTML content here...</p>',
  'A short excerpt for the preview',
  'Technology',
  'Author Name'
);
```

## Customization

- **Branding:** Update the "NWO" text in `components/navbar.tsx` and metadata in `app/layout.tsx`
- **Styling:** Modify Tailwind classes in components or update `app/globals.css`
- **Components:** Add more shadcn/ui components with `npx shadcn@latest add [component-name]`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

Make sure to set your environment variables in your deployment platform.

## License

MIT
