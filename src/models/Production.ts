import { Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { BaseModel } from "./BaseModel";
import { ProductionStatus } from "./ProductionStatus";
import { Item } from "./Item";
import { ProductionHistory } from "./ProductionHistory";
import { v4 } from "uuid";

@Entity({tableName: 'productions'})
export class Production extends BaseModel {
  constructor(productionStatus: ProductionStatus, finishedItem: Item, args: object) {
    super();
    this.productionStatus = productionStatus;
    this.finishedItem = finishedItem;
    this.args = args;
  }

  @PrimaryKey({ type: 'string' })
    production_guid: string = v4();

  @ManyToOne({entity: 'ProductionStatus', fieldName: 'production_status_guid'})
    productionStatus: ProductionStatus;

  @ManyToOne({entity: 'Item', fieldName: 'finished_item_guid'})
    finishedItem: Item;

  @Property({ type: 'number' })
    target: number;
  
  @Property({ type: 'number' })
    buffer: number;

  @Property({ type: 'object' })
    args: object;

  @OneToMany({ entity: 'ProductionHistory', mappedBy: 'production', cascade: [Cascade.PERSIST] })
    productionHistories = new Collection<ProductionHistory>(this);
}