import { motion } from 'framer-motion';
import { Link } from 'wouter';
import BlogCard from '@/components/blog/BlogCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Article {
  slug: string;
  title_fr: string;
  excerpt_fr: string;
  coverImage: string;
  category_fr: string;
  publishedAt: string;
  readTime: number;
  author?: {
    name: string;
    avatar: string;
  };
}

interface AuthorArticlesProps {
  authorSlug: string;
  authorName: string;
  articles: Article[];
  limit?: number;
  showViewAll?: boolean;
}

export function AuthorArticles({ 
  authorSlug, 
  authorName, 
  articles, 
  limit, 
  showViewAll = false 
}: AuthorArticlesProps) {
  const displayedArticles = limit ? articles.slice(0, limit) : articles;

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Aucun article publié pour le moment.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
          {limit ? `Articles récents de ${authorName}` : `Tous les articles de ${authorName}`}
        </h2>
        <p className="text-muted-foreground">
          {articles.length} article{articles.length > 1 ? 's' : ''} publié{articles.length > 1 ? 's' : ''}
        </p>
      </motion.div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {displayedArticles.map((article, index) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <BlogCard
              id={article.slug}
              slug={article.slug}
              title={article.title_fr}
              excerpt={article.excerpt_fr}
              featuredImage={article.coverImage}
              category={article.category_fr}
              author={article.author}
              publishedAt={article.publishedAt}
              readTime={article.readTime}
            />
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      {showViewAll && limit && articles.length > limit && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href={`/author/${authorSlug}`}>
            <Button size="lg" className="gap-2 group">
              <span>Voir tous les articles de {authorName}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
