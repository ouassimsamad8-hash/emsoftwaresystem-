import { Link } from 'wouter';
import { motion } from 'framer-motion';

interface AuthorMetaProps {
  author: {
    name: string;
    avatar: string;
    role?: string;
    slug?: string;
  };
  publishedAt: string;
  readTime?: number;
  size?: 'small' | 'medium' | 'large';
  showRole?: boolean;
}

export function AuthorMeta({ 
  author, 
  publishedAt, 
  readTime, 
  size = 'medium',
  showRole = true 
}: AuthorMetaProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const avatarSizes = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-14 h-14'
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-3"
    >
      {/* Avatar */}
      {author.slug ? (
        <Link href={`/author/${author.slug}`}>
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={author.avatar}
            alt={author.name}
            className={`${avatarSizes[size]} rounded-full object-cover border-2 border-border hover:border-primary transition-all cursor-pointer`}
          />
        </Link>
      ) : (
        <img
          src={author.avatar}
          alt={author.name}
          className={`${avatarSizes[size]} rounded-full object-cover border-2 border-border`}
        />
      )}

      {/* Info */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 flex-wrap">
          {author.slug ? (
            <Link href={`/author/${author.slug}`}>
              <span className={`${textSizes[size]} font-semibold text-foreground hover:text-primary transition-colors cursor-pointer`}>
                {author.name}
              </span>
            </Link>
          ) : (
            <span className={`${textSizes[size]} font-semibold text-foreground`}>
              {author.name}
            </span>
          )}
          
          {showRole && author.role && (
            <>
              <span className="text-muted-foreground">•</span>
              <span className={`${textSizes[size]} text-muted-foreground`}>
                {author.role}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={publishedAt}>{formattedDate}</time>
          {readTime && (
            <>
              <span>•</span>
              <span>{readTime} min de lecture</span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
