/**
 * Strapi Data Migration Script
 * 
 * This script migrates data from the existing content.ts file to Strapi CMS.
 * Run this after setting up Strapi content types and permissions.
 * 
 * Usage: 
 * 1. Start Strapi: cd strapi-cms && npm run develop
 * 2. Create an API token in Strapi Admin
 * 3. Set STRAPI_API_TOKEN in .env
 * 4. Run: npx tsx scripts/migrate-to-strapi.ts
 */

import dotenv from 'dotenv';
import { services, projects, blogPosts, faqs } from '../client/src/data/content';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables
dotenv.config();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_API_TOKEN}`
};

// Helper function to upload media to Strapi
async function uploadMedia(imagePath: string): Promise<number | null> {
  try {
    const fullPath = path.join(__dirname, '../client/public', imagePath);
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️  Image not found: ${imagePath}`);
      return null;
    }

    const formData = new FormData();
    const file = fs.readFileSync(fullPath);
    const blob = new Blob([file]);
    formData.append('files', blob, path.basename(imagePath));

    const response = await fetch(`${STRAPI_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`
      },
      body: formData
    });

    if (!response.ok) {
      console.error(`Failed to upload ${imagePath}:`, await response.text());
      return null;
    }

    const data = await response.json();
    return data[0]?.id || null;
  } catch (error) {
    console.error(`Error uploading ${imagePath}:`, error);
    return null;
  }
}

// Migrate Services
async function migrateServices() {
  console.log('\n📦 Migrating Services...');
  
  for (const service of services) {
    try {
      const data = {
        title_fr: service.title.fr,
        slug: service.slug,
        icon: service.icon,
        shortDescription_fr: service.shortDescription.fr,
        fullDescription_fr: service.fullDescription.fr,
        features_fr: service.features.map((f: any) => f.fr),
        benefits_fr: service.benefits.map((b: any) => b.fr)
      };

      const response = await fetch(`${STRAPI_URL}/api/services`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data })
      });

      if (response.ok) {
        console.log(`✅ Migrated service: ${service.title.fr}`);
      } else {
        const error = await response.json();
        console.error(`❌ Failed to migrate service: ${service.title.fr}`, JSON.stringify(error, null, 2));
      }
    } catch (error) {
      console.error(`Error migrating service ${service.title.en}:`, error);
    }
  }
}

// Migrate Projects
async function migrateProjects() {
  console.log('\n📦 Migrating Projects...');
  
  for (const project of projects) {
    try {
      // Upload main image
      const imageId = await uploadMedia(project.image);
      
      // Upload screenshots
      const screenshotIds = [];
      if (project.screenshots) {
        for (const screenshot of project.screenshots) {
          const id = await uploadMedia(screenshot);
          if (id) screenshotIds.push(id);
        }
      }

      const data = {
        title_fr: project.title.fr,
        slug: project.slug,
        category: project.category,
        categoryLabel_fr: project.categoryLabel.fr,
        description_fr: project.description.fr,
        image: imageId,
        technologies: project.technologies,
        challenge_fr: project.challenge.fr,
        solution_fr: project.solution.fr,
        results_fr: project.results.map((r: any) => r.fr),
        screenshots: screenshotIds
      };

      const response = await fetch(`${STRAPI_URL}/api/projects`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data })
      });

      if (response.ok) {
        console.log(`✅ Migrated project: ${project.title.en}`);
      } else {
        console.error(`❌ Failed to migrate project: ${project.title.en}`, await response.text());
      }
    } catch (error) {
      console.error(`Error migrating project ${project.title.en}:`, error);
    }
  }
}

// Migrate Blog Posts
async function migrateBlogPosts() {
  console.log('\n📦 Migrating Blog Posts...');
  
  for (const post of blogPosts) {
    try {
      const imageId = await uploadMedia(post.image);

      const data = {
        title_fr: post.title.fr,
        slug: post.slug,
        excerpt_fr: post.excerpt.fr,
        content_fr: post.content.fr,
        category: post.category,
        categoryLabel_fr: post.categoryLabel.fr,
        image: imageId,
        authorName: post.author,
        publishedAt: post.date,
        readTime: post.readTime
      };

      const response = await fetch(`${STRAPI_URL}/api/blog-posts`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data })
      });

      if (response.ok) {
        console.log(`✅ Migrated blog post: ${post.title.en}`);
      } else {
        console.error(`❌ Failed to migrate blog post: ${post.title.en}`, await response.text());
      }
    } catch (error) {
      console.error(`Error migrating blog post ${post.title.en}:`, error);
    }
  }
}

// Migrate FAQs
async function migrateFAQs() {
  console.log('\n📦 Migrating FAQs...');
  
  for (let i = 0; i < faqs.length; i++) {
    const faq = faqs[i];
    try {
      const data = {
        question_fr: faq.question.fr,
        answer_fr: faq.answer.fr,
        category: faq.category,
        order: i + 1
      };

      const response = await fetch(`${STRAPI_URL}/api/faqs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data })
      });

      if (response.ok) {
        console.log(`✅ Migrated FAQ: ${faq.question.en.substring(0, 50)}...`);
      } else {
        console.error(`❌ Failed to migrate FAQ`, await response.text());
      }
    } catch (error) {
      console.error(`Error migrating FAQ:`, error);
    }
  }
}

// Main migration function
async function migrate() {
  console.log('🚀 Starting Strapi data migration...');
  console.log(`📍 Strapi URL: ${STRAPI_URL}`);
  
  try {
    await migrateServices();
    await migrateProjects();
    await migrateBlogPosts();
    await migrateFAQs();
    
    console.log('\n✅ Migration completed successfully!');
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrate();
