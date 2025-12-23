/**
 * Admin Panel Routes
 * Routes protégées pour la gestion du contenu via l'interface admin
 */

import type { Request, Response } from 'express';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import { requireAdminAuth, verifyAdminCredentials, generateAdminToken, verifyAdminToken } from './middleware/adminAuth';
import { callStrapi, uploadToStrapi, type StrapiResponse } from './utils/strapiClient';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim();
}

function normalizeOptional(value: unknown): string | null {
  if (typeof value !== 'string') return value === null ? null : value === undefined ? null : String(value);
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function toNullableInt(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const parsed = Number.parseInt(String(value), 10);
  return Number.isNaN(parsed) ? null : parsed;
}

type StrapiMethod = 'GET' | 'PUT' | 'DELETE';

function resolveDocumentIdParam(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function buildResourcePaths(resource: string, id: string, documentId: string | null): string[] {
  const attempts: string[] = [];
  if (documentId) {
    attempts.push(`/${resource}/${encodeURIComponent(documentId)}`);
  }
  attempts.push(`/${resource}/${encodeURIComponent(id)}`);
  return attempts;
}

function isStrapiNotFoundError(error: unknown): boolean {
  if (!error) return false;
  if (error instanceof Error) {
    return error.message.toLowerCase().includes('not found');
  }
  if (typeof error === 'string') {
    return error.toLowerCase().includes('not found');
  }
  return false;
}

async function callStrapiWithPathFallback<T>(
  method: StrapiMethod,
  resource: string,
  id: string,
  documentId: string | null,
  options: { querySuffix?: string; body?: unknown } = {},
): Promise<StrapiResponse<T>> {
  const paths = buildResourcePaths(resource, id, documentId);
  let lastError: Error | null = null;

  for (const basePath of paths) {
    const endpoint = `${basePath}${options.querySuffix ?? ''}`;
    try {
      const body = method === 'PUT' ? options.body : undefined;
      return await callStrapi<T>(method, endpoint, body);
    } catch (error) {
      const errInstance = error instanceof Error ? error : new Error(String(error));
      lastError = errInstance;
      if (!isStrapiNotFoundError(error)) {
        throw errInstance;
      }
    }
  }

  throw lastError ?? new Error('Not Found');
}

export function registerAdminRoutes(app: any) {
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (_req, file, cb) => {
      const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
      if (allowed.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Unsupported file type'));
      }
    }
  });
  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: 'Too many login attempts, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
  });
  
  // ============================================================
  // AUTHENTICATION
  // ============================================================
  
  /**
   * POST /api/admin/login
   * Authentification admin
   */
  app.post('/api/admin/login', loginLimiter, async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ 
          error: 'Missing credentials',
          message: 'Username and password are required' 
        });
      }

      if (!verifyAdminCredentials(username, password)) {
        return res.status(401).json({ 
          error: 'Invalid credentials',
          message: 'Username or password incorrect' 
        });
      }

      const token = generateAdminToken(username);

      res.json({
        success: true,
        token,
        user: {
          username,
          role: 'admin',
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ 
        error: 'Login failed',
        message: 'An error occurred during login' 
      });
    }
  });

  /**
   * GET /api/admin/verify
   * Vérifie si le token est valide
   */
  app.get('/api/admin/verify', (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ valid: false });
      }

      const token = authHeader.substring(7);
      const user = verifyAdminToken(token);

      if (!user) {
        return res.status(401).json({ valid: false });
      }

      res.json({ 
        valid: true,
        user 
      });
    } catch (error) {
      res.status(401).json({ valid: false });
    }
  });

  /**
   * POST /api/admin/logout
   * Logout (côté client supprimera le token)
   */
  app.post('/api/admin/logout', requireAdminAuth, (req: Request, res: Response) => {
    res.json({ success: true });
  });

  // ============================================================
  // BLOG POSTS
  // ============================================================

  app.get('/api/admin/authors', requireAdminAuth, async (_req: Request, res: Response) => {
    try {
      const data = await callStrapi('GET', '/authors?populate=*');
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  /**
   * GET /api/admin/blog-posts
   * Liste tous les articles
   */
  app.get('/api/admin/blog-posts', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const { page = 1, pageSize = 10, search = '' } = req.query;
      
      let endpoint = `/blog-posts?populate=*&publicationState=preview&locale=all&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc`;
      
      if (search) {
        const normalized = encodeURIComponent(String(search));
        endpoint += `&filters[$or][0][title_fr][$containsi]=${normalized}&filters[$or][1][title_en][$containsi]=${normalized}&filters[$or][2][title][$containsi]=${normalized}`;
      }

      const data = await callStrapi('GET', endpoint);
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  /**
   * GET /api/admin/blog-posts/:id
   * Détail d'un article
   */
  app.get('/api/admin/blog-posts/:id', requireAdminAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const preview = req.query.preview === 'true';
    const localeParam = req.query.locale ? `&locale=${req.query.locale}` : '';
    const publicationState = preview ? '&publicationState=preview' : '';
    const documentIdParam = resolveDocumentIdParam(req.query.documentId);
    const querySuffix = `?populate=*${publicationState}${localeParam}`;

    try {
      const data = await callStrapiWithPathFallback('GET', 'blog-posts', id, documentIdParam, { querySuffix });
      res.json(data);
      return;
    } catch (error: any) {
      if (!documentIdParam || !isStrapiNotFoundError(error)) {
        const status = isStrapiNotFoundError(error) ? 404 : 500;
        res.status(status).json({ error: error?.message ?? 'Failed to fetch blog post' });
        return;
      }
    }

    try {
      const encodedDocId = encodeURIComponent(documentIdParam);
      const fallbackEndpoint = `/blog-posts?filters[documentId][$eq]=${encodedDocId}${publicationState}${localeParam}&populate=*`;
      const fallback = await callStrapi('GET', fallbackEndpoint);
      const fallbackData = Array.isArray(fallback?.data) ? fallback.data[0] : undefined;

      if (fallbackData) {
        res.json({ data: fallbackData, meta: fallback.meta });
        return;
      }

      res.status(404).json({ error: 'Not Found' });
    } catch (fallbackError: any) {
      const status = isStrapiNotFoundError(fallbackError) ? 404 : 500;
      res.status(status).json({ error: fallbackError?.message ?? 'Failed to fetch blog post' });
    }
  });

  /**
   * POST /api/admin/blog-posts
   * Créer un article
   */
  app.post('/api/admin/blog-posts', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const payload = req.body ?? {};
      const title = typeof payload.title_fr === 'string' ? payload.title_fr.trim() : '';
      const content = typeof payload.content_fr === 'string' ? payload.content_fr.trim() : '';

      if (!title) {
        return res.status(400).json({ error: 'Title is required.' });
      }

      if (!content) {
        return res.status(400).json({ error: 'Content is required.' });
      }

      const initialSlug = slugify(title) || slugify(`${title}-${Date.now()}`);
      const authorId = toNullableInt(payload.author ?? payload.authorId);
      const readTime = toNullableInt(payload.readTime);
      const imageId = toNullableInt(payload.image ?? payload.imageId ?? payload.featuredImage);
      const baseData = {
        title_fr: title,
        content_fr: content,
        excerpt_fr: normalizeOptional(payload.excerpt_fr),
        category: normalizeOptional(payload.category),
        categoryLabel_fr: normalizeOptional(payload.categoryLabel_fr ?? payload.category),
        slug: initialSlug,
        author: authorId ?? undefined,
        authorName: normalizeOptional(payload.authorName) ?? undefined,
        readTime: readTime ?? undefined,
        seoTitle: normalizeOptional(payload.seoTitle) ?? undefined,
        seoDescription: normalizeOptional(payload.seoDescription) ?? undefined,
        seoKeywords: normalizeOptional(payload.seoKeywords) ?? undefined,
        image: imageId ?? undefined,
        featuredImage: imageId ?? undefined,
        publishedAt:
          payload.publishNow === true || payload.publishedAt
            ? (payload.publishedAt ?? new Date().toISOString())
            : null,
      } as const;

      try {
        const data = await callStrapi('POST', '/blog-posts', { data: baseData });
        res.json(data);
        return;
      } catch (error: any) {
        const message = error?.message ?? '';
        if (typeof message === 'string' && message.toLowerCase().includes('unique')) {
          try {
            const fallbackSlug = slugify(`${title}-${Date.now()}`);
            const retry = await callStrapi('POST', '/blog-posts', {
              data: {
                ...baseData,
                slug: fallbackSlug,
              },
            });
            res.json(retry);
            return;
          } catch (retryError: any) {
            res.status(500).json({ error: retryError?.message ?? 'Failed to create blog post' });
            return;
          }
        }

        res.status(500).json({ error: message || 'Failed to create blog post' });
      }
    } catch (outerError: any) {
      res.status(500).json({ error: outerError?.message ?? 'Failed to create blog post' });
    }
  });

  /**
   * PUT /api/admin/blog-posts/:id
   * Modifier un article
   */
  app.put('/api/admin/blog-posts/:id', requireAdminAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body ?? {};
    const normalized: Record<string, unknown> = {};
    const documentIdParam = resolveDocumentIdParam(req.query.documentId);

    Object.entries(payload).forEach(([key, value]) => {
      if (key === 'publishNow') {
        return;
      }

      if (value === undefined || value === '') {
        return;
      }

      if (key === 'publishedAt' && value === null) {
        normalized.publishedAt = null;
        return;
      }

      normalized[key] = value;
    });

    try {
      const data = await callStrapiWithPathFallback('PUT', 'blog-posts', id, documentIdParam, {
        body: { data: normalized },
      });
      res.json(data);
    } catch (error: any) {
      const status = isStrapiNotFoundError(error) ? 404 : 500;
      res.status(status).json({ error: error?.message ?? 'Failed to update blog post' });
    }
  });

  /**
   * DELETE /api/admin/blog-posts/:id
   * Supprimer un article
   */
  app.delete('/api/admin/blog-posts/:id', requireAdminAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const documentIdParam = resolveDocumentIdParam(req.query.documentId);

    try {
      const result = await callStrapiWithPathFallback('DELETE', 'blog-posts', id, documentIdParam);
      res.json(result ?? { success: true });
    } catch (error: any) {
      const status = isStrapiNotFoundError(error) ? 404 : 500;
      res.status(status).json({ error: error?.message ?? 'Failed to delete blog post' });
    }
  });

  // ============================================================
  // SERVICES
  // ============================================================

  app.get('/api/admin/services', requireAdminAuth, async (_req: Request, res: Response) => {
    try {
      const data = await callStrapi('GET', '/services?populate=*');
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/admin/services/:id', requireAdminAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const documentIdParam = resolveDocumentIdParam(req.query.documentId);

    try {
      const data = await callStrapiWithPathFallback('GET', 'services', id, documentIdParam, {
        querySuffix: '?populate=*',
      });
      res.json(data);
    } catch (error: any) {
      const status = isStrapiNotFoundError(error) ? 404 : 500;
      res.status(status).json({ error: error?.message ?? 'Failed to fetch service' });
    }
  });

  app.post('/api/admin/services', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const data = await callStrapi('POST', '/services', { data: req.body });
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put('/api/admin/services/:id', requireAdminAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const documentIdParam = resolveDocumentIdParam(req.query.documentId);

    try {
      const data = await callStrapiWithPathFallback('PUT', 'services', id, documentIdParam, {
        body: { data: req.body },
      });
      res.json(data);
    } catch (error: any) {
      const status = isStrapiNotFoundError(error) ? 404 : 500;
      res.status(status).json({ error: error?.message ?? 'Failed to update service' });
    }
  });

  app.delete('/api/admin/services/:id', requireAdminAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const documentIdParam = resolveDocumentIdParam(req.query.documentId);

    try {
      const result = await callStrapiWithPathFallback('DELETE', 'services', id, documentIdParam);
      res.json(result ?? { success: true });
    } catch (error: any) {
      const status = isStrapiNotFoundError(error) ? 404 : 500;
      res.status(status).json({ error: error?.message ?? 'Failed to delete service' });
    }
  });

  // ============================================================
  // PROJECTS
  // ============================================================

  app.get('/api/admin/projects', requireAdminAuth, async (_req: Request, res: Response) => {
    try {
      const data = await callStrapi('GET', '/projects?populate=*');
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/admin/projects/:id', requireAdminAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const documentIdParam = resolveDocumentIdParam(req.query.documentId);

    try {
      const data = await callStrapiWithPathFallback('GET', 'projects', id, documentIdParam, {
        querySuffix: '?populate=*',
      });
      res.json(data);
    } catch (error: any) {
      const status = isStrapiNotFoundError(error) ? 404 : 500;
      res.status(status).json({ error: error?.message ?? 'Failed to fetch project' });
    }
  });

  app.post('/api/admin/projects', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const data = await callStrapi('POST', '/projects', { data: req.body });
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put('/api/admin/projects/:id', requireAdminAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const documentIdParam = resolveDocumentIdParam(req.query.documentId);

    try {
      const data = await callStrapiWithPathFallback('PUT', 'projects', id, documentIdParam, {
        body: { data: req.body },
      });
      res.json(data);
    } catch (error: any) {
      const status = isStrapiNotFoundError(error) ? 404 : 500;
      res.status(status).json({ error: error?.message ?? 'Failed to update project' });
    }
  });

  app.delete('/api/admin/projects/:id', requireAdminAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const documentIdParam = resolveDocumentIdParam(req.query.documentId);

    try {
      const result = await callStrapiWithPathFallback('DELETE', 'projects', id, documentIdParam);
      res.json(result ?? { success: true });
    } catch (error: any) {
      const status = isStrapiNotFoundError(error) ? 404 : 500;
      res.status(status).json({ error: error?.message ?? 'Failed to delete project' });
    }
  });

  // ============================================================
  // FAQS
  // ============================================================

  app.get('/api/admin/faqs', requireAdminAuth, async (_req: Request, res: Response) => {
    try {
      const data = await callStrapi('GET', '/faqs?sort=order:asc');
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/admin/faqs/:id', requireAdminAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const documentIdParam = resolveDocumentIdParam(req.query.documentId);

    try {
      const data = await callStrapiWithPathFallback('GET', 'faqs', id, documentIdParam);
      res.json(data);
    } catch (error: any) {
      const status = isStrapiNotFoundError(error) ? 404 : 500;
      res.status(status).json({ error: error?.message ?? 'Failed to fetch FAQ' });
    }
  });

  app.post('/api/admin/faqs', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const data = await callStrapi('POST', '/faqs', { data: req.body });
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put('/api/admin/faqs/:id', requireAdminAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const documentIdParam = resolveDocumentIdParam(req.query.documentId);

    try {
      const data = await callStrapiWithPathFallback('PUT', 'faqs', id, documentIdParam, {
        body: { data: req.body },
      });
      res.json(data);
    } catch (error: any) {
      const status = isStrapiNotFoundError(error) ? 404 : 500;
      res.status(status).json({ error: error?.message ?? 'Failed to update FAQ' });
    }
  });

  app.delete('/api/admin/faqs/:id', requireAdminAuth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const documentIdParam = resolveDocumentIdParam(req.query.documentId);

    try {
      const result = await callStrapiWithPathFallback('DELETE', 'faqs', id, documentIdParam);
      res.json(result ?? { success: true });
    } catch (error: any) {
      const status = isStrapiNotFoundError(error) ? 404 : 500;
      res.status(status).json({ error: error?.message ?? 'Failed to delete FAQ' });
    }
  });

  // ============================================================
  // APPOINTMENTS
  // ============================================================

  app.get('/api/admin/appointments', requireAdminAuth, async (req: Request, res: Response) => {
    const { status, page: rawPage = "1", pageSize: rawPageSize = "20" } = req.query;
    const currentPage = Number(rawPage ?? 1) || 1;
    const currentPageSize = Number(rawPageSize ?? 20) || 20;
    const statusFilter = typeof status === "string" ? status : undefined;

    try {
      let endpoint = `/appointment-requests?pagination[page]=${currentPage}&pagination[pageSize]=${currentPageSize}&sort=createdAt:desc`;

      if (statusFilter && statusFilter !== 'all') {
        endpoint += `&filters[status][$eq]=${statusFilter}`;
      }

      const data = await callStrapi('GET', endpoint);
      res.json(data);
    } catch (error: any) {
      if (error instanceof Error && error.message === 'Not Found') {
        return res.json({
          data: [],
          meta: {
            pagination: {
              page: currentPage,
              pageSize: currentPageSize,
              pageCount: 0,
              total: 0,
            },
          },
        });
      }

      res.status(500).json({ error: error?.message ?? 'Failed to fetch appointments' });
    }
  });

  app.put('/api/admin/appointments/:id', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await callStrapi('PUT', `/appointment-requests/${id}`, { data: req.body });
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ============================================================
  // SITE SETTINGS
  // ============================================================

  app.get('/api/admin/site-settings', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const data = await callStrapi('GET', '/site-setting?populate=*');
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put('/api/admin/site-settings', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const data = await callStrapi('PUT', '/site-setting', { data: req.body });
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ============================================================
  // MEDIA UPLOAD
  // ============================================================

  app.post('/api/admin/upload', requireAdminAuth, upload.single('file'), async (req: Request, res: Response) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: 'File is required' });
      }

      const formData = new FormData();
      const buffer = file.buffer;
      const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
      const blob = new Blob([arrayBuffer], { type: file.mimetype || 'application/octet-stream' });
      formData.append('files', blob, file.originalname);

      const body = req.body ?? {};
      Object.entries(body).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, String(value));
        }
      });

      const uploaded = await uploadToStrapi(formData);
      res.json({ files: uploaded });
    } catch (error: any) {
      res.status(500).json({ error: error.message ?? 'Upload failed' });
    }
  });
}
