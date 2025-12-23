import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogType?: 'website' | 'article';
  ogImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

export function SEOHead({
  title,
  description,
  keywords = [],
  ogType = 'website',
  ogImage = '/og-image.png',
  canonicalUrl,
  noindex = false,
}: SEOHeadProps) {
  const siteName = 'EM Software System';
  const baseUrl = 'https://emsoftware.com';
  
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = 'Solutions logicielles innovantes pour transformer votre entreprise. Développement web, mobile, cloud et conseil informatique.';
  
  const metaDescription = description || defaultDescription;
  const url = canonicalUrl || window.location.href;

  useEffect(() => {
    // Update title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', metaDescription);
    updateMetaTag('keywords', keywords.join(', '));
    updateMetaTag('language', 'fr');
    updateMetaTag('author', siteName);
    
    // Robots meta tag
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow');
    }

    // Open Graph meta tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', metaDescription, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:image', `${baseUrl}${ogImage}`, true);
    updateMetaTag('og:site_name', siteName, true);
    updateMetaTag('og:locale', 'fr_FR', true);

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', metaDescription);
    updateMetaTag('twitter:image', `${baseUrl}${ogImage}`);

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = url;

    // Alternate language links
    let alternateLinkEn = document.querySelector('link[hreflang="en"]') as HTMLLinkElement;
    let alternateLinkFr = document.querySelector('link[hreflang="fr"]') as HTMLLinkElement;
    
    if (!alternateLinkEn) {
      alternateLinkEn = document.createElement('link');
      alternateLinkEn.rel = 'alternate';
      alternateLinkEn.hreflang = 'en';
      document.head.appendChild(alternateLinkEn);
    }
    
    if (!alternateLinkFr) {
      alternateLinkFr = document.createElement('link');
      alternateLinkFr.rel = 'alternate';
      alternateLinkFr.hreflang = 'fr';
      document.head.appendChild(alternateLinkFr);
    }
    
    alternateLinkEn.href = url;
    alternateLinkFr.href = url;

  }, [fullTitle, metaDescription, keywords, ogType, ogImage, url, noindex]);

  return null;
}
