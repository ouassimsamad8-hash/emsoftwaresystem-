/**
 * Strapi API Client
 * Fetches data from Strapi CMS
 */

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

async function fetchStrapi<T>(endpoint: string): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.statusText}`);
    }

    const json: StrapiResponse<StrapiEntity<T>[] | StrapiEntity<T>> = await response.json();
    return json.data as T;
  } catch (error) {
    console.error(`Error fetching from Strapi (${endpoint}):`, error);
    throw error;
  }
}

// Transform Strapi entity to app format
function transformEntity<T>(entity: StrapiEntity<any>): T {
  return {
    id: entity.id.toString(),
    ...entity.attributes,
  } as T;
}

// Fetch all services
export async function fetchServices() {
  const data = await fetchStrapi<StrapiEntity<any>[]>('/services?populate=*');
  return data.map(entity => ({
    id: entity.id.toString(),
    slug: entity.attributes.slug,
    icon: entity.attributes.icon,
    title: {
      en: entity.attributes.title_en,
      fr: entity.attributes.title_fr,
    },
    shortDescription: {
      en: entity.attributes.shortDescription_en,
      fr: entity.attributes.shortDescription_fr,
    },
    fullDescription: {
      en: entity.attributes.fullDescription_en,
      fr: entity.attributes.fullDescription_fr,
    },
    features: entity.attributes.features_en?.map((en: string, i: number) => ({
      en,
      fr: entity.attributes.features_fr[i],
    })) || [],
    benefits: entity.attributes.benefits_en?.map((en: string, i: number) => ({
      en,
      fr: entity.attributes.benefits_fr[i],
    })) || [],
  }));
}

// Fetch single service by slug
export async function fetchServiceBySlug(slug: string) {
  const data = await fetchStrapi<StrapiEntity<any>[]>(`/services?filters[slug][$eq]=${slug}&populate=*`);
  if (!data || data.length === 0) return null;
  
  const entity = data[0];
  return {
    id: entity.id.toString(),
    slug: entity.attributes.slug,
    icon: entity.attributes.icon,
    title: {
      en: entity.attributes.title_en,
      fr: entity.attributes.title_fr,
    },
    shortDescription: {
      en: entity.attributes.shortDescription_en,
      fr: entity.attributes.shortDescription_fr,
    },
    fullDescription: {
      en: entity.attributes.fullDescription_en,
      fr: entity.attributes.fullDescription_fr,
    },
    features: entity.attributes.features_en?.map((en: string, i: number) => ({
      en,
      fr: entity.attributes.features_fr[i],
    })) || [],
    benefits: entity.attributes.benefits_en?.map((en: string, i: number) => ({
      en,
      fr: entity.attributes.benefits_fr[i],
    })) || [],
  };
}

// Fetch all projects
export async function fetchProjects() {
  const data = await fetchStrapi<StrapiEntity<any>[]>('/projects?populate=*');
  return data.map(entity => ({
    id: entity.id.toString(),
    slug: entity.attributes.slug,
    category: entity.attributes.category,
    title: {
      en: entity.attributes.title_en,
      fr: entity.attributes.title_fr,
    },
    categoryLabel: {
      en: entity.attributes.categoryLabel_en,
      fr: entity.attributes.categoryLabel_fr,
    },
    description: {
      en: entity.attributes.description_en,
      fr: entity.attributes.description_fr,
    },
    image: entity.attributes.image?.data?.attributes?.url || '',
    technologies: entity.attributes.technologies || [],
    challenge: {
      en: entity.attributes.challenge_en,
      fr: entity.attributes.challenge_fr,
    },
    solution: {
      en: entity.attributes.solution_en,
      fr: entity.attributes.solution_fr,
    },
    results: entity.attributes.results_en?.map((en: string, i: number) => ({
      en,
      fr: entity.attributes.results_fr[i],
    })) || [],
    screenshots: entity.attributes.screenshots?.data?.map((s: any) => s.attributes.url) || [],
  }));
}

// Fetch single project by slug
export async function fetchProjectBySlug(slug: string) {
  const data = await fetchStrapi<StrapiEntity<any>[]>(`/projects?filters[slug][$eq]=${slug}&populate=*`);
  if (!data || data.length === 0) return null;
  
  const entity = data[0];
  return {
    id: entity.id.toString(),
    slug: entity.attributes.slug,
    category: entity.attributes.category,
    title: {
      en: entity.attributes.title_en,
      fr: entity.attributes.title_fr,
    },
    categoryLabel: {
      en: entity.attributes.categoryLabel_en,
      fr: entity.attributes.categoryLabel_fr,
    },
    description: {
      en: entity.attributes.description_en,
      fr: entity.attributes.description_fr,
    },
    image: entity.attributes.image?.data?.attributes?.url || '',
    technologies: entity.attributes.technologies || [],
    challenge: {
      en: entity.attributes.challenge_en,
      fr: entity.attributes.challenge_fr,
    },
    solution: {
      en: entity.attributes.solution_en,
      fr: entity.attributes.solution_fr,
    },
    results: entity.attributes.results_en?.map((en: string, i: number) => ({
      en,
      fr: entity.attributes.results_fr[i],
    })) || [],
    screenshots: entity.attributes.screenshots?.data?.map((s: any) => s.attributes.url) || [],
  };
}

// Fetch all blog posts
export async function fetchBlogPosts() {
  const data = await fetchStrapi<StrapiEntity<any>[]>('/blog-posts?populate=*&sort=publishedAt:desc');
  return data.map(entity => ({
    id: entity.id.toString(),
    slug: entity.attributes.slug,
    title: {
      en: entity.attributes.title_en,
      fr: entity.attributes.title_fr,
    },
    excerpt: {
      en: entity.attributes.excerpt_en,
      fr: entity.attributes.excerpt_fr,
    },
    content: {
      en: entity.attributes.content_en,
      fr: entity.attributes.content_fr,
    },
    category: entity.attributes.category,
    categoryLabel: {
      en: entity.attributes.categoryLabel_en,
      fr: entity.attributes.categoryLabel_fr,
    },
    image: entity.attributes.image?.data?.attributes?.url || '',
    author: entity.attributes.author,
    date: entity.attributes.publishedAt,
    readTime: entity.attributes.readTime,
  }));
}

// Fetch single blog post by slug
export async function fetchBlogPostBySlug(slug: string) {
  const data = await fetchStrapi<StrapiEntity<any>[]>(`/blog-posts?filters[slug][$eq]=${slug}&populate=*`);
  if (!data || data.length === 0) return null;
  
  const entity = data[0];
  return {
    id: entity.id.toString(),
    slug: entity.attributes.slug,
    title: {
      en: entity.attributes.title_en,
      fr: entity.attributes.title_fr,
    },
    excerpt: {
      en: entity.attributes.excerpt_en,
      fr: entity.attributes.excerpt_fr,
    },
    content: {
      en: entity.attributes.content_en,
      fr: entity.attributes.content_fr,
    },
    category: entity.attributes.category,
    categoryLabel: {
      en: entity.attributes.categoryLabel_en,
      fr: entity.attributes.categoryLabel_fr,
    },
    image: entity.attributes.image?.data?.attributes?.url || '',
    author: entity.attributes.author,
    date: entity.attributes.publishedAt,
    readTime: entity.attributes.readTime,
  };
}

// Fetch all FAQs
export async function fetchFAQs() {
  const data = await fetchStrapi<StrapiEntity<any>[]>('/faqs?sort=order:asc');
  return data.map(entity => ({
    id: entity.id.toString(),
    question: {
      en: entity.attributes.question_en,
      fr: entity.attributes.question_fr,
    },
    answer: {
      en: entity.attributes.answer_en,
      fr: entity.attributes.answer_fr,
    },
    category: entity.attributes.category,
  }));
}
