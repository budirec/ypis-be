import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property
} from '@mikro-orm/core'
import { BaseModel } from './BaseModel'
import { v4 } from 'uuid'
import { type Order } from './Order'
import { type POSTCustomerParams } from '../request-schemas/customer/post-customer'
import { CustomerContact } from './CustomerContact'

@Entity({ tableName: 'customers' })
export class Customer extends BaseModel {
  @PrimaryKey({ type: 'string' })
    customer_guid: string = v4()

  @Property({ type: 'string', nullable: true })
    code?: string

  @Property({ type: 'string', nullable: true })
    company_name?: string

  @Property({ type: 'string' })
    address1: string

  @Property({ type: 'string', nullable: true })
    address2?: string

  @Property({ type: 'string' })
    city: string

  @Property({ type: 'string' })
    state: string

  @Property({ type: 'string' })
    zip: string

  @OneToMany({
    entity: 'Order',
    mappedBy: 'customer',
    cascade: [Cascade.PERSIST],
    eager: false,
    serializedName: 'orders'
  })
    orders = new Collection<Order>(this)

  @OneToMany({
    entity: 'CustomerContact',
    mappedBy: 'customer',
    cascade: [Cascade.PERSIST],
    eager: true,
    serializedName: 'customer_contacts'
  })
    customerContacts = new Collection<CustomerContact>(this)

  /**
     *
     * @param body POSTCustomerParams
     * @returns Promise<Customer>
     */
  public static async instantiate (body: POSTCustomerParams): Promise<Customer> {
    const customer = new Customer()
    customer.address1 = body.address1
    if (typeof body.address2 !== 'undefined' && body.address2 !== null) {
      customer.address2 = body.address2
    }
    if (typeof body.code !== 'undefined' && body.code !== null) {
      customer.code = body.code
    }
    customer.city = body.city
    customer.state = body.state
    customer.zip = body.zip
    for (const customerContact of body.contacts) {
      const contact = new CustomerContact()
      contact.first_name = customerContact.first_name
      contact.last_name = customerContact.last_name
      contact.phone = customerContact.phone
      if (typeof customerContact.email !== 'undefined' && customerContact.email !== null) {
        contact.email = customerContact.email
      }
      if (typeof customerContact.company_position !== 'undefined' && customerContact.company_position !== null) {
        contact.company_position = customerContact.company_position
      }
      customer.customerContacts.add(contact)
    }
    return customer
  }
}
