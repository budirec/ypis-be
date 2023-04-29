import { Check, Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { BaseModel } from "./BaseModel";
import { Production } from "./Production";
import { EventType } from "./EventType";

@Entity({tableName: 'production_histories'})
export class ProductionHistory extends BaseModel {
  constructor(productionGuid: string, eventTypeGuid: string, label: string, args: object) {
    super();
    this.production_guid = productionGuid;
    this.event_type_guid = eventTypeGuid;
    this.label = label;
    this.args = args;
  }

  @PrimaryKey({ type: 'string' })
    production_history_guid: string;

  @ManyToOne(() => Production, { mapToPk: true })
  @Check({expression: 'required'})
    production_guid: string;

  @ManyToOne(() => EventType, { mapToPk: true })
  @Check({expression: 'required'})
    event_type_guid: string;
  
  @Property({ type: 'string' })
  @Check({expression: 'required'})
    label: string;
  
  @Property({ type: 'object' })
    args: object;
}