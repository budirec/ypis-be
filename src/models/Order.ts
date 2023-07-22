import { Cascade, Collection, Entity, EntityManager, ManyToOne, OneToMany, PrimaryKey, Property, wrap } from "@mikro-orm/core";
import { BaseModel } from "./BaseModel";
import { v4 } from "uuid";
import { Customer } from "./Customer";
import { OrderStatus } from "./OrderStatus";

@Entity({tableName: 'orders'})
export class Order extends BaseModel {
  
  @PrimaryKey({ type: 'string' })
    order_guid: string = v4();
  
  @Property({ type: 'string' })
    order_date: string;
  
  @Property({ type: 'string' })
    expected_delivery_date: string;
    
  @ManyToOne({entity: 'OrderStatus', fieldName: 'order_status_guid', eager: true, serializer: value => value.status, serializedName: 'order_status'})
    orderStatus: OrderStatus;

  @ManyToOne({entity: 'Customer', fieldName: 'customer_guid', eager: true })
    customer: Customer;

}