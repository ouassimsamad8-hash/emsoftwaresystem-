/**
 * Wait for Strapi to be ready before running migration
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const MAX_RETRIES = 30;
const RETRY_DELAY = 2000; // 2 seconds

async function waitForStrapi(): Promise<void> {
  console.log(`⏳ Waiting for Strapi at ${STRAPI_URL}...`);
  
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const response = await fetch(`${STRAPI_URL}/_health`);
      if (response.ok) {
        console.log(`✅ Strapi is ready!`);
        return;
      }
    } catch (error) {
      // Strapi not ready yet
    }
    
    process.stdout.write(`.`);
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
  }
  
  throw new Error(`❌ Strapi did not start within ${(MAX_RETRIES * RETRY_DELAY) / 1000} seconds`);
}

waitForStrapi()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
