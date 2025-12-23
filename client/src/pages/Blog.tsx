import { useState, useMemo } from 'react';
import { Search, ArrowUp } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { useBlogPosts } from '@/hooks/use-blog-posts';
import { motion } from 'framer-motion';
import FeaturedArticle from '@/components/blog/FeaturedArticle';
import SecondaryFeatured from '@/components/blog/SecondaryFeatured';
import SearchBar from '@/components/blog/SearchBar';
import CategoryPills from '@/components/blog/CategoryPills';
import ArticleGrid from '@/components/blog/ArticleGrid';
import NewsletterCTA from '@/components/blog/NewsletterCTA';

export default function Blog() {
  const { t } = useLanguage();
  const { data: blogPosts = [], isLoading } = useBlogPosts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll tracking for back to top button
  useState(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const categories = useMemo(() => {
    const cats = new Map<string, { label: string; count: number }>();
    blogPosts.forEach((post) => {
      const existing = cats.get(post.category);
      if (existing) {
        existing.count++;
      } else {
        cats.set(post.category, { label: post.categoryLabel, count: 1 });
      }
    });
    return Array.from(cats.entries()).map(([id, data]) => ({ id, ...data }));
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    let posts = blogPosts.filter((post) => {
      const matchesSearch = searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Remove duplicates by slug
    const uniquePosts = Array.from(
      new Map(posts.map(post => [post.slug, post])).values()
    );

    return uniquePosts;
  }, [searchQuery, selectedCategory, blogPosts]);

  // Separate featured and regular articles
  const featuredArticle = filteredPosts[0];
  const secondaryFeatured = filteredPosts.slice(1, 3);
  const regularArticles = filteredPosts.slice(3);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header Area */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background pt-24 pb-20 border-b">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" />
        <div className="container mx-auto px-6 lg:px-16 max-w-[1320px] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="mb-4 text-5xl md:text-6xl font-bold tracking-[-1.5px] text-foreground">
              {t({ en: 'Insights & Innovations', fr: 'Insights & Innovations' })}
            </h1>
            
            <p className="mx-auto mb-8 max-w-[680px] text-xl leading-relaxed text-muted-foreground">
              {t({
                en: 'Explore our latest thoughts on technology, design and digital innovation',
                fr: 'Explorez nos dernières réflexions sur la technologie, le design et l\'innovation digitale'
              })}
            </p>

            {/* Stats Bar */}
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <span className="font-medium">{blogPosts.length} Articles</span>
              <span className="h-4 w-px bg-border" />
              <span className="font-medium">{categories.length} Catégories</span>
              <span className="h-4 w-px bg-border" />
              <span className="font-medium">12 Contributeurs</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Control Bar - Sticky */}
      <section className="sticky top-20 z-40 border-b bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-6 lg:px-16 max-w-[1320px]">
          <div className="flex items-center gap-8 py-5 overflow-x-auto">
            {/* Search Bar */}
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
            />

            {/* Category Pills */}
            <div className="flex-1 min-w-0">
              <CategoryPills
                categories={categories}
                activeCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spotlight Zone */}
      {!isLoading && filteredPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-16 max-w-[1320px]">
            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
              {/* Hero Featured Article */}
              {featuredArticle && (
                <FeaturedArticle
                  slug={featuredArticle.slug}
                  title={featuredArticle.title}
                  excerpt={featuredArticle.excerpt}
                  image={featuredArticle.image || ''}
                  category={featuredArticle.categoryLabel}
                  author={{
                    name: featuredArticle.author,
                    avatar: featuredArticle.authorObject?.avatar || featuredArticle.authorAvatar || "/default-avatar.svg",
                    slug: featuredArticle.authorObject?.slug
                  }}
                  publishedAt={featuredArticle.publishedDate}
                  readTime={featuredArticle.readTime}
                />
              )}

              {/* Secondary Featured Stack */}
              <div className="flex flex-col gap-6">
                {secondaryFeatured.map((article, index) => (
                  <SecondaryFeatured
                    key={article.slug}
                    slug={article.slug}
                    title={article.title}
                    excerpt={article.excerpt}
                    image={article.image || ''}
                    category={article.categoryLabel}
                    author={{
                      name: article.author,
                      avatar: article.authorObject?.avatar || article.authorAvatar || "/default-avatar.svg",
                      slug: article.authorObject?.slug
                    }}
                    publishedAt={article.publishedDate}
                    readTime={article.readTime}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles Grid */}
      <section className="py-12 pb-24 bg-background">
        <div className="container mx-auto px-6 lg:px-16 max-w-[1320px]">
          {/* Section Header */}
          <h2 className="mb-12 text-[42px] font-bold text-foreground">
            {t({ en: 'Latest Articles', fr: 'Derniers Articles' })}
          </h2>

          {/* Loading State */}
          {isLoading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="mb-4 h-60 rounded-[20px] bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]" style={{ animation: 'shimmer 1.5s infinite' }}></div>
                  <div className="mb-3 h-6 w-3/4 rounded bg-muted"></div>
                  <div className="mb-2 h-4 w-full rounded bg-muted"></div>
                  <div className="h-4 w-2/3 rounded bg-muted"></div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="py-24 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-foreground">
                {t({ en: 'No articles found', fr: 'Aucun article trouvé' })}
              </h3>
              <p className="mb-6 text-muted-foreground">
                {t({
                  en: 'Try adjusting your search or filters',
                  fr: 'Essayez d\'ajuster votre recherche ou vos filtres'
                })}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                }}
                className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                {t({ en: 'Clear filters', fr: 'Effacer les filtres' })}
              </button>
            </div>
          ) : (
            <ArticleGrid articles={regularArticles} />
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterCTA />

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
