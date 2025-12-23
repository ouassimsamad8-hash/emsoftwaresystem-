import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, Github, ArrowRight } from 'lucide-react';

interface AuthorCardProps {
  author: {
    name: string;
    avatar: string;
    bio: string;
    role: string;
    tags?: string[];
    social?: {
      email?: string;
      linkedin?: string;
      twitter?: string;
      github?: string;
    };
  };
}

export function AuthorCard({ author }: AuthorCardProps) {
  const socialLinks = [
    { name: 'Email', icon: Mail, url: author.social?.email ? `mailto:${author.social.email}` : null, color: 'hover:text-red-600' },
    { name: 'LinkedIn', icon: Linkedin, url: author.social?.linkedin, color: 'hover:text-blue-700' },
    { name: 'Twitter', icon: Twitter, url: author.social?.twitter, color: 'hover:text-sky-500' },
    { name: 'GitHub', icon: Github, url: author.social?.github, color: 'hover:text-gray-900 dark:hover:text-gray-100' }
  ].filter(link => link.url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-primary/5 via-background to-primary/5 border border-border rounded-[20px] p-8 lg:p-10"
    >
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="shrink-0"
        >
          <img
            src={author.avatar}
            alt={author.name}
            className="w-28 h-28 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-primary/20 shadow-lg"
          />
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-3">
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {author.name}
            </h3>
            <p className="text-primary font-medium">
              {author.role}
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            {author.bio}
          </p>

          {/* Tags */}
          {Array.isArray(author.tags) && author.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {author.tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                >
                  {typeof tag === 'string' ? tag : String(tag)}
                </span>
              ))}
            </div>
          )}

          {/* Social & CTA */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg bg-muted/50 hover:bg-muted transition-all ${link.color}`}
                    title={link.name}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            )}

            {/* CTA */}
            <a
              href="#contact"
              className="ml-auto flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all hover:gap-3 group"
            >
              <span>Contactez-moi</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
