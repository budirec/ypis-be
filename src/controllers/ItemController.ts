import { Controller, ControllerType, POST } from 'fastify-decorators'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { postItem } from '../request-schemas/item/post-item'
import { Item } from '../models/Item'

@Controller({
  route: '/',
  type: ControllerType.SINGLETON
})
export default class ItemController {
  @POST('/item', {
    schema: postItem
  })
  public async handle (request: FastifyRequest, response: FastifyReply): Promise<Item | Error> {
    const itemName = request.body.item_name
    const unitPrice = request.body.unit_price
    const upcCode = request.body.upc_code
    const stockQuantity = request.body.stock_quantity

    if (!itemName) {
      return await response.status(400).send('item_name is required.')
    }
    if (!unitPrice) {
      return await response.status(400).send('unit_price is required.')
    }
    if (!stockQuantity) {
      return await response.status(400).send('stock_quantity is required.')
    }
    const item = new Item(itemName, unitPrice, stockQuantity, upcCode)

    await item.save(request.orm.em)
    return await response.status(201).send(item)
  }
}
