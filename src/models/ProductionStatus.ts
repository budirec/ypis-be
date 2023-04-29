import { Check, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { BaseModel } from "./BaseModel";

@Entity({tableName: 'production_statuses'})
export class ProductionStatus extends BaseModel {
  @PrimaryKey({ type: 'string' })
    production_status_guid: string;

  @Property({ type: 'string' })
  @Check({expression: 'required'})
    status: string;

  @Property({ type: 'string' })
  @Check({expression: 'required'})
    status_slug: string;
}