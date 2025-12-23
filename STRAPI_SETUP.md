# Strapi CMS Setup Guide

## Installation Status
Strapi is being installed in the `strapi-cms` directory.

## Content Types to Create

### 1. Service (Collection Type)
- **Name**: Service
- **API ID**: service
- **Fields**:
  - title_en (Text)
  - title_fr (Text)
  - slug (UID, from title_en)
  - icon (Text)
  - shortDescription_en (Text, Long)
  - shortDescription_fr (Text, Long)
  - fullDescription_en (Rich Text)
  - fullDescription_fr (Rich Text)
  - features_en (JSON)
  - features_fr (JSON)
  - benefits_en (JSON)
  - benefits_fr (JSON)

### 2. Project (Collection Type)
- **Name**: Project
- **API ID**: project
- **Fields**:
  - title_en (Text)
  - title_fr (Text)
  - slug (UID, from title_en)
  - category (Enumeration: web, mobile, custom, cloud)
  - categoryLabel_en (Text)
  - categoryLabel_fr (Text)
  - description_en (Text, Long)
  - description_fr (Text, Long)
  - image (Media, Single)
  - technologies (JSON)
  - challenge_en (Text, Long)
  - challenge_fr (Text, Long)
  - solution_en (Text, Long)
  - solution_fr (Text, Long)
  - results_en (JSON)
  - results_fr (JSON)
  - screenshots (Media, Multiple)

### 3. Blog Post (Collection Type)
- **Name**: Blog Post
- **API ID**: blog-post
- **Fields**:
  - title_en (Text)
  - title_fr (Text)
  - slug (UID, from title_en)
  - excerpt_en (Text, Long)
  - excerpt_fr (Text, Long)
  - content_en (Rich Text)
  - content_fr (Rich Text)
  - category (Text)
  - categoryLabel_en (Text)
  - categoryLabel_fr (Text)
  - image (Media, Single)
  - author (Text)
  - publishedAt (DateTime)
  - readTime (Number)

### 4. FAQ (Collection Type)
- **Name**: FAQ
- **API ID**: faq
- **Fields**:
  - question_en (Text, Long)
  - question_fr (Text, Long)
  - answer_en (Rich Text)
  - answer_fr (Rich Text)
  - category (Text)
  - order (Number)

## API Endpoints

After setup, your Strapi API will be available at:
- Local: http://localhost:1337/api
- Admin Panel: http://localhost:1337/admin

### Endpoints:
- GET /api/services
- GET /api/services/:slug
- GET /api/projects
- GET /api/projects/:slug
- GET /api/blog-posts
- GET /api/blog-posts/:slug
- GET /api/faqs

## Environment Variables

Add to your `.env` file:
```
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here
```

## Next Steps

1. Complete Strapi installation
2. Start Strapi: `cd strapi-cms && npm run develop`
3. Create admin user at http://localhost:1337/admin
4. Create content types as defined above
5. Set up permissions (make GET requests public)
6. Upload media files
7. Add content
8. Update frontend to use Strapi API
