export default {
  routes: [
    {
      method: 'POST',
      path: '/appointment-requests',
      handler: 'appointment-request.create',
      config: {
        auth: false,
      },
    },
  ],
};
