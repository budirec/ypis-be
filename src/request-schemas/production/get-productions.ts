export const getProductions = {
  tags: ['production'],
  summary: "Get productions",
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
          production_guid: { type: "string" },
          status: { type: "string" },
          name: { type: "string" },
          finished_item: {
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
          author: { type: "string", nullable: true},
          production_histories: {
            nullable: true,
            type: "array",
            items: {
              type: "object",
              properties: {
                production_history_guid: {type: "string"},
                created_at: {type: "string"},
                updated_at: {type: "string"},
                production: {type: "string"},
                eventType: {type: "string"},
                label: {type: "string"},
                args: { type: "object", nullable: true, additionalProperties: true },
              }
            }
          }
        }
      }
    },
  }
}

export type GETProductionParams = {
  production_guids?: string|string[],
  include?: string;
}