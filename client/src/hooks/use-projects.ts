import { useQuery } from '@tanstack/react-query';
import type { Project } from '@shared/schema';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
      name: string;
      alternativeText: string | null;
    };
  } | null;
}

interface StrapiProject {
  id: number;
  attributes: {
    slug: string;
    title_en: string;
    title_fr: string;
    category: string;
    categoryLabel_en: string;
    categoryLabel_fr: string;
    description_en: string;
    description_fr: string;
    image: StrapiImage;
    technologies: string[];
    challenge_en: string;
    challenge_fr: string;
    solution_en: string;
    solution_fr: string;
    results: Array<{ en: string; fr: string }>;
    screenshots: {
      data: Array<{
        id: number;
        attributes: {
          url: string;
          name: string;
        };
      }>;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

interface StrapiResponse {
  data: StrapiProject[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

function getImageUrl(image: StrapiImage): string {
  if (!image.data) return '';
  const url = image.data.attributes.url;
  // If URL is relative, prepend Strapi URL
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

function transformProject(strapiProject: StrapiProject): Project {
  const { attributes } = strapiProject;
  
  return {
    id: strapiProject.id.toString(),
    slug: attributes.slug,
    title: {
      en: attributes.title_en,
      fr: attributes.title_fr
    },
    category: attributes.category,
    categoryLabel: {
      en: attributes.categoryLabel_en,
      fr: attributes.categoryLabel_fr
    },
    description: {
      en: attributes.description_en,
      fr: attributes.description_fr
    },
    image: getImageUrl(attributes.image),
    technologies: attributes.technologies || [],
    challenge: {
      en: attributes.challenge_en,
      fr: attributes.challenge_fr
    },
    solution: {
      en: attributes.solution_en,
      fr: attributes.solution_fr
    },
    results: attributes.results || [],
    screenshots: attributes.screenshots?.data?.map(s => {
      const url = s.attributes.url;
      return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
    }) || []
  };
}

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['/api/projects'],
    queryFn: async () => {
      const response = await fetch(`${STRAPI_URL}/api/projects?populate=*`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      const json: StrapiResponse = await response.json();
      return json.data.map(transformProject);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProject(slug: string) {
  return useQuery<Project | null>({
    queryKey: ['/api/projects', slug],
    queryFn: async () => {
      const response = await fetch(
        `${STRAPI_URL}/api/projects?filters[slug][$eq]=${slug}&populate=*`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }
      
      const json: StrapiResponse = await response.json();
      
      if (json.data.length === 0) {
        return null;
      }
      
      return transformProject(json.data[0]);
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useProjectsByCategory(category?: string) {
  return useQuery<Project[]>({
    queryKey: ['/api/projects', 'category', category],
    queryFn: async () => {
      const url = category
        ? `${STRAPI_URL}/api/projects?filters[category][$eq]=${category}&populate=*`
        : `${STRAPI_URL}/api/projects?populate=*`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      const json: StrapiResponse = await response.json();
      return json.data.map(transformProject);
    },
    staleTime: 5 * 60 * 1000,
    enabled: category !== undefined,
  });
}
