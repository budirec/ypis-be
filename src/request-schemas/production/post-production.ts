export const postProduction = {
  tags: ['production'],
  summary: "Create production document",
  body: {
    type: "object",
    properties: {
      finished_item_guid: {
        type:"string"
      },
      raw_materials: {
        type:"object",
        properties: {
          additionalProperties:true
        }
      }
    },
    required:["finished_item_guid", "raw_materials"]
  },
  response: {
    200: {
      description: 'OK',
      type: 'string',
    },
  }
}