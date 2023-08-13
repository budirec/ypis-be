import {
  Cascade,
  Collection,
  Entity,
  EntityManager,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
  wrap
} from '@mikro-orm/core'
import { BaseModel } from './BaseModel'
import { v4 } from 'uuid'
import { type Customer } from './Customer'
import { type OrderStatus } from './OrderStatus'
import { type Item } from './Item'
import { Order } from './Order'

@Entity({ tableName: 'order_details' })
export class OrderDetail extends BaseModel {
  @PrimaryKey({ type: 'string' })
    order_detail_guid: string = v4()

  @Property({ type: 'string' })
    order_date: string

  @Property({ type: 'string' })
    expected_delivery_date: string

  @Property({ type: 'number' })
    quantity: number

  @Property({ type: 'number' })
    quantity_acquired: number

  @Property({ type: 'number' })
    unit_price: number

  @ManyToOne({
    entity: 'OrderStatus',
    fieldName: 'order_status_guid',
    eager: true,
    serializer: (value) => value.status,
    serializedName: 'order_status'
  })
    orderStatus: OrderStatus

  @ManyToOne({ entity: 'Customer', fieldName: 'customer_guid', eager: false })
    customer: Customer

  @ManyToOne({ entity: 'Item', fieldName: 'item_guid', eager: false })
    item: Item

  @OneToOne({ entity: 'Order', eager: true, serializedName: 'orders' })
    order = Order
}
