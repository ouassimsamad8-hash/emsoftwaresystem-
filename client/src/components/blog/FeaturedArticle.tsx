import { Link } from 'wouter';
import { Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeaturedArticleProps {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  categoryColor?: string;
  author: {
    name: string;
    avatar: string;
    slug?: string;
  };
  publishedAt: string;
  readTime: number;
}

export default function FeaturedArticle({
  slug,
  title,
  excerpt,
  image,
  category,
  author,
  publishedAt,
  readTime,
}: FeaturedArticleProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Link href={`/blog/${slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="group relative h-[560px] overflow-hidden rounded-[24px] cursor-pointer"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-12 z-10">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center rounded-lg bg-white/15 backdrop-blur-md border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
              {category}
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-3 text-4xl font-bold leading-tight text-white line-clamp-3 group-hover:text-blue-200 transition-colors">
            {title}
          </h2>

          {/* Excerpt */}
          <p className="mb-6 text-base text-white/85 line-clamp-2 leading-relaxed">
            {excerpt}
          </p>

          {/* Meta Row */}
          <div className="flex items-center gap-6">
            {/* Author Info */}
            <div className="flex items-center gap-3">
              {author.slug ? (
                <Link href={`/author/${author.slug}`}>
                  <a onClick={(e) => e.stopPropagation()}>
                    <img
                      src={author.avatar || '/api/placeholder/40/40'}
                      alt={author.name}
                      className="h-10 w-10 rounded-full border-2 border-white/20 hover:border-primary transition-all cursor-pointer"
                    />
                  </a>
                </Link>
              ) : (
                <img
                  src={author.avatar || '/api/placeholder/40/40'}
                  alt={author.name}
                  className="h-10 w-10 rounded-full border-2 border-white/20"
                />
              )}
              <div className="flex flex-col">
                {author.slug ? (
                  <Link href={`/author/${author.slug}`}>
                    <a onClick={(e) => e.stopPropagation()} className="text-sm font-medium text-white hover:text-blue-200 transition-colors cursor-pointer">
                      {author.name}
                    </a>
                  </Link>
                ) : (
                  <span className="text-sm font-medium text-white">{author.name}</span>
                )}
                <span className="text-xs text-white/70">{formatDate(publishedAt)}</span>
              </div>
            </div>

            {/* Reading Time */}
            <div className="flex items-center gap-2 text-white/80">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{readTime} min</span>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
