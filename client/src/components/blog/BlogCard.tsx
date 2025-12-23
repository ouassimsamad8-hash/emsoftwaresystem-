import { Link } from 'wouter';
import { Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface BlogCardProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
  category: string;
  readTime: number;
  publishedAt: string;
  author?: { name: string; avatar: string; slug?: string };
  variant?: 'default' | 'large' | 'small';
  className?: string;
}

export default function BlogCard({
  id,
  slug,
  title,
  excerpt,
  featuredImage,
  category,
  readTime,
  publishedAt,
  author = { name: "Ouassim Samad", avatar: "/api/placeholder/36/36" },
  variant = 'default',
  className,
}: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const isLarge = variant === 'large';
  const isSmall = variant === 'small';

  return (
    <Link href={`/blog/${slug}`}>
      <article
        className="group relative flex flex-col overflow-hidden rounded-[20px] border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-lg cursor-pointer h-full"
      >
        {/* Image Container */}
        <div className="relative h-60 overflow-hidden bg-muted">
          {featuredImage ? (
            <img
              src={featuredImage}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10">
              <span className="text-5xl font-bold text-primary/20">E&M</span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute left-4 top-4 z-10">
            <span 
              className="inline-flex items-center rounded-lg bg-background px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.8px] text-primary shadow-sm transition-all group-hover:bg-primary group-hover:text-primary-foreground"
            >
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-7">
          {/* Title */}
          <h3
            className="mb-3 text-xl font-bold leading-snug text-foreground line-clamp-2 transition-colors group-hover:text-primary"
            style={{ minHeight: '3.5rem' }}
          >
            {title}
          </h3>

          {/* Excerpt */}
          <p 
            className="mb-5 text-[15px] leading-relaxed text-muted-foreground line-clamp-3"
            style={{ minHeight: '4.5rem' }}
          >
            {excerpt}
          </p>

          {/* Divider */}
          <div className="my-5 h-px bg-border" />

          {/* Meta Row */}
          <div className="mt-auto flex items-center justify-between">
            {/* Writer Section */}
            <div className="flex items-center gap-2.5">
              {author.slug ? (
                <Link href={`/author/${author.slug}`}>
                  <a onClick={(e) => e.stopPropagation()}>
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="h-9 w-9 rounded-full border-2 border-border hover:border-primary transition-all cursor-pointer"
                    />
                  </a>
                </Link>
              ) : (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="h-9 w-9 rounded-full border-2 border-border"
                />
              )}
              <div className="flex flex-col">
                {author.slug ? (
                  <Link href={`/author/${author.slug}`}>
                    <a onClick={(e) => e.stopPropagation()} className="text-[13px] font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
                      {author.name}
                    </a>
                  </Link>
                ) : (
                  <span className="text-[13px] font-medium text-foreground">{author.name}</span>
                )}
                <time dateTime={publishedAt} className="text-xs text-muted-foreground">
                  {formatDate(publishedAt)}
                </time>
              </div>
            </div>

            {/* Read Time Badge */}
            <div className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-1.5">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">{readTime} min</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
