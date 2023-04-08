import { app } from "./app";

app.listen({ port: process.env.PORT, host: process.env.HOST }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
});

app.get('/status', {
  schema: {
    description: 'Get status',
    tags: ['health'],
    summary: 'Get healthcheck',
    response: {
      200: {
        description: 'OK',
        type: 'object',
        properties: {
          status: { type: 'string' }
        }
      },
    },
    security: [
      {
        "apiKey": []
      }
    ]
  }
}, async (request, response) => {
  response.send({status: 'OK'});
});