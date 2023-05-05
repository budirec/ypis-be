import { Controller, ControllerType, POST } from "fastify-decorators";
import { FastifyRequest, FastifyReply } from "fastify";
import { postItem } from "../request-schemas/item/post-item";
import { Item } from "../models/Item";

@Controller({
  route: '/',
  type: ControllerType.SINGLETON,
})
export default class ItemController{
    @POST('/item', {
      schema: postItem
    })
  public async handle(request: FastifyRequest, response: FastifyReply) {
    const itemName = request.body.item_name;
    const unitPrice = request.body.unit_price;
    const upcCode = request.body.upc_code;
    const stockQuantity = request.body.stock_quantity;
    
    if (!itemName) {
      return response.status(400).send("item_name is required.");
    }
    if (!unitPrice) {
      return response.status(400).send("unit_price is required.")
    }
    if (!stockQuantity) {
      return response.status(400).send("stock_quantity is required.")
    }
    let item;
    if (upcCode) {
      item = new Item(itemName, unitPrice, stockQuantity, upcCode);
    } else {
      item = new Item(itemName, unitPrice, stockQuantity);
    }
    await item.save();
    response.status(201).send(item);
  } 
}       