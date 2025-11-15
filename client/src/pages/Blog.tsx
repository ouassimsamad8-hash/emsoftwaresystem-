import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { Calendar, Clock, Search, Mail, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/lib/language-context';
import { blogPosts } from '@/data/content';
import { motion } from 'framer-motion';

export default function Blog() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const categories = useMemo(() => {
    const cats = new Map<string, { label: string; count: number }>();
    blogPosts.forEach((post) => {
      const existing = cats.get(post.category);
      if (existing) {
        existing.count++;
      } else {
        cats.set(post.category, { label: post.categoryLabel[language], count: 1 });
      }
    });
    return Array.from(cats.entries()).map(([id, data]) => ({ id, ...data }));
  }, [language]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch = searchQuery === '' ||
        post.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, language]);

  const featuredPost = blogPosts[0];
  const regularPosts = filteredPosts;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t({ en: 'Our Blog', fr: 'Notre Blog' })}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t({
                en: 'Insights, tutorials, and industry news from our team of experts.',
                fr: 'Insights, tutoriels et actualités de l\'industrie de notre équipe d\'experts.'
              })}
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative max-w-2xl mx-auto"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t({ en: 'Search articles...', fr: 'Rechercher des articles...' })}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {!searchQuery && !selectedCategory && featuredPost && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-8">
                {t({ en: 'Featured Article', fr: 'Article en Vedette' })}
              </h2>
              <Link href={`/blog/${featuredPost.slug}`}>
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="aspect-[4/3] md:aspect-auto overflow-hidden bg-muted">
                        <motion.img
                          src={`/attached_assets/generated_images/${featuredPost.image}`}
                          alt={featuredPost.title[language]}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <Badge variant="secondary" className="w-fit mb-4">
                          {featuredPost.categoryLabel[language]}
                        </Badge>
                        <h3 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                          {featuredPost.title[language]}
                        </h3>
                        <p className="text-muted-foreground mb-6 line-clamp-3">
                          {featuredPost.excerpt[language]}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={featuredPost.authorAvatar} alt={featuredPost.author} />
                              <AvatarFallback>{featuredPost.author[0]}</AvatarFallback>
                            </Avatar>
                            <span>{featuredPost.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(featuredPost.publishedDate).toLocaleDateString(language)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{featuredPost.readTime} min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Main Content with Sidebar */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Blog Posts */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground">
                  {selectedCategory
                    ? categories.find(c => c.id === selectedCategory)?.label
                    : t({ en: 'All Articles', fr: 'Tous les Articles' })}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {filteredPosts.length} {t({ en: 'articles', fr: 'articles' })}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {regularPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 group">
                        <div className="aspect-[16/9] overflow-hidden bg-muted">
                          <motion.img
                            src={`/attached_assets/generated_images/${post.image}`}
                            alt={post.title[language]}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.4 }}
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
                          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
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
                  </motion.div>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    {t({ en: 'No articles found matching your search.', fr: 'Aucun article trouvé correspondant à votre recherche.' })}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-semibold text-foreground">
                      {t({ en: 'Categories', fr: 'Catégories' })}
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === null
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{t({ en: 'All Articles', fr: 'Tous les Articles' })}</span>
                        <span className="text-sm">{blogPosts.length}</span>
                      </div>
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted text-foreground'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{category.label}</span>
                          <span className="text-sm">{category.count}</span>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Newsletter Signup */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {t({ en: 'Stay Updated', fr: 'Restez Informé' })}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t({
                        en: 'Get the latest articles delivered straight to your inbox.',
                        fr: 'Recevez les derniers articles directement dans votre boîte de réception.'
                      })}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                      <Input
                        type="email"
                        placeholder={t({ en: 'Your email address', fr: 'Votre adresse e-mail' })}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Button type="submit" className="w-full gap-2">
                        {t({ en: 'Subscribe', fr: 'S\'abonner' })}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </form>
                    <p className="text-xs text-muted-foreground mt-3">
                      {t({
                        en: 'No spam. Unsubscribe anytime.',
                        fr: 'Pas de spam. Désabonnez-vous à tout moment.'
                      })}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Posts */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-semibold text-foreground">
                      {t({ en: 'Recent Posts', fr: 'Articles Récents' })}
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {blogPosts.slice(0, 3).map((post) => (
                      <Link key={post.id} href={`/blog/${post.slug}`}>
                        <div className="flex gap-3 group cursor-pointer">
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            <img
                              src={`/attached_assets/generated_images/${post.image}`}
                              alt={post.title[language]}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors text-sm">
                              {post.title[language]}
                            </h4>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(post.publishedDate).toLocaleDateString(language, { month: 'short', day: 'numeric' })}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
