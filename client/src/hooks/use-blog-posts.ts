import { useQuery } from '@tanstack/react-query';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

interface StrapiImage {
  url: string;
  alternativeText?: string;
}

interface StrapiBlogPost {
  id: number;
  documentId: string;
  title_fr: string;
  excerpt_fr?: string;
  content_fr: string;
  slug: string;
  categoryLabel_fr: string;
  category: string;
  author: string;
  authorAvatar?: string;
  publishedAt: string;
  readTime: number;
  featuredImage?: StrapiImage;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export interface AuthorObject {
  name: string;
  slug: string;
  avatar?: string;
  role?: string;
  bio?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categoryLabel: string;
  author: string; // For backward compatibility - author name
  authorAvatar?: string; // For backward compatibility
  authorObject?: AuthorObject; // Full author object with slug, role, etc.
  publishedDate: string;
  readTime: number;
  image?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export function useBlogPosts() {
  return useQuery<BlogPost[]>({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const response = await fetch(`${STRAPI_URL}/api/blog-posts?populate[author][populate]=avatar&populate=image&sort=publishedAt:desc`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }

      const result = await response.json();
      
      if (!result.data) {
        return [];
      }

      return result.data.map((item: { id: number; documentId: string; attributes?: StrapiBlogPost } & StrapiBlogPost) => {
        // Handle both new format (flat) and old format (with attributes)
        const post = item.attributes || item;
        
        // Handle author - can be string (legacy) or object (relation)
        let authorName = 'E&M Software';
        let authorAvatar = post.authorAvatar || undefined;
        let authorObject: AuthorObject | undefined = undefined;
        
        if (post.author) {
          if (typeof post.author === 'string') {
            authorName = post.author;
          } else if (typeof post.author === 'object') {
            const authorObj = post.author as any;
            if (authorObj.name) {
              authorName = authorObj.name;
            }
            if (authorObj.avatar?.url) {
              authorAvatar = `${STRAPI_URL}${authorObj.avatar.url}`;
            }
            // Build full author object
            authorObject = {
              name: authorObj.name || 'E&M Software',
              slug: authorObj.slug || 'ouassim-samad',
              avatar: authorObj.avatar?.url ? `${STRAPI_URL}${authorObj.avatar.url}` : undefined,
              role: authorObj.role,
              bio: authorObj.bio,
            };
          }
        }
        
        // Try to get image from featuredImage or image field, or use default
        let imageUrl = undefined;
        if (post.featuredImage?.url) {
          imageUrl = `${STRAPI_URL}${post.featuredImage.url}`;
        } else if ((post as any).image?.url) {
          imageUrl = `${STRAPI_URL}${(post as any).image.url}`;
        } else {
          // Use default image based on category
          imageUrl = '/attached_assets/generated_images/default-blog.jpg';
        }
        
        return {
          id: item.documentId || String(item.id),
          slug: post.slug,
          title: post.title_fr,
          excerpt: post.excerpt_fr || '',
          content: post.content_fr,
          category: post.category || 'general',
          categoryLabel: post.categoryLabel_fr || 'Général',
          author: authorName,
          authorAvatar: authorAvatar,
          authorObject: authorObject,
          publishedDate: post.publishedAt,
          readTime: post.readTime || 5,
          image: imageUrl,
          seoTitle: post.seoTitle,
          seoDescription: post.seoDescription,
          seoKeywords: post.seoKeywords,
        };
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useBlogPost(slug: string) {
  return useQuery<BlogPost | null>({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const response = await fetch(
        `${STRAPI_URL}/api/blog-posts?filters[slug][$eq]=${slug}&populate[author][populate]=avatar&populate=image`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog post');
      }

      const result = await response.json();
      
      if (!result.data || result.data.length === 0) {
        return null;
      }

      const item = result.data[0];
      const post = item.attributes || item;
      
      // Handle author - can be string (legacy) or object (relation)
      let authorName = 'E&M Software';
      let authorAvatar = post.authorAvatar || undefined;
      let authorObject: AuthorObject | undefined = undefined;
      
      if (post.author) {
        if (typeof post.author === 'string') {
          authorName = post.author;
        } else if (typeof post.author === 'object') {
          const authorObj = post.author as any;
          if (authorObj.name) {
            authorName = authorObj.name;
          }
          if (authorObj.avatar?.url) {
            authorAvatar = `${STRAPI_URL}${authorObj.avatar.url}`;
          }
          // Build full author object
          authorObject = {
            name: authorObj.name || 'E&M Software',
            slug: authorObj.slug || 'ouassim-samad',
            avatar: authorObj.avatar?.url ? `${STRAPI_URL}${authorObj.avatar.url}` : undefined,
            role: authorObj.role,
            bio: authorObj.bio,
          };
        }
      }
      
      // Try to get image from featuredImage or image field, or use default
      let imageUrl = undefined;
      if (post.featuredImage?.url) {
        imageUrl = `${STRAPI_URL}${post.featuredImage.url}`;
      } else if ((post as any).image?.url) {
        imageUrl = `${STRAPI_URL}${(post as any).image.url}`;
      } else {
        // Use default image based on category
        imageUrl = '/attached_assets/generated_images/default-blog.jpg';
      }
      
      return {
        id: item.documentId || String(item.id),
        slug: post.slug,
        title: post.title_fr,
        excerpt: post.excerpt_fr || '',
        content: post.content_fr,
        category: post.category || 'general',
        categoryLabel: post.categoryLabel_fr || 'Général',
        author: authorName,
        authorAvatar: authorAvatar,
        authorObject: authorObject,
        publishedDate: post.publishedAt,
        readTime: post.readTime || 5,
        image: imageUrl,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        seoKeywords: post.seoKeywords,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}
