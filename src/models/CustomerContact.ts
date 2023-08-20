import {
  Cascade,
  Collection,
  Entity,
  EntityManager,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  wrap
} from '@mikro-orm/core'
import { BaseModel } from './BaseModel'
import { v4 } from 'uuid'
import { type Customer } from './Customer'
import { type Contact } from '../request-schemas/customer/post-customer-contacts'

@Entity({ tableName: 'customer_contacts' })
export class CustomerContact extends BaseModel {
  @PrimaryKey({ type: 'string' })
    customer_contact_guid: string = v4()

  @Property({ type: 'string' })
    phone: string

  @Property({ type: 'string', nullable: true })
    email?: string

  @Property({ type: 'string' })
    first_name: string

  @Property({ type: 'string' })
    last_name: string

  @Property({ type: 'string', nullable: true })
    company_position?: string

  @ManyToOne({ entity: 'Customer', fieldName: 'customer_guid', eager: true })
    customer: Customer

  /**
     *
     * @param contacts Contact[]
     * @returns Promise<CustomerContact[]>
     */
  public static async instantiate (contacts: Contact[]): Promise<CustomerContact[]> {
    const customerContacts: CustomerContact[] = []
    for (const customerContact of contacts) {
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
      customerContacts.push(contact)
    }
    return customerContacts
  }
}
