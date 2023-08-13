import { Controller, ControllerType, GET, POST } from 'fastify-decorators'
import { type FastifyRequest, type FastifyReply } from 'fastify'

@Controller({
  route: '/',
  type: ControllerType.SINGLETON
})
export default class OrderController {
  @POST('/order', {
    schema: {}
  })
  public async postProduction (request: FastifyRequest, response: FastifyReply) {
    response.status(201).send({})
  }
}
