// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: any) {
    // Set public permissions on first boot
    try {
      const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (publicRole) {
        console.log('🔓 Setting up public permissions...');
        
        const contentTypes = ['service', 'project', 'blog-post', 'faq', 'site-setting', 'author'];
        
        for (const contentType of contentTypes) {
          try {
            await strapi.query('plugin::users-permissions.permission').updateMany({
              where: {
                action: `api::${contentType}.${contentType}.find`,
                role: publicRole.id,
              },
              data: {
                enabled: true,
              },
            });
            
            await strapi.query('plugin::users-permissions.permission').updateMany({
              where: {
                action: `api::${contentType}.${contentType}.findOne`,
                role: publicRole.id,
              },
              data: {
                enabled: true,
              },
            });
          } catch (err) {
            console.log(`Permission for ${contentType} may not exist yet`);
          }
        }
        
        console.log('✅ Public permissions configured');
      }
    } catch (error) {
      console.log('⚠️  Could not set permissions automatically');
    }
  },
};
