export const swaggerConfig = {
  routePrefix: "/documentation",
  exposeRoute: true,
  openapi: {
    openapi: "3.0.3", 
    info: {
      title: "Test swagger",
      description: "testing the fastify swagger api",
      version: "1.0.0"
    },
    consumes:["application/json"],
    produces:["application/json"],
    host: "localhost:80",
    schemes: ["http","https"],
    components: {
    },
    
    hideUntagged: true,
    exposeRoute: true
  }
};