import { Controller, ControllerType, GET } from "fastify-decorators";
import { FastifyRequest, FastifyReply } from "fastify";


@Controller({
    route: '/',
    type: ControllerType.SINGLETON,
  })
export default class HealthController{
    @GET('/status', {
    schema: {
        description: 'Get status',
    tags: ['health'],
    summary: 'Get healthcheck',
    response: {
      200: {
        description: 'OK',
        type: 'object',
        properties: {
          status: { type: 'string' }
        }
      },
    }
    }})
    public async handle(request: FastifyRequest, response: FastifyReply) {
        response.send({status: "OK"});
    } 
}       