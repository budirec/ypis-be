import { Check, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { BaseModel } from "./BaseModel";
import { v4 } from "uuid";

@Entity({tableName: 'production_statuses'})
export class ProductionStatus extends BaseModel {

  static readonly OPEN_SLUG = 'open';
  static readonly IN_PROGRESS_SLUG = 'in-progress';
  static readonly DONE_SLUG = 'done';

  @PrimaryKey({ type: 'string' })
    production_status_guid: string = v4();

  @Property({ type: 'string' })
  @Check({expression: 'required'})
    status: string;

  @Property({ type: 'string' })
  @Check({expression: 'required'})
    status_slug: string;
}