import { useQuery } from '@tanstack/react-query';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

interface StrapiFAQ {
  id: number;
  documentId: string;
  question_fr: string;
  answer_fr: string;
  category: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  categoryLabel: string;
  order: number;
}

export function useFAQs() {
  return useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const response = await fetch(`${STRAPI_URL}/api/faqs?sort=order:asc`);
      if (!response.ok) {
        throw new Error('Failed to fetch FAQs');
      }
      const data = await response.json();
      
      // Transform Strapi data to frontend format
      const faqs: FAQ[] = data.data.map((item: any) => {
        // Handle both flat and nested response formats
        const faq = item.attributes || item;
        return {
          id: item.documentId || item.id?.toString() || '',
          question: faq.question_fr || '',
          answer: faq.answer_fr || '',
          category: faq.category || 'Général',
          categoryLabel: faq.category || 'Général', // Use category as label directly
          order: faq.order || 0,
        };
      });
      
      return faqs;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
