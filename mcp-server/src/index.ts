#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import fetch from "node-fetch";

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || "";

// Helper function to make Strapi API calls
async function strapiRequest(endpoint: string, options: any = {}): Promise<any> {
  const headers: any = {
    "Content-Type": "application/json",
  };

  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const response = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.statusText}`);
  }

  return response.json();
}

// Define available tools
const tools: Tool[] = [
  {
    name: "get_articles",
    description:
      "Get a list of blog articles with pagination. Returns article titles, excerpts, authors, categories, and publication dates.",
    inputSchema: {
      type: "object",
      properties: {
        page: {
          type: "number",
          description: "Page number (default: 1)",
          default: 1,
        },
        pageSize: {
          type: "number",
          description: "Number of articles per page (default: 10, max: 100)",
          default: 10,
        },
        sort: {
          type: "string",
          description: "Sort order: 'newest' or 'oldest' (default: newest)",
          enum: ["newest", "oldest"],
          default: "newest",
        },
      },
    },
  },
  {
    name: "search_articles",
    description:
      "Search for blog articles by keywords in title or content. Returns matching articles with relevance.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search query (searches in title and content)",
        },
        category: {
          type: "string",
          description: "Filter by category (optional)",
        },
        limit: {
          type: "number",
          description: "Maximum number of results (default: 10)",
          default: 10,
        },
      },
      required: ["query"],
    },
  },
  {
    name: "get_article",
    description:
      "Get full details of a specific article by its slug. Returns complete content, author info, SEO metadata, and related data.",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description: "Article slug (URL-friendly identifier)",
        },
      },
      required: ["slug"],
    },
  },
  {
    name: "get_authors",
    description:
      "Get a list of all blog authors with their profiles, expertise, and article counts.",
    inputSchema: {
      type: "object",
      properties: {
        includeStats: {
          type: "boolean",
          description: "Include article count statistics (default: true)",
          default: true,
        },
      },
    },
  },
  {
    name: "get_author_articles",
    description:
      "Get all articles written by a specific author. Returns articles with full metadata.",
    inputSchema: {
      type: "object",
      properties: {
        authorSlug: {
          type: "string",
          description: "Author slug (URL-friendly identifier)",
        },
        limit: {
          type: "number",
          description: "Maximum number of articles (default: 20)",
          default: 20,
        },
      },
      required: ["authorSlug"],
    },
  },
  {
    name: "get_categories",
    description:
      "Get all available article categories with article counts.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_blog_stats",
    description:
      "Get comprehensive blog statistics including total articles, authors, categories, and recent activity.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "create_article",
    description:
      "Create a new blog article. Requires authentication token. Returns the created article with its slug.",
    inputSchema: {
      type: "object",
      properties: {
        title_fr: {
          type: "string",
          description: "Article title in French",
        },
        content_fr: {
          type: "string",
          description: "Article content in French (markdown supported)",
        },
        excerpt_fr: {
          type: "string",
          description: "Short excerpt/summary in French",
        },
        slug: {
          type: "string",
          description: "URL-friendly slug (auto-generated if not provided)",
        },
        category: {
          type: "string",
          description: "Category identifier (e.g., 'technology', 'business')",
        },
        categoryLabel_fr: {
          type: "string",
          description: "Category label in French",
        },
        authorDocumentId: {
          type: "string",
          description: "Author's document ID from Strapi",
        },
        readTime: {
          type: "number",
          description: "Estimated reading time in minutes",
        },
        seoTitle: {
          type: "string",
          description: "SEO title (optional)",
        },
        seoDescription: {
          type: "string",
          description: "SEO description (optional)",
        },
        seoKeywords: {
          type: "string",
          description: "SEO keywords comma-separated (optional)",
        },
      },
      required: ["title_fr", "content_fr", "category", "categoryLabel_fr"],
    },
  },
  {
    name: "update_article",
    description:
      "Update an existing blog article. Requires authentication token. Returns the updated article.",
    inputSchema: {
      type: "object",
      properties: {
        documentId: {
          type: "string",
          description: "Article document ID",
        },
        title_fr: {
          type: "string",
          description: "Updated title in French",
        },
        content_fr: {
          type: "string",
          description: "Updated content in French",
        },
        excerpt_fr: {
          type: "string",
          description: "Updated excerpt in French",
        },
        category: {
          type: "string",
          description: "Updated category",
        },
        categoryLabel_fr: {
          type: "string",
          description: "Updated category label",
        },
        readTime: {
          type: "number",
          description: "Updated reading time",
        },
      },
      required: ["documentId"],
    },
  },
];

// Tool handlers
async function handleGetArticles(args: any) {
  const page = args.page || 1;
  const pageSize = Math.min(args.pageSize || 10, 100);
  const sortOrder = args.sort === "oldest" ? "asc" : "desc";

  const data = await strapiRequest(
    `/blog-posts?populate=author&sort=publishedAt:${sortOrder}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );

  const articles = data.data.map((article: any) => ({
    id: article.documentId,
    slug: article.slug,
    title: article.title_fr,
    excerpt: article.excerpt_fr,
    category: article.categoryLabel_fr,
    author: article.author?.name || "E&M Software",
    authorSlug: article.author?.slug,
    publishedAt: article.publishedAt,
    readTime: article.readTime,
  }));

  return {
    articles,
    pagination: data.meta?.pagination || {},
    total: articles.length,
  };
}

async function handleSearchArticles(args: any) {
  const { query, category, limit = 10 } = args;

  // Fetch all articles (Strapi v5 filter limitation workaround)
  const data = await strapiRequest(
    `/blog-posts?populate=author&pagination[pageSize]=100`
  );

  let articles = data.data;

  // Filter by search query (case-insensitive)
  const searchLower = query.toLowerCase();
  articles = articles.filter(
    (article: any) =>
      article.title_fr?.toLowerCase().includes(searchLower) ||
      article.content_fr?.toLowerCase().includes(searchLower) ||
      article.excerpt_fr?.toLowerCase().includes(searchLower)
  );

  // Filter by category if provided
  if (category) {
    articles = articles.filter((article: any) => article.category === category);
  }

  // Limit results
  articles = articles.slice(0, limit);

  return {
    results: articles.map((article: any) => ({
      id: article.documentId,
      slug: article.slug,
      title: article.title_fr,
      excerpt: article.excerpt_fr,
      category: article.categoryLabel_fr,
      author: article.author?.name || "E&M Software",
      authorSlug: article.author?.slug,
      publishedAt: article.publishedAt,
      readTime: article.readTime,
    })),
    total: articles.length,
    query,
  };
}

async function handleGetArticle(args: any) {
  const { slug } = args;

  const data = await strapiRequest(
    `/blog-posts?filters[slug][$eq]=${slug}&populate=author`
  );

  if (!data.data || data.data.length === 0) {
    throw new Error(`Article not found: ${slug}`);
  }

  const article = data.data[0];
  const author = article.author;

  return {
    id: article.documentId,
    slug: article.slug,
    title: article.title_fr,
    content: article.content_fr,
    excerpt: article.excerpt_fr,
    category: article.categoryLabel_fr,
    categoryId: article.category,
    author: {
      name: author?.name || "E&M Software",
      slug: author?.slug,
      role: author?.role,
      bio: author?.bio,
      avatar: author?.avatar?.url,
    },
    publishedAt: article.publishedAt,
    readTime: article.readTime,
    featuredImage: article.featuredImage?.url,
    seo: {
      title: article.seoTitle,
      description: article.seoDescription,
      keywords: article.seoKeywords,
    },
  };
}

async function handleGetAuthors(args: any) {
  const data = await strapiRequest(`/authors?populate=*`);

  const authors = data.data.map((author: any) => ({
    id: author.documentId,
    slug: author.slug,
    name: author.name,
    role: author.role,
    bio: author.bio,
    fullBio: author.fullBio,
    email: author.email,
    avatar: author.avatar?.url,
    expertise: author.expertise,
    social: author.social,
    verified: author.verified,
    totalViews: author.totalViews,
    joinedDate: author.joinedDate,
  }));

  return {
    authors,
    total: authors.length,
  };
}

async function handleGetAuthorArticles(args: any) {
  const { authorSlug, limit = 20 } = args;

  // Get all articles and filter client-side (Strapi v5 limitation)
  const data = await strapiRequest(
    `/blog-posts?populate=author&pagination[pageSize]=100`
  );

  const articles = data.data
    .filter((article: any) => article.author?.slug === authorSlug)
    .slice(0, limit)
    .map((article: any) => ({
      id: article.documentId,
      slug: article.slug,
      title: article.title_fr,
      excerpt: article.excerpt_fr,
      category: article.categoryLabel_fr,
      publishedAt: article.publishedAt,
      readTime: article.readTime,
    }));

  return {
    authorSlug,
    articles,
    total: articles.length,
  };
}

async function handleGetCategories() {
  const data = await strapiRequest(`/blog-posts?pagination[pageSize]=100`);

  const categoryMap = new Map();

  data.data.forEach((article: any) => {
    const cat = article.category;
    const label = article.categoryLabel_fr;
    if (cat) {
      const existing = categoryMap.get(cat) || { count: 0, label };
      existing.count++;
      categoryMap.set(cat, existing);
    }
  });

  const categories = Array.from(categoryMap.entries()).map(([id, data]: any) => ({
    id,
    label: data.label,
    count: data.count,
  }));

  return { categories, total: categories.length };
}

async function handleGetBlogStats() {
  const [articlesData, authorsData] = await Promise.all([
    strapiRequest(`/blog-posts?pagination[pageSize]=1`),
    strapiRequest(`/authors?pagination[pageSize]=1`),
  ]);

  const categoriesResult = await handleGetCategories();

  return {
    totalArticles: articlesData.meta?.pagination?.total || 0,
    totalAuthors: authorsData.meta?.pagination?.total || 0,
    totalCategories: categoriesResult.total,
    categories: categoriesResult.categories,
  };
}

async function handleCreateArticle(args: any) {
  if (!STRAPI_API_TOKEN) {
    throw new Error(
      "Authentication required. Set STRAPI_API_TOKEN environment variable."
    );
  }

  const articleData = {
    title_fr: args.title_fr,
    content_fr: args.content_fr,
    excerpt_fr: args.excerpt_fr,
    slug: args.slug || args.title_fr.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    category: args.category,
    categoryLabel_fr: args.categoryLabel_fr,
    readTime: args.readTime || 5,
    seoTitle: args.seoTitle,
    seoDescription: args.seoDescription,
    seoKeywords: args.seoKeywords,
    publishedAt: new Date().toISOString(),
  };

  if (args.authorDocumentId) {
    (articleData as any).author = args.authorDocumentId;
  }

  const response = await strapiRequest(`/blog-posts`, {
    method: "POST",
    body: JSON.stringify({ data: articleData }),
  });

  return {
    success: true,
    article: {
      id: response.data.documentId,
      slug: response.data.slug,
      title: response.data.title_fr,
    },
  };
}

async function handleUpdateArticle(args: any) {
  if (!STRAPI_API_TOKEN) {
    throw new Error(
      "Authentication required. Set STRAPI_API_TOKEN environment variable."
    );
  }

  const { documentId, ...updateData } = args;

  const response = await strapiRequest(`/blog-posts/${documentId}`, {
    method: "PUT",
    body: JSON.stringify({ data: updateData }),
  });

  return {
    success: true,
    article: {
      id: response.data.documentId,
      slug: response.data.slug,
      title: response.data.title_fr,
    },
  };
}

// Create and configure MCP server
const server = new Server(
  {
    name: "emsoftware-blog-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools,
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result;

    switch (name) {
      case "get_articles":
        result = await handleGetArticles(args);
        break;
      case "search_articles":
        result = await handleSearchArticles(args);
        break;
      case "get_article":
        result = await handleGetArticle(args);
        break;
      case "get_authors":
        result = await handleGetAuthors(args);
        break;
      case "get_author_articles":
        result = await handleGetAuthorArticles(args);
        break;
      case "get_categories":
        result = await handleGetCategories();
        break;
      case "get_blog_stats":
        result = await handleGetBlogStats();
        break;
      case "create_article":
        result = await handleCreateArticle(args);
        break;
      case "update_article":
        result = await handleUpdateArticle(args);
        break;
      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error: any) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("E&M Software Blog MCP Server running on stdio");
  console.error(`Connected to Strapi at: ${STRAPI_URL}`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
