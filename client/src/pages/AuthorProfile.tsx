import { useRoute } from 'wouter';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github, Mail, FileText, Eye, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AuthorArticles } from '@/components/author/AuthorArticles';
import NotFound from './not-found';

export default function AuthorProfile() {
  const [, params] = useRoute('/author/:slug');
  const [author, setAuthor] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorData = async () => {
      if (!params?.slug) return;

      setLoading(true);
      try {
        // Fetch ALL authors from Strapi (filtering doesn't work with permissions)
        const authorResponse = await fetch(
          `http://localhost:1337/api/authors?populate=*`
        );
        const authorData = await authorResponse.json();
        
        console.log('✅ Authors API response:', authorData);

        // Filter by slug on client side
        const authors = authorData.data || [];
        const strapiAuthor = authors.find((a: any) => a.slug === params.slug);

        if (strapiAuthor) {
          console.log('✅ Author found:', strapiAuthor.name);
          
          // Transform Strapi data
          const transformedAuthor = {
            name: strapiAuthor.name,
            slug: strapiAuthor.slug,
            avatar: strapiAuthor.avatar?.url 
              ? `http://localhost:1337${strapiAuthor.avatar.url}`
              : '/attached_assets/generated_images/default-avatar.jpg',
            role: strapiAuthor.role || 'Contributeur',
            bio: strapiAuthor.bio || '',
            fullBio: strapiAuthor.fullBio || strapiAuthor.bio || '',
            expertise: Array.isArray(strapiAuthor.expertise) 
              ? strapiAuthor.expertise 
              : (typeof strapiAuthor.expertise === 'string' 
                  ? JSON.parse(strapiAuthor.expertise) 
                  : []),
            verified: strapiAuthor.verified || false,
            joinedDate: strapiAuthor.joinedDate || strapiAuthor.createdAt,
            stats: {
              articles: strapiAuthor.blog_posts?.length || 0,
              totalViews: strapiAuthor.totalViews || 0,
              yearsActive: strapiAuthor.joinedDate 
                ? new Date().getFullYear() - new Date(strapiAuthor.joinedDate).getFullYear()
                : 1
            },
            social: typeof strapiAuthor.social === 'object' && strapiAuthor.social !== null
              ? strapiAuthor.social 
              : (typeof strapiAuthor.social === 'string'
                  ? JSON.parse(strapiAuthor.social)
                  : {})
          };

          setAuthor(transformedAuthor);

          // Fetch author's articles using documentId (Strapi v5)
          const authorDocId = strapiAuthor.documentId;
          const articlesResponse = await fetch(
            `http://localhost:1337/api/blog-posts?filters[author][documentId][$eq]=${authorDocId}&populate=*&sort=publishedAt:desc`
          );
          const articlesData = await articlesResponse.json();
          
          console.log('Articles API response:', articlesData);

          if (articlesData.data) {
            const transformedArticles = articlesData.data.map((article: any) => ({
              slug: article.slug,
              title_fr: article.title_fr,
              excerpt_fr: article.excerpt_fr,
              coverImage: article.featuredImage?.url
                ? `http://localhost:1337${article.featuredImage.url}`
                : article.image?.url
                ? `http://localhost:1337${article.image.url}`
                : '/api/placeholder/800/400',
              category_fr: article.categoryLabel_fr || article.category || 'Tech',
              publishedAt: article.publishedAt,
              readTime: article.readTime || 5,
              author: {
                name: transformedAuthor.name,
                avatar: transformedAuthor.avatar
              }
            }));

            setArticles(transformedArticles);
          }
        } else {
          // Auteur non trouvé dans Strapi
          console.error('❌ Auteur non trouvé:', params.slug);
          console.log('Réponse API:', authorData);
          setAuthor(null);
        }
      } catch (error) {
        console.error('❌ Erreur lors du chargement de l\'auteur:', error);
        setAuthor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [params?.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!author) {
    return <NotFound />;
  }

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: author.social?.linkedin, color: 'hover:bg-blue-700 hover:text-white' },
    { name: 'Twitter', icon: Twitter, url: author.social?.twitter, color: 'hover:bg-sky-500 hover:text-white' },
    { name: 'GitHub', icon: Github, url: author.social?.github, color: 'hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900' },
    { name: 'Email', icon: Mail, url: author.social?.email ? `mailto:${author.social.email}` : null, color: 'hover:bg-red-600 hover:text-white' }
  ].filter(link => link.url);

  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 via-background to-background border-b border-border">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 inline-block relative"
            >
              <img
                src={author.avatar}
                alt={author.name}
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-primary/20 shadow-xl mx-auto"
              />
              {author.verified && (
                <div className="absolute bottom-2 right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                  <CheckCircle className="w-6 h-6 text-primary-foreground" />
                </div>
              )}
            </motion.div>

            {/* Name & Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
                {author.name}
              </h1>
              <p className="text-xl text-primary font-medium">
                {author.role}
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto"
            >
              {author.fullBio}
            </motion.p>

            {/* Expertise Tags */}
            {Array.isArray(author.expertise) && author.expertise.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-2 mb-8"
              >
                {author.expertise.map((skill: string, index: number) => (
                  <Badge key={`${skill}-${index}`} variant="secondary" className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
                    {skill}
                  </Badge>
                ))}
              </motion.div>
            )}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-lg bg-muted border border-border transition-all ${link.color}`}
                  title={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              <Button size="lg" className="gap-2">
                <Mail className="w-5 h-5" />
                <span>Contacter {author.name.split(' ')[0]}</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-muted/30 border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {/* Total Articles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-card border border-border rounded-[16px]"
            >
              <FileText className="w-10 h-10 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">
                {author.stats.articles}
              </div>
              <div className="text-sm text-muted-foreground">
                Articles publiés
              </div>
            </motion.div>

            {/* Total Views */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-6 bg-card border border-border rounded-[16px]"
            >
              <Eye className="w-10 h-10 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">
                {author.stats.totalViews.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Lectures totales
              </div>
            </motion.div>

            {/* Years Active */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-6 bg-card border border-border rounded-[16px]"
            >
              <Calendar className="w-10 h-10 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">
                {author.stats.yearsActive}+
              </div>
              <div className="text-sm text-muted-foreground">
                Années d'expérience
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          {/* Sort Controls */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-3">
              <Button
                variant={sortBy === 'recent' ? 'default' : 'outline'}
                onClick={() => setSortBy('recent')}
              >
                Récents
              </Button>
              <Button
                variant={sortBy === 'popular' ? 'default' : 'outline'}
                onClick={() => setSortBy('popular')}
              >
                Populaires
              </Button>
            </div>
          </div>

          {/* Articles Grid */}
          <AuthorArticles
            authorSlug={author.slug}
            authorName={author.name}
            articles={articles}
          />
        </div>
      </section>
    </div>
  );
}
