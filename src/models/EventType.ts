import { Check, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { BaseModel } from "./BaseModel";

@Entity({tableName: 'event_types'})
export class EventType extends BaseModel {

  @PrimaryKey({ type: 'string' })
    event_type_guid: string;

  @Property({ type: 'string' })
  @Check({expression: 'required'})
    event_type: string;

}