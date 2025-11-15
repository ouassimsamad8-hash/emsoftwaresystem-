import { Link } from 'wouter';
import { Calendar, Clock, User } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/lib/language-context';
import { blogPosts } from '@/data/content';

export default function Blog() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {t({ en: 'Blog', fr: 'Blog' })}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t({
              en: 'Insights, tutorials, and industry news from our team.',
              fr: 'Insights, tutoriels et actualités de l\'industrie de notre équipe.'
            })}
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 group h-full flex flex-col" data-testid={`blog-card-${post.slug}`}>
                  <div className="aspect-[16/9] overflow-hidden bg-muted">
                    <img
                      src={`/attached_assets/generated_images/${post.image}`}
                      alt={post.title[language]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{post.categoryLabel[language]}</Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.publishedDate).toLocaleDateString(language)}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {post.title[language]}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">
                      {post.excerpt[language]}
                    </p>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.authorAvatar} alt={post.author} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime} min</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
