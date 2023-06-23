export const getProductions = {
  tags: ['production'],
  summary: "Create production document",
  querystring:{
    type: "object",
    properties: {
      include: { type: "string" },
      production_guids: { type: "array", items:{ type:"string" }}
    }
  },
  response: {
    200: {
      description: 'OK',
      type: 'object',
      properties:{
        name: { type: "string" },
        status: { type: "string" },
        item: { type: "object", nullable: true },
        target: { type: "number" },
        buffer: { type: "number" },
        output: { type: "number", default: 0 },
        raw_materials: { type: "object" },
        author: { type: "string", nullable: true}
      }
    },
  }
}

export interface GETProductionParams {
  production_guids?: string|string[],
  include?: string;
}