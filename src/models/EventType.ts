import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { BaseModel } from './BaseModel'

@Entity({ tableName: 'event_types' })
export class EventType extends BaseModel {
  static readonly PRODUCTION_APPROVED = 'Production Approved'
  static readonly PRODUCTION_STARTED = 'Production Started'
  static readonly SOAKED = 'Soaked'
  static readonly CLEANED = 'Cleaned'
  static readonly COOKING = 'Cooking'
  static readonly BOILED = 'Boiled'
  static readonly DRIED = 'Dried'
  static readonly INNOCULATED = 'Innoculated'
  static readonly IN_INCUBATOR = 'In Incubator'
  static readonly CHECK = 'Check'
  static readonly FLIPPED = 'Flipped'
  static readonly HARVESTED = 'Harvested'
  static readonly FROZEN = 'Frozen'
  static readonly DONE = 'Done'

  @PrimaryKey({ type: 'string' })
    event_type_guid: string

  @Property({ type: 'string' })
    event_type: string
}
