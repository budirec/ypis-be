export const postProduction = {
  tags: ['production'],
  summary: 'Create production document',
  body: {
    type: 'object',
    properties: {
      finished_item_guid: {
        type: 'string'
      },
      raw_materials: {
        type: 'object'
      },
      target: {
        type: 'number'
      },
      buffer: {
        type: 'number'
      },
      production_name: {
        type: 'string'
      }
    },
    required: ['finished_item_guid', 'raw_materials', 'target', 'buffer']
  },
  response: {
    200: {
      description: 'OK',
      type: 'object'
    }
  }
}

export interface POSTProductionParams {
  raw_materials: object
  finished_item_guid: string
  target: number
  buffer: number
  production_name?: string
}
