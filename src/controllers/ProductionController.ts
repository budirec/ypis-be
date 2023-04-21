import { Controller, ControllerType, POST } from "fastify-decorators";
import { FastifyRequest, FastifyReply } from "fastify";
import { postProduction } from "../request-schemas/production/post-production";
import { Item } from "../models/Item";
import { ProductionStatus } from "../models/ProductionStatus";
import { Production } from "../models/Production";

@Controller({
  route: '/',
  type: ControllerType.SINGLETON,
})
export default class ProductionController{
    @POST('/productions', {
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
    
    const oProduction = new Production();
    oProduction.finished_item_guid = oItem.item_guid;
    oProduction.production_status_guid = oProductionStatus.production_status_guid;
    oProduction.args = rawMaterials;
    await oProduction.$query().insert();
    response.status(201).send("Production document created successfully.");
  } 
}       