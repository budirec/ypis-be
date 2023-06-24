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
      type: 'array',
      items:{
        type: 'object',
        properties:{
          productionStatus: { 
            type: "object", 
            properties: {
              status: {type:"string"}
            } 
          },
          finishedItem: { 
            type: "object", 
            nullable: true, 
            properties: {
              item_guid: {type: "string"},
              created_at: {type: "string"},
              updated_at: {type: "string"},
              unit_price: {type: "number"},
              stock_quantity: {type: "number"},
              upc_code: {type: "string", nullable: true},
            }
          },
          target: { type: "number" },
          buffer: { type: "number" },
          output: { type: "number", default: 0 },
          args: { type: "object", additionalProperties: true },
          author: { type: "string", nullable: true}
        }
      }
    },
  }
}

export interface GETProductionParams {
  production_guids?: string|string[],
  include?: string;
}