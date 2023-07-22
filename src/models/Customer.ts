import { Cascade, Collection, Entity, EntityManager, ManyToOne, OneToMany, PrimaryKey, Property, wrap } from "@mikro-orm/core";
import { BaseModel } from "./BaseModel";
import { v4 } from "uuid";
import { Order } from "./Order";

@Entity({tableName: 'customers'})
export class Customer extends BaseModel {
  
  @PrimaryKey({ type: 'string' })
    customer_guid: string = v4();

  @Property({ type: 'string'})
    company_name: string;
  
  @Property({ type: 'string' })
    address1: string;
  
  @Property({ type: 'string' })
    address2: string;

  @Property({ type: 'string' })
    city: string;
  
  @Property({ type: 'string' })
    state: string;
  
  @Property({ type: 'string' })
    zip: string;
    
  @OneToMany({ entity: 'Order', mappedBy: 'customer', cascade: [Cascade.PERSIST], eager: false, serializedName: 'orders'})
    orders = new Collection<Order>(this);
}