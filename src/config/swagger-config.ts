export const swaggerConfig = {
  openapi: {
    mode: 'dynamic',
    openapi: '3.0.3',
    info: {
      title: 'Yummy Products',
      description: 'Yummy Products',
      version: '1.0.0'
    },
    consumes: ['application/json'],
    produces: ['application/json'],
    host: 'localhost',
    schemes: ['http', 'https'],
    components: {},
    hideUntagged: true,
    exposeRoute: true
  }
}
