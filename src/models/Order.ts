import {
  Entity,
  type EntityManager,
  ManyToOne,
  PrimaryKey,
  Property,
  OneToMany,
  Cascade,
  Collection
} from '@mikro-orm/core'
import { BaseModel } from './BaseModel'
import { v4 } from 'uuid'
import { type Customer } from './Customer'
import { OrderStatus } from './OrderStatus'
import { type POSTOrder } from '../request-schemas/order/post-order'
import { OrderDetail } from './OrderDetail'
import { type Item } from './Item'

@Entity({ tableName: 'orders' })
export class Order extends BaseModel {
  @PrimaryKey({ type: 'string' })
    order_guid: string = v4()

  @Property({ type: 'string' })
    order_number: string

  @Property({ type: 'string' })
    total_price: number

  @Property({ type: 'string' })
    order_date: string

  @Property({ type: 'string', nullable: true })
    expected_delivery_date: string

  @Property({ type: 'string', nullable: true })
    po: string

  @ManyToOne({
    entity: 'OrderStatus',
    fieldName: 'order_status_guid',
    eager: true,
    serializer: (value) => value.status,
    serializedName: 'order_status'
  })
    orderStatus: OrderStatus

  @ManyToOne({ entity: 'Customer', fieldName: 'customer_guid', eager: true })
    customer: Customer

  @OneToMany({
    entity: 'OrderDetail',
    mappedBy: 'order',
    cascade: [Cascade.PERSIST],
    eager: true,
    serializedName: 'customer_contacts'
  })
    orderDetail = new Collection<OrderDetail>(this)

  /**
   *
   * @param customer Customer
   * @param items Record<string, Item>
   * @param body POSTOrder
   * @param em EntityManager
   * @returns Promise<Order>
   */
  public static async instantiate (customer: Customer, items: Record<string, Item>, body: POSTOrder, em: EntityManager): Promise<Order> {
    const order = new Order()
    order.customer = customer
    const orderStatusNew = await em.findOne(OrderStatus, {
      status_slug: OrderStatus.NEW_SLUG
    })
    order.orderStatus = orderStatusNew
    if (typeof body.expected_delivery_date !== 'undefined' && body.expected_delivery_date !== null) {
      order.expected_delivery_date = body.expected_delivery_date
    }
    if (typeof body.po !== 'undefined' && body.po !== null) {
      order.po = body.po
    }
    if (typeof body.order_number !== 'undefined' && body.order_number !== null) {
      order.order_number = body.order_number
    } else {
      // todo
    }
    for (const iOrderDetail of body.order_detail) {
      const orderDetail = new OrderDetail()
      orderDetail.item = items[iOrderDetail.item_guid]
      orderDetail.quantity = iOrderDetail.quantity
      order.orderDetail.add(orderDetail)
    }
    return order
  }
}
