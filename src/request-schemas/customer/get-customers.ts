export const getCustomers = {
  tags: ['customer'],
  summary: 'Get customers',
  querystring: {
    type: 'object',
    properties: {
      customer_guids: { type: 'array', items: { type: 'string' } }
    }
  },
  response: {
    200: {
      description: 'OK',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          customer_guid: { type: 'string', format: 'guid' },
          code: { type: 'string', nullable: true },
          company_name: { type: 'string', nullable: true },
          address1: { type: 'string' },
          address2: { type: 'string', nullable: true },
          city: { type: 'string' },
          state: { type: 'string' },
          zip: { type: 'string' },
          customer_contacts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                customer_contact_guid: { type: 'string', format: 'uuid' },
                phone: { type: 'string' },
                email: { type: 'string', nullable: true },
                fist_name: { type: 'string' },
                last_name: { type: 'string' },
                company_position: { type: 'string', nullable: true }
              }
            }
          }
        }
      }
    }
  }
}

export interface GETCustomersParams {
  customer_guids?: string[]
}
