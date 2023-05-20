import { Controller, ControllerType, GET, POST } from "fastify-decorators";
import { FastifyRequest, FastifyReply } from "fastify";
import { postProduction } from "../request-schemas/production/post-production";
import { Item } from "../models/Item";
import { ProductionStatus } from "../models/ProductionStatus";
import { Production } from "../models/Production";
import { ProductionHistory } from "../models/ProductionHistory";
import { EventType } from "../models/EventType";
import { getProductions } from "../request-schemas/production/get-productions";

@Controller({
  route: '/',
  type: ControllerType.SINGLETON,
})
export default class ProductionController{
    @POST('/production', {
      schema: postProduction
    })
  public async postProduction(request: FastifyRequest, response: FastifyReply) {
    const finishedItemGuid = request.body.finished_item_guid;
    const rawMaterials = request.body.raw_materials;
    if (!finishedItemGuid) {
      return response.status(400).send("finished_item_guid is required.");
    }
    if (!rawMaterials) {
      return response.status(400).send("raw_materials is required.")
    }
    
    const item = await request.orm.em.findOne(Item, finishedItemGuid);
    if (!item) {
      return response.status(400).send("Item not found with given finished_item_guid.");
    }

    const productionStatus = await request.orm.em.findOne(ProductionStatus, { status_slug: "open" });
    const production = new Production(productionStatus, item, rawMaterials);
    const eventType = await request.orm.em.findOne(EventType, { event_type: EventType.PRODUCTION_APPROVED });
    const productionHistory = new ProductionHistory(production, eventType, "Production Approval Pending.")
    production.productionHistories.add(productionHistory);
    await production.save(request.orm.em);

    response.status(201).send(production);
  } 

  @GET('/production', {
    schema: getProductions
  })
    public async getProduction(request: FastifyRequest, response: FastifyReply) {
      const productionGuids = request.query.production_guids;
      const include = request.query.include;
      let productions;
      if (productionGuids) {
        productions = await request.orm.em.findAll(Production, {production_guid: productionGuids}, include ? {populate: include.split(',')}: {});
      }
      response.status(201).send(productions);
    } 
}