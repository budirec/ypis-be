import { Controller, ControllerType, GET, POST } from 'fastify-decorators'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { type POSTOrder } from '../request-schemas/order/post-order'
import { Order } from '../models/Order'
import { Customer } from '../models/Customer'
import { Item } from '../models/Item'

@Controller({
  route: '/',
  type: ControllerType.SINGLETON
})
export default class OrderController {
  @POST('/order', {
    schema: {}
  })
  public async postOrder (request: FastifyRequest, response: FastifyReply): Promise<Order | Error> {
    const body = request.body as POSTOrder
    const customer = await request.orm.em.findOne(Customer, {
      customer_guid: body.customer_guid
    })
    const items: Record<string, Item> = {}
    for (const orderDetail of body.order_detail) {
      const item = await request.orm.em.findOne(Item, {
        item_guid: orderDetail.item_guid
      })
      if (typeof item === 'undefined' || item === null) {
        return await response
          .status(400)
          .send('One or more items given in the order detail not found.')
      }
      items[item.item_guid] = item
    }
    if (typeof customer === 'undefined' || customer === null) {
      return await response
        .status(400)
        .send('Customer not found with given customer guid.')
    }

    const order = await Order.instantiate(customer, items, body, request.orm.em)
    await order.save(request.orm.em)
    return await response.status(201).send(order)
  }
}
