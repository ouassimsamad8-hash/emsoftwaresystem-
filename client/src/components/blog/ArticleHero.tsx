import { motion } from 'framer-motion';
import { Calendar, Clock, Share2, Bookmark } from 'lucide-react';
import { BreadcrumbNav } from './BreadcrumbNav';

interface ArticleHeroProps {
  title: string;
  subtitle?: string;
  category: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number;
}

export function ArticleHero({
  title,
  subtitle,
  category,
  image,
  author,
  publishedAt,
  readTime
}: ArticleHeroProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="relative bg-gradient-to-b from-primary/5 via-background to-background border-b border-border">
      <div className="container-custom py-8 lg:py-12">
        {/* Breadcrumb */}
        <BreadcrumbNav category={category} title={title} />

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            {category}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl lg:text-[56px] font-bold text-foreground leading-tight mb-6 max-w-4xl"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Meta Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-border"
        >
          {/* Author */}
          <div className="flex items-center gap-3">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-border"
            />
            <div>
              <div className="text-sm text-muted-foreground">Écrit par</div>
              <div className="font-semibold text-foreground">{author.name}</div>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-5 h-5" />
            <span>{formattedDate}</span>
          </div>

          {/* Read Time */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-5 h-5" />
            <span>{readTime} min de lecture</span>
          </div>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-muted transition-colors">
              <Share2 className="w-5 h-5 text-muted-foreground hover:text-primary" />
            </button>
            <button className="p-2 rounded-full hover:bg-muted transition-colors">
              <Bookmark className="w-5 h-5 text-muted-foreground hover:text-primary" />
            </button>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative aspect-[21/9] rounded-[20px] overflow-hidden bg-muted"
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
}
