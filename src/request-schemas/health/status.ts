export const status = {
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
    }
  }