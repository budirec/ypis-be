import { Cascade, Collection, Entity, EntityManager, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { BaseModel } from "./BaseModel";
import { ProductionStatus } from "./ProductionStatus";
import { Item } from "./Item";
import { ProductionHistory } from "./ProductionHistory";
import { v4 } from "uuid";

@Entity({tableName: 'productions'})
export class Production extends BaseModel {
  
  @PrimaryKey({ type: 'string' })
    production_guid: string = v4();

  @ManyToOne({entity: 'ProductionStatus', fieldName: 'production_status_guid'})
    productionStatus: ProductionStatus;

  @ManyToOne({entity: 'Item', fieldName: 'finished_item_guid'})
    finishedItem: Item;

  @Property({ type: 'number' })
    production_number: number;
  
  @Property({ type: 'number' })
    target: number;
  
  @Property({ type: 'number' })
    buffer: number;

  @Property({ type: 'object' })
    args: object;

  @OneToMany({ entity: 'ProductionHistory', mappedBy: 'production', cascade: [Cascade.PERSIST] })
    productionHistories = new Collection<ProductionHistory>(this);

  public static async instantiate(productionStatus: ProductionStatus, finishedItem: Item, args: object, target: number, buffer: number, em: EntityManager ) {
    const production = new Production();
    production.finishedItem = finishedItem;
    production.productionStatus = productionStatus;
    production.args = args;
    production.target = target;
    production.buffer = buffer;
    
    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const [,count] = await em.findAndCount(Production, {created_at: {$gte: dateString}});
    production.production_number = count + 1
    return production;
  }
}