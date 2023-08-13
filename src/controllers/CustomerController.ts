import { Controller, ControllerType, POST } from 'fastify-decorators'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { type POSTCustomerParams, postCustomer } from '../request-schemas/customer/post-customer'
import { Customer } from '../models/Customer'

@Controller({
  route: '/',
  type: ControllerType.SINGLETON
})
export default class CustomerController {
  @POST('/customer', {
    schema: postCustomer
  })
  public async postProduction (request: FastifyRequest, response: FastifyReply): Promise<Customer | Error> {
    const body = request.body as POSTCustomerParams

    const customer = await Customer.instantiate(body)
    await customer.save(request.orm.em)
    return await response.status(201).send(customer)
  }
}
