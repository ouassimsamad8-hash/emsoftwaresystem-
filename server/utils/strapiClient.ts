/**
 * Strapi Client - Communication sécurisée avec Strapi
 * Token Strapi stocké côté serveur uniquement (jamais exposé au client)
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;
const env = process.env.NODE_ENV ?? 'development';

if (!STRAPI_TOKEN) {
  const message = 'STRAPI_TOKEN not configured. Admin operations will fail.';
  if (env === 'production') {
    throw new Error(message);
  } else {
    console.warn(`⚠️  ${message}`);
  }
}

export interface StrapiResponse<T = any> {
  data: T;
  meta?: any;
  error?: {
    status: number;
    name: string;
    message: string;
  };
}

/**
 * Helper pour appeler l'API Strapi avec authentification
 */
export async function callStrapi<T = any>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  body?: any
): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
  };

  if (body && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || `Strapi error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`Strapi API Error [${method} ${endpoint}]:`, error);
    throw error;
  }
}

/**
 * Upload file to Strapi
 */
export async function uploadToStrapi(formData: FormData): Promise<any> {
  const url = `${STRAPI_URL}/api/upload`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Upload failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Strapi Upload Error:', error);
    throw error;
  }
}

/**
 * Get full media URL
 */
export function getMediaUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${STRAPI_URL}${path}`;
}
