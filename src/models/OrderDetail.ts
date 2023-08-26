import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property
} from '@mikro-orm/core'
import { BaseModel } from './BaseModel'
import { v4 } from 'uuid'
import { type Customer } from './Customer'
import { type Item } from './Item'
import { Order } from './Order'

@Entity({ tableName: 'order_details' })
export class OrderDetail extends BaseModel {
  @PrimaryKey({ type: 'string' })
    order_detail_guid: string = v4()

  @Property({ type: 'number' })
    quantity: number

  @Property({ type: 'number' })
    quantity_acquired: number

  @Property({ type: 'number' })
    unit_price: number

  @ManyToOne({ entity: 'Customer', fieldName: 'customer_guid', eager: false })
    customer: Customer

  @ManyToOne({ entity: 'Item', fieldName: 'item_guid', eager: false })
    item: Item

  @ManyToOne({ entity: 'Order', eager: true, serializedName: 'orders' })
    order = Order
}
