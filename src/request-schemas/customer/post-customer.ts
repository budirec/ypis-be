export const postCustomer = {
  tags: ['customer'],
  summary: 'Register a new customer',
  body: {
    type: 'object',
    properties: {
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
      },
      code: { type: 'string' },
      company_name: { type: 'string' },
      address1: { type: 'string' },
      address2: { type: 'string' },
      city: { type: 'string' },
      state: { type: 'string' },
      zip: { type: 'string' }
    },
    required: ['contacts', 'address1', 'city', 'state', 'zip']
  },
  response: {
    200: {
      description: 'OK',
      type: 'object'
    }
  }
}

export interface POSTCustomerParams {
  contacts: [{
    phone: string
    email?: string
    first_name: string
    last_name: string
    company_position?: string
  }]
  code?: string
  company_name?: string
  address1: string
  address2?: string
  city: string
  state: string
  zip: string

}
