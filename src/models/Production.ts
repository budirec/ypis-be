import { Cascade, Check, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { BaseModel } from "./BaseModel";
import { ProductionStatus } from "./ProductionStatus";
import { Item } from "./Item";
import { ProductionHistory } from "./ProductionHistory";

@Entity({tableName: 'productions'})
export class Production extends BaseModel {
  constructor(productionStatusGuid: string, finishedItemGuid: string, args: object) {
    super();
    this.production_status_guid = productionStatusGuid;
    this.finished_item_guid = finishedItemGuid;
    this.args = args;
  }

  @PrimaryKey({ type: 'string' })
    production_guid: string;

  @ManyToOne(() => ProductionStatus,{mapToPk: true})
  @Check({expression: 'required'})
    production_status_guid: string;

  @ManyToOne(() => Item, {mapToPk: true})
  @Check({expression: 'required'})
    finished_item_guid: string;

  @Property({ type: 'object' })
  @Check({expression: 'required'})
    args: object;

  @OneToMany({ entity: () => ProductionHistory, mappedBy: 'production_guid', cascade: [Cascade.PERSIST] })
    productionHistories = new Collection<ProductionHistory>(this);
}