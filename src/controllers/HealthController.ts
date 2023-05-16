import { Controller, ControllerType, GET } from "fastify-decorators";
import { FastifyRequest, FastifyReply } from "fastify";
import { status } from "../request-schemas/health/status";

@Controller({
  route: '/',
  type: ControllerType.SINGLETON,
})
export default class HealthController{
    @GET('/status', {
      schema: status
    })
  public async handle(request: FastifyRequest, response: FastifyReply) {
    response.send({status: "OK"});
  } 
}       