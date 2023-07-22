import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { BaseModel } from "./BaseModel";
import { v4 } from "uuid";

@Entity({tableName: 'order_statuses'})
export class OrderStatus extends BaseModel {

  static readonly NEW_SLUG = 'new';
  static readonly INCOMPLETE_SLUG = 'incomplete';
  static readonly IN_PROGRESS_SLUG = 'in-progress';
  static readonly DELIVERED_SLUG = 'delivered';
  static readonly DONE_SLUG = 'done';

  @PrimaryKey({ type: 'string' })
    order_status_guid: string = v4();

  @Property({ type: 'string' })
    status: string;

  @Property({ type: 'string' })
    status_slug: string;
}