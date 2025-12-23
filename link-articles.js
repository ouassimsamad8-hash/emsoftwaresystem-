// Script Node.js pour lier les articles aux auteurs
import http from 'http';

const STRAPI_URL = 'http://localhost:1337';
const AUTHOR_DOC_ID = 'o7qfuxcewtjcltwxjwljygnj'; // Ouassim Samad

async function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function updateArticle(docId, authorDocId) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      data: {
        author: authorDocId
      }
    });

    const options = {
      hostname: 'localhost',
      port: 1337,
      path: `/api/blog-posts/${docId}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(responseData));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  console.log('🔗 Liaison des articles à Ouassim Samad...\n');

  try {
    // Récupérer tous les articles
    console.log('📝 Récupération des articles...');
    const response = await fetchJSON(`${STRAPI_URL}/api/blog-posts?pagination[limit]=100`);
    const articles = response.data || [];
    
    console.log(`✅ ${articles.length} articles trouvés\n`);

    // Mettre à jour chaque article
    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      const title = article.title_fr || 'Sans titre';
      
      try {
        await updateArticle(article.documentId, AUTHOR_DOC_ID);
        console.log(`  ${i + 1}. ✅ ${title.substring(0, 50)}`);
      } catch (error) {
        console.log(`  ${i + 1}. ❌ Erreur: ${title.substring(0, 50)}`);
      }
    }

    console.log('\n✨ Terminé!\n');

    // Vérification
    console.log('📊 Vérification...');
    const verification = await fetchJSON(`${STRAPI_URL}/api/blog-posts?populate=author&pagination[limit]=3`);
    const verifyArticles = verification.data || [];
    
    console.log('✅ Exemples d\'articles mis à jour:');
    verifyArticles.forEach(article => {
      const authorName = article.author?.name || 'Aucun auteur';
      console.log(`  - ${article.title_fr?.substring(0, 50)}: ${authorName}`);
    });

    console.log('\n🎉 Allez sur http://localhost:5000/blog et cliquez sur un auteur!');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

main();
