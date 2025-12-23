export default {
  async create(ctx) {
    const { data } = ctx.request.body;
    
    if (!data) {
      return ctx.badRequest('Data is required');
    }

    const { fullName, email, phone, message } = data;

    if (!fullName || !email || !phone) {
      return ctx.badRequest('Full name, email, and phone are required');
    }

    try {
      const entry = await strapi.entityService.create(
        'api::appointment-request.appointment-request',
        {
          data: {
            fullName,
            email,
            phone,
            message: message || '',
            status: 'pending',
          },
        }
      );

      return ctx.send({
        data: entry,
        message: 'Appointment request submitted successfully',
      });
    } catch (error) {
      return ctx.internalServerError('Failed to submit appointment request');
    }
  },
};
