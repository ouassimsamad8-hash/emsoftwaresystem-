import { useQuery } from '@tanstack/react-query';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

interface SiteSettings {
  logo?: {
    url: string;
    alternativeText?: string;
  };
  logoLight?: {
    url: string;
    alternativeText?: string;
  };
  favicon?: {
    url: string;
  };
  siteName?: string;
  siteDescription_fr?: string;
  contactEmail?: string;
  contactPhone?: string;
  address_fr?: string;
  socialLinks?: any;
}

export function useSiteSettings() {
  return useQuery<SiteSettings>({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const response = await fetch(`${STRAPI_URL}/api/site-setting?populate=*`);
      if (!response.ok) {
        throw new Error('Failed to fetch site settings');
      }
      const data = await response.json();
      
      // Transform Strapi format to our format
      const settings: SiteSettings = {};
      
      if (data.data?.logo) {
        settings.logo = {
          url: `${STRAPI_URL}${data.data.logo.url}`,
          alternativeText: data.data.logo.alternativeText || 'Logo',
        };
      }
      
      if (data.data?.logoLight) {
        settings.logoLight = {
          url: `${STRAPI_URL}${data.data.logoLight.url}`,
          alternativeText: data.data.logoLight.alternativeText || 'Logo Light',
        };
      }
      
      if (data.data?.favicon) {
        settings.favicon = {
          url: `${STRAPI_URL}${data.data.favicon.url}`,
        };
      }
      
      if (data.data?.siteName) settings.siteName = data.data.siteName;
      if (data.data?.siteDescription_fr) settings.siteDescription_fr = data.data.siteDescription_fr;
      if (data.data?.contactEmail) settings.contactEmail = data.data.contactEmail;
      if (data.data?.contactPhone) settings.contactPhone = data.data.contactPhone;
      if (data.data?.address_fr) settings.address_fr = data.data.address_fr;
      if (data.data?.socialLinks) settings.socialLinks = data.data.socialLinks;
      
      return settings;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}
