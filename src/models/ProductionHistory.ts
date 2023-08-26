import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { BaseModel } from './BaseModel'
import { type Production } from './Production'
import { type EventType } from './EventType'
import { v4 } from 'uuid'

@Entity({ tableName: 'production_histories' })
export class ProductionHistory extends BaseModel {
  constructor (
    production: Production,
    eventType: EventType,
    label: string,
    args?: object
  ) {
    super()
    this.production = production
    this.eventType = eventType
    this.label = label
    if (args) {
      this.args = args
    }
  }

  @PrimaryKey({ type: 'string' })
    production_history_guid: string = v4()

  @ManyToOne({ entity: 'Production', fieldName: 'production_guid' })
    production: Production

  @ManyToOne({ entity: 'EventType', fieldName: 'event_type_guid' })
    eventType: EventType

  @Property({ type: 'string' })
    label: string

  @Property({ type: 'object', nullable: true })
    args: object
}
