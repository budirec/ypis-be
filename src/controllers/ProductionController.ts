import { Controller, ControllerType, GET, POST } from "fastify-decorators";
import { FastifyRequest, FastifyReply } from "fastify";
import { postProduction, POSTProductionParams } from "../request-schemas/production/post-production";
import { Item } from "../models/Item";
import { ProductionStatus } from "../models/ProductionStatus";
import { Production } from "../models/Production";
import { ProductionHistory } from "../models/ProductionHistory";
import { EventType } from "../models/EventType";
import { getProductions, GETProductionParams } from "../request-schemas/production/get-productions";

@Controller({
  route: '/',
  type: ControllerType.SINGLETON,
})
export default class ProductionController{
  @POST('/production', {
    schema: postProduction
  })
  public async postProduction(request: FastifyRequest, response: FastifyReply) {
    const body = <POSTProductionParams>request.body;
    const item = await request.orm.em.findOne(Item, { item_guid: body.finished_item_guid });
    if (!item) {
      return response.status(400).send("Item not found with given finished_item_guid.");
    }

    const productionStatus = await request.orm.em.findOne(ProductionStatus, { status_slug: "open" });
    const production = await Production.instantiate(
      productionStatus,
      item,
      body.raw_materials,
      body.target,
      body.buffer,
      request.orm.em,
      body.production_name || null
    );
    const eventType = await request.orm.em.findOne(EventType, { event_type: EventType.PRODUCTION_APPROVED });
    const productionHistory = new ProductionHistory(production, eventType, "Production Approval Pending.")
    production.productionHistories.add(productionHistory);
    await production.save(request.orm.em);

    response.status(201).send(production);
  }

  @GET('/productions', {
    schema: getProductions
  })
  public async getProduction(request: FastifyRequest, response: FastifyReply) {
    const params = <GETProductionParams>request.query;
    let productions;
    if (params.production_guids) {
      productions = await request.orm.em.find(Production, {production_guid: params.production_guids});
    } else {
      productions = await request.orm.em.find(Production,{});
    }
    response.status(200).send(productions);

  } 
}