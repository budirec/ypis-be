export const postItem = {
  tags: ['item'],
  summary: 'Add new item',
  body: {
    type: 'object',
    properties: {
      item_name: {
        type: 'string'
      },
      unit_price: { type: 'number', minimum: 0.01 },
      upc_code: {
        type: 'string'
      },
      stock_quantity: { type: 'number', minimum: 0.01 }
    },
    required: ['item_name', 'unit_price', 'stock_quantity']
  },
  response: {
    200: {
      description: 'OK',
      type: 'object'
    }
  }
}
