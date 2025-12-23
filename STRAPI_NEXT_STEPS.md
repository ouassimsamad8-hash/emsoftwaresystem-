# Strapi CMS Setup - Step-by-Step Guide

## ✅ Completed Steps

1. **Strapi Installation** - Strapi v5.31.0 installed successfully in `strapi-cms/` directory
2. **Configuration Files Created**:
   - `STRAPI_SETUP.md` - Complete setup documentation
   - `scripts/migrate-to-strapi.ts` - Data migration script
   - `client/src/lib/strapiClient.ts` - Frontend API client
   - `strapi-cms/content-types-schema.json` - Content type schemas
   - `.env.strapi` - Environment configuration template

## 📋 Next Steps (Manual Configuration Required)

### Step 1: Create Admin Account
1. Open http://localhost:1337/admin in your browser
2. Fill in the admin registration form:
   - First name
   - Last name
   - Email
   - Password (strong password required)
3. Click "Let's start"

### Step 2: Create Content Types

For each content type, follow these steps in Strapi Admin:

#### A. Service Content Type
1. Go to **Content-Type Builder** (left sidebar)
2. Click **"Create new collection type"**
3. Display name: `Service`
4. Click **Continue**
5. Add the following fields:

**Text Fields:**
- `title_en` (Text, Required)
- `title_fr` (Text, Required)
- `icon` (Text, Required)
- `categoryLabel_en` (Text)
- `categoryLabel_fr` (Text)

**UID Field:**
- `slug` (UID, Target: title_en, Required)

**Long Text Fields:**
- `shortDescription_en` (Text - Long text, Required)
- `shortDescription_fr` (Text - Long text, Required)

**Rich Text Fields:**
- `fullDescription_en` (Rich text, Required)
- `fullDescription_fr` (Rich text, Required)

**JSON Fields:**
- `features_en` (JSON)
- `features_fr` (JSON)
- `benefits_en` (JSON)
- `benefits_fr` (JSON)

6. Click **Save** (top right)
7. Click **Continue** when prompted

#### B. Project Content Type
1. Create new collection type: `Project`
2. Add fields:

**Text Fields:**
- `title_en` (Text, Required)
- `title_fr` (Text, Required)
- `categoryLabel_en` (Text, Required)
- `categoryLabel_fr` (Text, Required)

**UID:**
- `slug` (UID, Target: title_en, Required)

**Enumeration:**
- `category` (Enumeration, Required)
  - Add values: `web`, `mobile`, `custom`, `cloud`

**Long Text:**
- `description_en` (Text - Long text, Required)
- `description_fr` (Text - Long text, Required)
- `challenge_en` (Text - Long text)
- `challenge_fr` (Text - Long text)
- `solution_en` (Text - Long text)
- `solution_fr` (Text - Long text)

**Media:**
- `image` (Media - Single, Type: Images)
- `screenshots` (Media - Multiple, Type: Images)

**JSON:**
- `technologies` (JSON)
- `results_en` (JSON)
- `results_fr` (JSON)

3. Click **Save**

#### C. Blog Post Content Type
1. Create new collection type: `Blog Post`
2. Add fields:

**Text:**
- `title_en`, `title_fr`, `category`, `categoryLabel_en`, `categoryLabel_fr`, `author`

**UID:**
- `slug` (Target: title_en)

**Long Text:**
- `excerpt_en`, `excerpt_fr`

**Rich Text:**
- `content_en`, `content_fr`

**Media:**
- `image` (Single, Images)

**Date:**
- `publishedAt` (DateTime)

**Number:**
- `readTime` (Integer)

3. Click **Save**

#### D. FAQ Content Type
1. Create new collection type: `FAQ`
2. Add fields:

**Long Text:**
- `question_en` (Required)
- `question_fr` (Required)

**Rich Text:**
- `answer_en` (Required)
- `answer_fr` (Required)

**Text:**
- `category`

**Number:**
- `order` (Integer, Default: 0)

3. Click **Save**

### Step 3: Configure Permissions

1. Go to **Settings** → **Users & Permissions** → **Roles**
2. Click on **Public** role
3. Expand each content type and check these permissions:
   - ✅ `find` (list all)
   - ✅ `findOne` (get single item)
4. Click **Save**

### Step 4: Create API Token

1. Go to **Settings** → **API Tokens**
2. Click **Create new API Token**
3. Fill in:
   - Name: `Frontend Token`
   - Token duration: `Unlimited`
   - Token type: `Read-only`
4. Click **Save**
5. **IMPORTANT**: Copy the generated token immediately (it won't be shown again)
6. Add it to `.env` file:
   ```
   VITE_STRAPI_URL=http://localhost:1337
   STRAPI_API_TOKEN=your_copied_token_here
   ```

### Step 5: Upload Media Files

1. Go to **Media Library** (left sidebar)
2. Click **Add new assets**
3. Upload all images from `/client/public/`:
   - Cloud_platform_dashboard_86d0bb3f.png
   - Ecommerce_platform_interface_1b61c289.png
   - Enterprise_software_dashboard_9e058f15.png
   - Hero_team_collaboration_92bcb36d.png
   - Mobile_app_mockup_b758143d.png
   - Modern_cityscape_offices_adc8f7a9.png
   - Modern_office_interior_7cc1ed85.png
   - Project_management_software_c23ed5e4.png
   - Team_meeting_collaboration_dfc2f0e9.png
   - Web_app_dashboard_d564f681.png

### Step 6: Migrate Content

1. Ensure Strapi is running: `cd strapi-cms && npm run develop`
2. Update `.env` with your API token (from Step 4)
3. Run migration script:
   ```bash
   npx tsx scripts/migrate-to-strapi.ts
   ```
4. This will automatically populate:
   - 6 Services
   - 12 Projects (with images)
   - Blog Posts
   - FAQs

### Step 7: Update Frontend

The frontend API client is already created at `client/src/lib/strapiClient.ts`.

To switch from static data to Strapi:

1. Update imports in pages to use Strapi client:
   ```typescript
   // Instead of:
   import { services } from '@/data/content';
   
   // Use:
   import { useQuery } from '@tanstack/react-query';
   import { fetchServices } from '@/lib/strapiClient';
   
   const { data: services } = useQuery({
     queryKey: ['services'],
     queryFn: fetchServices
   });
   ```

2. Add `VITE_STRAPI_URL` to your `.env`:
   ```
   VITE_STRAPI_URL=http://localhost:1337
   ```

## 🚀 Benefits After Setup

✅ **Easy Content Management** - Update content through admin panel
✅ **No Code Changes** - Add/edit projects without touching code
✅ **Media Management** - Upload and organize images easily
✅ **Bilingual Content** - Manage EN/FR translations side by side
✅ **Version Control** - Draft and publish workflow
✅ **API Ready** - RESTful API automatically generated
✅ **Scalable** - Can switch from SQLite to PostgreSQL/MySQL later

## 📝 Current Status

- ✅ Strapi installed and running at http://localhost:1337/admin
- ✅ Migration scripts created
- ✅ Frontend API client created
- ⏳ Waiting for: Admin account creation and content type setup

## 🔗 Useful URLs

- Admin Panel: http://localhost:1337/admin
- API: http://localhost:1337/api
- Documentation: https://docs.strapi.io

## 🆘 Troubleshooting

**Problem**: Strapi won't start
- Solution: Delete `.tmp/` folder and restart

**Problem**: Can't upload images
- Solution: Check Settings → Media Library → Upload size limit

**Problem**: API returns 403
- Solution: Check Public role permissions in Settings
