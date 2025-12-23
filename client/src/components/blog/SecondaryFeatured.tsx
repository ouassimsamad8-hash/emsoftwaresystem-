import { Link } from 'wouter';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface SecondaryFeaturedProps {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    slug?: string;
  };
  publishedAt: string;
  readTime: number;
  index: number;
}

export default function SecondaryFeatured({
  slug,
  title,
  excerpt,
  image,
  category,
  author,
  publishedAt,
  readTime,
  index,
}: SecondaryFeaturedProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <Link href={`/blog/${slug}`}>
      <motion.article
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group flex h-[268px] overflow-hidden rounded-[20px] border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg cursor-pointer"
      >
        {/* Image Section */}
        <div className="w-[45%] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Content Section */}
        <div className="flex w-[55%] flex-col justify-between p-7">
          {/* Category Badge */}
          <div>
            <span className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-3 text-[22px] font-bold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {excerpt}
          </p>

          {/* Meta Row */}
          <div className="mt-auto flex items-center gap-3">
            {author.slug ? (
              <Link href={`/author/${author.slug}`}>
                <a onClick={(e) => e.stopPropagation()}>
                  <img
                    src={author.avatar || '/api/placeholder/32/32'}
                    alt={author.name}
                    className="h-8 w-8 rounded-full hover:ring-2 hover:ring-primary transition-all cursor-pointer"
                  />
                </a>
              </Link>
            ) : (
              <img
                src={author.avatar || '/api/placeholder/32/32'}
                alt={author.name}
                className="h-8 w-8 rounded-full"
              />
            )}
            <div className="flex flex-col">
              {author.slug ? (
                <Link href={`/author/${author.slug}`}>
                  <a onClick={(e) => e.stopPropagation()} className="text-xs font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
                    {author.name}
                  </a>
                </Link>
              ) : (
                <span className="text-xs font-medium text-foreground">{author.name}</span>
              )}
              <span className="text-xs text-muted-foreground">{formatDate(publishedAt)}</span>
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">{readTime} min</span>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
