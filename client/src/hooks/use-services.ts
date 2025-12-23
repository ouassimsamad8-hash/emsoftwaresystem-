import { useQuery } from '@tanstack/react-query';
import type { Service } from '@shared/schema';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

interface StrapiService {
  id: number;
  attributes: {
    slug: string;
    icon: string;
    title_en: string;
    title_fr: string;
    shortDescription_en: string;
    shortDescription_fr: string;
    fullDescription_en: string;
    fullDescription_fr: string;
    features: Array<{ en: string; fr: string }>;
    benefits: Array<{ en: string; fr: string }>;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

interface StrapiResponse {
  data: StrapiService[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

function transformService(strapiService: StrapiService): Service {
  const { attributes } = strapiService;
  
  return {
    id: strapiService.id.toString(),
    slug: attributes.slug,
    icon: attributes.icon,
    title: {
      en: attributes.title_en,
      fr: attributes.title_fr
    },
    shortDescription: {
      en: attributes.shortDescription_en,
      fr: attributes.shortDescription_fr
    },
    fullDescription: {
      en: attributes.fullDescription_en,
      fr: attributes.fullDescription_fr
    },
    features: attributes.features || [],
    benefits: attributes.benefits || []
  };
}

export function useServices() {
  return useQuery<Service[]>({
    queryKey: ['/api/services'],
    queryFn: async () => {
      const response = await fetch(`${STRAPI_URL}/api/services?populate=*`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      
      const json: StrapiResponse = await response.json();
      return json.data.map(transformService);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useService(slug: string) {
  return useQuery<Service | null>({
    queryKey: ['/api/services', slug],
    queryFn: async () => {
      const response = await fetch(
        `${STRAPI_URL}/api/services?filters[slug][$eq]=${slug}&populate=*`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch service');
      }
      
      const json: StrapiResponse = await response.json();
      
      if (json.data.length === 0) {
        return null;
      }
      
      return transformService(json.data[0]);
    },
    staleTime: 5 * 60 * 1000,
  });
}
