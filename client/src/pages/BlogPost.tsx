import { useRoute } from 'wouter';
import { useEffect } from 'react';
import { useLanguage } from '@/lib/language-context';
import { useBlogPost, useBlogPosts } from '@/hooks/use-blog-posts';
import NotFound from './not-found';
import { ReadingProgressBar } from '@/components/blog/ReadingProgressBar';
import { ArticleHero } from '@/components/blog/ArticleHero';
import { SocialShareBar } from '@/components/blog/SocialShareBar';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { RichTextContent } from '@/components/blog/RichTextContent';
import { AuthorCard } from '@/components/blog/AuthorCard';
import { AuthorBio } from '@/components/author/AuthorBio';
import { AuthorArticles } from '@/components/author/AuthorArticles';
import { RelatedPostsGrid } from '@/components/blog/RelatedPostsGrid';
import NewsletterCTA from '@/components/blog/NewsletterCTA';
import { BookingCTA } from '@/components/blog/BookingCTA';

export default function BlogPost() {
  const [, params] = useRoute('/blog/:slug');
  const { t } = useLanguage();
  
  const { data: post, isLoading } = useBlogPost(params?.slug || '');
  const { data: allPosts = [] } = useBlogPosts();

  // Update meta tags for SEO
  useEffect(() => {
    if (post) {
      document.title = post.seoTitle || post.title;
      
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', post.seoDescription || post.excerpt);
      
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      if (post.seoKeywords) {
        metaKeywords.setAttribute('content', post.seoKeywords);
      }
    }
    
    return () => {
      document.title = 'E&M Software System';
    };
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <p className="text-muted-foreground">{t({ en: 'Loading...', fr: 'Chargement...' })}</p>
      </div>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  // Prepare author data - use authorObject if available, fallback to string author
  const authorData = {
    name: post.authorObject?.name || post.author || 'E&M Software',
    avatar: post.authorObject?.avatar || post.authorAvatar || '/default-avatar.svg',
    bio: post.authorObject?.bio || "Expert en transformation digitale avec plus de 10 ans d'expérience dans le développement de solutions innovantes pour les entreprises.",
    role: post.authorObject?.role || 'Expert en Transformation Digitale',
    slug: post.authorObject?.slug || 'ouassim-samad',
    social: {
      email: 'noumoupriso@gmail.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  };

  // Prepare articles for related posts
  const relatedArticles = allPosts
    .filter(p => p.id !== post?.id && p.category === post?.category)
    .map(p => ({
      slug: p.slug,
      title_fr: p.title,
      excerpt_fr: p.excerpt,
      coverImage: p.image || '/attached_assets/generated_images/default-blog.jpg',
      category_fr: p.categoryLabel,
      publishedAt: p.publishedDate,
      readTime: p.readTime,
      author: {
        name: p.authorObject?.name || p.author,
        avatar: p.authorObject?.avatar || p.authorAvatar || '/default-avatar.svg'
      }
    }));

  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Social Share Bar */}
      <SocialShareBar url={shareUrl} title={post.title} />

      {/* Article Hero */}
      <ArticleHero
        title={post.title}
        subtitle={post.excerpt}
        category={post.categoryLabel}
        image={post.image || '/attached_assets/generated_images/default-blog.jpg'}
        author={{
          name: authorData.name,
          avatar: authorData.avatar
        }}
        publishedAt={post.publishedDate}
        readTime={post.readTime}
      />

      {/* Author Bio - Top */}
      <section className="py-8 bg-muted/20 border-b border-border">
        <div className="container-custom max-w-4xl">
          <AuthorBio author={authorData} variant="compact" />
        </div>
      </section>

      {/* Main Content Area with Sidebar */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          {/* Table of Contents - Mobile Accordion */}
          <div className="xl:hidden mb-8">
            <TableOfContents content={post.content} />
          </div>

          <div className="flex gap-8 items-start">
            {/* Article Content - 760px max-width */}
            <article className="flex-1 max-w-[760px]">
              <RichTextContent content={post.content} />
            </article>

            {/* Table of Contents - Desktop Sticky Sidebar */}
            <TableOfContents content={post.content} />
          </div>
        </div>
      </section>

      {/* Author Card - Bottom with Recent Articles */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom max-w-6xl">
          <AuthorCard author={authorData} />
          
          {/* Author Recent Articles */}
          <div className="mt-12">
            <AuthorArticles
              authorSlug={authorData.slug}
              authorName={authorData.name}
              articles={relatedArticles.slice(0, 3)}
              limit={3}
              showViewAll={true}
            />
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <RelatedPostsGrid articles={relatedArticles} currentSlug={post.slug} />

      {/* Newsletter CTA */}
      <NewsletterCTA />

      {/* Booking CTA */}
      <BookingCTA />
    </div>
  );
}
