import { Cascade, Collection, Entity, EntityManager, ManyToOne, OneToMany, PrimaryKey, Property, wrap } from "@mikro-orm/core";
import { BaseModel } from "./BaseModel";
import { v4 } from "uuid";
import { Customer } from "./Customer";

@Entity({tableName: 'customer_contacts'})
export class CustomerContact extends BaseModel {
  
  @PrimaryKey({ type: 'string' })
    customer_contact_guid: string = v4();

  @Property({ type: 'string'})
    phone: string;
  
  @Property({ type: 'string' })
    email: string;
  
  @Property({ type: 'string' })
    first_name: string;

  @Property({ type: 'string' })
    last_name: string;
  
  @Property({ type: 'string' })
    company_position: string;
    
  @ManyToOne({entity: 'Customer', fieldName: 'customer_guid', eager: true })
    customer: Customer;
}