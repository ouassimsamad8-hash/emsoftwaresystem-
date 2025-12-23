import { motion } from 'framer-motion';
import BlogCard from './BlogCard';

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

interface RelatedPostsGridProps {
  articles: Article[];
  currentSlug: string;
}

export function RelatedPostsGrid({ articles, currentSlug }: RelatedPostsGridProps) {
  // Filter out current article and limit to 3
  const relatedArticles = articles
    .filter(article => article.slug !== currentSlug)
    .slice(0, 3);

  if (relatedArticles.length === 0) return null;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Articles similaires
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Continuez votre lecture avec ces articles qui pourraient vous intéresser
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedArticles.map((article, index) => (
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
      </div>
    </section>
  );
}
