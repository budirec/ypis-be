import {
  Cascade,
  Collection,
  Entity,
  type EntityManager,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property
} from '@mikro-orm/core'
import { BaseModel } from './BaseModel'
import { type ProductionStatus } from './ProductionStatus'
import { type Item } from './Item'
import { type ProductionHistory } from './ProductionHistory'
import { v4 } from 'uuid'

@Entity({ tableName: 'productions' })
export class Production extends BaseModel {
  @PrimaryKey({ type: 'string' })
    production_guid: string = v4()

  @ManyToOne({
    entity: 'ProductionStatus',
    fieldName: 'production_status_guid',
    eager: true,
    serializer: (value) => value.status,
    serializedName: 'status'
  })
    productionStatus: ProductionStatus

  @ManyToOne({
    entity: 'Item',
    fieldName: 'finished_item_guid',
    eager: true,
    serializedName: 'finished_item'
  })
    finishedItem: Item

  @Property({ type: 'string', serializedName: 'name' })
    production_name: string

  @Property({ type: 'number' })
    target: number

  @Property({ type: 'number' })
    buffer: number

  @Property({ type: 'object' })
    args: object

  @OneToMany({
    entity: 'ProductionHistory',
    mappedBy: 'production',
    cascade: [Cascade.PERSIST],
    eager: true,
    serializedName: 'production_histories'
  })
    productionHistories = new Collection<ProductionHistory>(this)

  public static async instantiate (
    productionStatus: ProductionStatus,
    finishedItem: Item,
    args: object,
    target: number,
    buffer: number,
    em: EntityManager,
    productionName?: string
  ): Promise<Production> {
    const production = new Production()
    production.finishedItem = finishedItem
    production.productionStatus = productionStatus
    production.args = args
    production.target = target
    production.buffer = buffer
    if (productionName) {
      production.production_name = productionName
    } else {
      const [date] = new Date().toISOString().split('T')
      const [, count] = await em.findAndCount(Production, {
        created_at: { $gte: date }
      })
      production.production_name = `${date}/${count + 1}`
    }
    return production
  }
}
