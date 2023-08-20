import { Controller, ControllerType, GET, POST } from 'fastify-decorators'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { type POSTCustomerParams, postCustomer } from '../request-schemas/customer/post-customer'
import { Customer } from '../models/Customer'
import { type POSTCustomerContactParams, postCustomerContacts } from '../request-schemas/customer/post-customer-contacts'
import { CustomerContact } from '../models/CustomerContact'
import { getCustomers, type GETCustomersParams } from '../request-schemas/customer/get-customers'

@Controller({
  route: '/',
  type: ControllerType.SINGLETON
})
export default class CustomerController {
  @POST('/customer', {
    schema: postCustomer
  })
  public async postCustomer (request: FastifyRequest, response: FastifyReply): Promise<Customer | Error> {
    const body = request.body as POSTCustomerParams

    const customer = await Customer.instantiate(body)
    await customer.save(request.orm.em)
    return await response.status(201).send(customer)
  }

  @POST('/customer-contacts', {
    schema: postCustomerContacts
  })
  public async postCustomerContacts (request: FastifyRequest, response: FastifyReply): Promise<Customer | Error> {
    const body = request.body as POSTCustomerContactParams
    console.log(body)
    const customer = await request.orm.em.findOne(Customer, {
      customer_guid: body.customer_guid
    })
    console.log(customer)
    if (typeof customer === 'undefined' || customer === null) {
      return await response
        .status(400)
        .send('Customer not found with given customer guid.')
    }

    const customerContacts = await CustomerContact.instantiate(body.contacts)
    customer.customerContacts.add(customerContacts)
    await customer.save(request.orm.em)
    return await response.status(201).send(customerContacts)
  }

  @GET('/customers', {
    schema: getCustomers
  })
  public async getCustomers (request: FastifyRequest, response: FastifyReply): Promise<Customer[] | Error> {
    const params = request.query as GETCustomersParams
    let customers
    if (typeof params.customer_guids !== 'undefined') {
      customers = await request.orm.em.find(Customer, {
        customer_guid: params.customer_guids
      })
    } else {
      customers = await request.orm.em.find(Customer, {})
    }
    return await response.status(200).send(customers)
  }
}
