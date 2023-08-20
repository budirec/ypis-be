export const postCustomerContacts = {
  tags: ['customer'],
  summary: 'Add customer contacts',
  body: {
    type: 'object',
    properties: {
      customer_guid: { type: 'string', format: 'uuid' },
      contacts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            phone: { type: 'string' },
            email: { type: 'string' },
            company_position: { type: 'string' }
          }
        }
      }
    },
    required: ['customer_guid', 'contacts']
  },
  response: {
    200: {
      description: 'OK',
      type: 'array',
      items: { type: 'object' }
    }
  }
}

export interface POSTCustomerContactParams {
  customer_guid: string
  contacts: Contact[]
}

export interface Contact {
  phone: string
  email?: string
  first_name: string
  last_name: string
  company_position?: string
}
