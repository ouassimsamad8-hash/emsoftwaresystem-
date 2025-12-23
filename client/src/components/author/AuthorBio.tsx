import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthorBioProps {
  author: {
    name: string;
    avatar: string;
    role: string;
    bio: string;
    slug: string;
    social?: {
      linkedin?: string;
      twitter?: string;
      github?: string;
      email?: string;
    };
  };
  variant?: 'compact' | 'expanded';
}

export function AuthorBio({ author, variant = 'compact' }: AuthorBioProps) {
  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: author.social?.linkedin, color: 'hover:text-blue-700' },
    { name: 'Twitter', icon: Twitter, url: author.social?.twitter, color: 'hover:text-sky-500' },
    { name: 'GitHub', icon: Github, url: author.social?.github, color: 'hover:text-foreground' },
    { name: 'Email', icon: Mail, url: author.social?.email ? `mailto:${author.social.email}` : null, color: 'hover:text-red-600' }
  ].filter(link => link.url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`flex ${variant === 'compact' ? 'flex-row items-center gap-4' : 'flex-col items-start gap-6'} p-6 bg-muted/30 border border-border rounded-[16px]`}
    >
      {/* Avatar */}
      <Link href={`/author/${author.slug}`}>
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={author.avatar}
          alt={author.name}
          className={`${variant === 'compact' ? 'w-16 h-16' : 'w-20 h-20'} rounded-full object-cover border-2 border-primary/20 cursor-pointer hover:border-primary transition-all`}
        />
      </Link>

      {/* Content */}
      <div className="flex-1">
        <div className="mb-2">
          <Link href={`/author/${author.slug}`}>
            <h3 className="text-xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer">
              {author.name}
            </h3>
          </Link>
          <p className="text-sm text-primary font-medium">{author.role}</p>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-4">
          {author.bio}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg bg-background hover:bg-muted transition-all ${link.color}`}
                  title={link.name}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          )}

          {/* View Profile Button */}
          <Link href={`/author/${author.slug}`}>
            <Button variant="outline" size="sm" className="gap-2">
              <span>Voir le profil</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
