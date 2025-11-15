import { useRoute, Link } from 'wouter';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/lib/language-context';
import { blogPosts } from '@/data/content';
import NotFound from './not-found';

export default function BlogPost() {
  const [, params] = useRoute('/blog/:slug');
  const { t, language } = useLanguage();
  
  const post = blogPosts.find(p => p.slug === params?.slug);

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/blog">
          <Button variant="ghost" className="gap-2" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            {t({ en: 'Back to Blog', fr: 'Retour au Blog' })}
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <article className="pb-24">
        <div className="max-w-4xl mx-auto px-4">
          <Badge variant="secondary" className="mb-4">
            {post.categoryLabel[language]}
          </Badge>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            {post.title[language]}
          </h1>
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.authorAvatar} alt={post.author} />
                <AvatarFallback>{post.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-foreground">{post.author}</div>
                <div className="text-sm text-muted-foreground">{t({ en: 'Author', fr: 'Auteur' })}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.publishedDate).toLocaleDateString(language, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} {t({ en: 'min read', fr: 'min de lecture' })}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-lg overflow-hidden mb-12">
            <img
              src={`/attached_assets/generated_images/${post.image}`}
              alt={post.title[language]}
              className="w-full h-auto"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {post.excerpt[language]}
            </p>
            <div className="mt-8 text-muted-foreground leading-relaxed space-y-4">
              <p>
                {t({
                  en: 'This is placeholder content for the blog post. In a real implementation, this would contain the full article content with proper formatting, images, code snippets, and other rich media elements.',
                  fr: 'Ceci est un contenu de remplacement pour l\'article de blog. Dans une implémentation réelle, cela contiendrait le contenu complet de l\'article avec une mise en forme appropriée, des images, des extraits de code et d\'autres éléments multimédias riches.'
                })}
              </p>
              <p>
                {t({
                  en: 'The blog post would typically include multiple sections, headings, and rich content that provides valuable insights to readers.',
                  fr: 'L\'article de blog comprendrait généralement plusieurs sections, titres et contenu riche qui fournit des informations précieuses aux lecteurs.'
                })}
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t({
              en: 'Ready to Transform Your Business?',
              fr: 'Prêt à Transformer Votre Entreprise ?'
            })}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t({
              en: 'Let\'s discuss how our solutions can help you achieve your goals.',
              fr: 'Discutons de la façon dont nos solutions peuvent vous aider à atteindre vos objectifs.'
            })}
          </p>
          <Link href="/book-appointment">
            <Button size="lg" data-testid="button-cta-appointment">
              {t({ en: 'Book Free Consultation', fr: 'Réserver une Consultation Gratuite' })}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
