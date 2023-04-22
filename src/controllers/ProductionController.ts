import { Controller, ControllerType, POST } from "fastify-decorators";
import { FastifyRequest, FastifyReply } from "fastify";
import { postProduction } from "../request-schemas/production/post-production";
import { Item } from "../models/Item";
import { ProductionStatus } from "../models/ProductionStatus";
import { Production } from "../models/Production";
import { EventType } from "../models/EventType";
import { ProductionHistory } from "../models/ProductionHistory";

@Controller({
  route: '/',
  type: ControllerType.SINGLETON,
})
export default class ProductionController{
    @POST('/production', {
      schema: postProduction
    })
  public async handle(request: FastifyRequest, response: FastifyReply) {
    const finishedItemGuid = request.body.finished_item_guid;
    const rawMaterials = request.body.raw_materials;
    if (!finishedItemGuid) {
      return response.status(400).send("finished_item_guid is required.");
    }
    if (!rawMaterials) {
      return response.status(400).send("raw_materials is required.")
    }
    const oItem = await Item.query().findById(finishedItemGuid);
    if (!oItem) {
      return response.status(400).send("Item not found with given finished_item_guid.");
    }
    const oProductionStatus = await ProductionStatus.query().findOne({status_slug: "open"});
    const oProduction =  await Production.query().insert({
      finished_item_guid: finishedItemGuid,
      production_status_guid: oProductionStatus.production_status_guid,
      args: rawMaterials
    });
    const oInstance =  await Production.query().findById(oProduction.production_guid);

    const oEventType = await EventType.query().findOne({event_type: "Production"});
    await ProductionHistory.query().insert({
      production_guid: oInstance.production_guid,
      event_type_guid: oEventType.event_type_guid,
      label: "Production Approval Pending."
    })

    response.status(201).send(oInstance);
  } 
}       