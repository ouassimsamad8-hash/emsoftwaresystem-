/**
 * Script to migrate team members to Strapi
 */

import dotenv from 'dotenv';
import { teamMembers } from '../client/src/data/content';

dotenv.config();

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

async function migrateTeamMembers() {
  console.log('\n📦 Migrating Team Members...');
  
  for (const member of teamMembers) {
    try {
      const data = {
        name: member.name,
        role_fr: member.role.fr,
        role_en: member.role.en,
        bio_fr: member.bio.fr,
        bio_en: member.bio.en,
        email: member.email,
        linkedin: member.linkedin,
        twitter: member.twitter,
        expertise: member.expertise,
        order: member.order,
        publishedAt: new Date().toISOString()
      };

      const response = await fetch(`${STRAPI_URL}/api/team-members`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data })
      });

      if (response.ok) {
        console.log(`✅ Migrated team member: ${member.name}`);
      } else {
        const error = await response.json();
        console.error(`❌ Failed to migrate team member: ${member.name}`, JSON.stringify(error, null, 2));
      }
    } catch (error) {
      console.error(`Error migrating team member ${member.name}:`, error);
    }
  }
}

async function migrate() {
  console.log('🚀 Starting team members migration to Strapi...');
  console.log(`📍 Strapi URL: ${STRAPI_URL}\n`);

  await migrateTeamMembers();

  console.log('\n✅ Migration completed!');
}

migrate().catch(console.error);
