import { motion } from 'framer-motion';
import BlogCard from './BlogCard';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  category: string;
  categoryLabel: string;
  readTime: number;
  publishedDate: string;
  author: string;
  authorAvatar?: string;
  authorObject?: {
    name: string;
    slug: string;
    avatar?: string;
    role?: string;
    bio?: string;
  };
}

interface ArticleGridProps {
  articles: Article[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <BlogCard
          key={`${article.slug}-${index}`}
          id={article.id}
          slug={article.slug}
          title={article.title}
          excerpt={article.excerpt}
          featuredImage={article.image || ''}
          category={article.categoryLabel}
          readTime={article.readTime}
          publishedAt={article.publishedDate}
          author={{
            name: article.author,
            avatar: article.authorObject?.avatar || article.authorAvatar || '/default-avatar.svg',
            slug: article.authorObject?.slug
          }}
        />
      ))}
    </div>
  );
}
