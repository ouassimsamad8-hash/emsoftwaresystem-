/**
 * Middleware to automatically populate nested relations
 * This ensures author.avatar is populated when fetching blog posts
 */

export default (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    // Only apply to blog-posts API responses
    if (ctx.url.includes('/api/blog-posts') && ctx.body && ctx.body.data) {
      const data = Array.isArray(ctx.body.data) ? ctx.body.data : [ctx.body.data];
      
      for (const item of data) {
        // Populate author avatar if author exists but avatar is not populated
        if (item.author && item.author.id && !item.author.avatar) {
          try {
            const authorWithAvatar = await strapi.documents('api::author.author').findOne({
              documentId: item.author.documentId,
              populate: ['avatar'],
            });
            
            if (authorWithAvatar && authorWithAvatar.avatar) {
              item.author.avatar = authorWithAvatar.avatar;
            }
          } catch (error) {
            strapi.log.error('Error populating author avatar:', error);
          }
        }
      }
    }
  };
};
