import { useRoute, Link } from 'wouter';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/lib/language-context';
import { blogPosts } from '@/data/content';
import NotFound from './not-found';
import { motion } from 'framer-motion';

export default function BlogPost() {
  const [, params] = useRoute('/blog/:slug');
  const { t, language } = useLanguage();
  
  const post = blogPosts.find(p => p.slug === params?.slug);

  if (!post) {
    return <NotFound />;
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post.title[language];

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`
    };
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/blog">
            <Button variant="ghost" className="gap-2 group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              {t({ en: 'Back to Blog', fr: 'Retour au Blog' })}
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Article Content */}
      <article className="pb-24">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-4">
              {post.categoryLabel[language]}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
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
              <Separator orientation="vertical" className="h-12 hidden sm:block" />
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishedDate).toLocaleDateString(language, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} {t({ en: 'min read', fr: 'min de lecture' })}</span>
              </div>
            </div>

            {/* Social Share */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Share2 className="h-4 w-4" />
                <span>{t({ en: 'Share:', fr: 'Partager :' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleShare('twitter')}
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleShare('linkedin')}
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleShare('facebook')}
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('email')}
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-lg overflow-hidden mb-12"
            >
              <img
                src={`/attached_assets/generated_images/${post.image}`}
                alt={post.title[language]}
                className="w-full h-auto"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="prose prose-lg max-w-none dark:prose-invert"
            >
              <div className="text-xl text-foreground leading-relaxed mb-8 font-medium">
                {post.excerpt[language]}
              </div>
              
              <div className="text-muted-foreground leading-relaxed space-y-6">
                <p>
                  {t({
                    en: 'Welcome to this comprehensive guide where we explore the intricacies of modern software development. As technology continues to evolve at a rapid pace, staying informed about the latest trends, best practices, and innovative approaches is crucial for any development team.',
                    fr: 'Bienvenue dans ce guide complet où nous explorons les subtilités du développement logiciel moderne. Alors que la technologie continue d\'évoluer à un rythme rapide, rester informé des dernières tendances, meilleures pratiques et approches innovantes est crucial pour toute équipe de développement.'
                  })}
                </p>

                <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">
                  {t({ en: 'Key Insights', fr: 'Informations Clés' })}
                </h2>
                
                <p>
                  {t({
                    en: 'Throughout this article, we\'ll examine real-world scenarios, provide actionable recommendations, and share insights gained from years of experience in the field. Whether you\'re a seasoned professional or just starting your journey, you\'ll find valuable information to help advance your projects.',
                    fr: 'Tout au long de cet article, nous examinerons des scénarios du monde réel, fournirons des recommandations concrètes et partagerons des idées acquises au fil des années d\'expérience dans le domaine. Que vous soyez un professionnel chevronné ou que vous commenciez tout juste votre parcours, vous trouverez des informations précieuses pour faire progresser vos projets.'
                  })}
                </p>

                <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">
                  {t({ en: 'Best Practices', fr: 'Meilleures Pratiques' })}
                </h2>

                <p>
                  {t({
                    en: 'Implementing industry best practices is essential for building robust, maintainable, and scalable applications. We focus on proven methodologies that have helped countless teams deliver successful projects while maintaining high code quality and developer productivity.',
                    fr: 'La mise en œuvre des meilleures pratiques de l\'industrie est essentielle pour créer des applications robustes, maintenables et évolutives. Nous nous concentrons sur des méthodologies éprouvées qui ont aidé d\'innombrables équipes à livrer des projets réussis tout en maintenant une haute qualité de code et la productivité des développeurs.'
                  })}
                </p>

                <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">
                  {t({ en: 'Conclusion', fr: 'Conclusion' })}
                </h2>

                <p>
                  {t({
                    en: 'As we continue to push the boundaries of what\'s possible in software development, it\'s important to remain adaptable and open to new ideas. The strategies and techniques discussed in this article provide a solid foundation for tackling modern development challenges and achieving excellence in your work.',
                    fr: 'Alors que nous continuons à repousser les limites de ce qui est possible dans le développement logiciel, il est important de rester adaptable et ouvert aux nouvelles idées. Les stratégies et techniques discutées dans cet article fournissent une base solide pour relever les défis du développement moderne et atteindre l\'excellence dans votre travail.'
                  })}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-8">
                {t({ en: 'Related Articles', fr: 'Articles Connexes' })}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 group">
                        <div className="aspect-[16/9] overflow-hidden bg-muted">
                          <motion.img
                            src={`/attached_assets/generated_images/${relatedPost.image}`}
                            alt={relatedPost.title[language]}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                        <CardHeader>
                          <Badge variant="secondary" className="w-fit mb-2">
                            {relatedPost.categoryLabel[language]}
                          </Badge>
                          <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                            {relatedPost.title[language]}
                          </h3>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(relatedPost.publishedDate).toLocaleDateString(language, { month: 'short', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{relatedPost.readTime} min</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({
                en: 'Ready to Transform Your Business?',
                fr: 'Prêt à Transformer Votre Entreprise ?'
              })}
            </h2>
            <p className="text-muted-foreground mb-6 text-lg">
              {t({
                en: 'Let\'s discuss how our solutions can help you achieve your goals.',
                fr: 'Discutons de la façon dont nos solutions peuvent vous aider à atteindre vos objectifs.'
              })}
            </p>
            <Link href="/book-appointment">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg">
                  {t({ en: 'Book Free Consultation', fr: 'Réserver une Consultation Gratuite' })}
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
