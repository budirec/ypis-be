export const postOrder = {
  tags: ['order'],
  summary: 'Create a new order',
  body: {
    type: 'object',
    properties: {
      order_number: { type: 'string' },
      customer_guid: { type: 'string' },
      expected_delivery_date: { type: 'string' },
      po: { type: 'string' },
      order_detail: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            item_guid: { type: 'array' },
            quantity: { type: 'number', minimum: 0.01 }
          }
        }
      }

    },
    required: ['customer_guid', 'order_detail']
  },
  response: {
    200: {
      description: 'OK',
      type: 'object'
    }
  }
}

export interface POSTOrder {
  order_number?: string
  customer_guid: string
  expected_delivery_date?: string
  po?: string
  order_detail: [{
    item_guid: string
    quantity: number
  }]
}
