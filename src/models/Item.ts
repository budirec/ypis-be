import { Check, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { BaseModel } from "./BaseModel";
import { v4 } from "uuid";

@Entity({tableName: 'items'})
export class Item extends BaseModel{

  constructor(itemName: string, unitPrice: number, stockQuantity: number, upcCode?: string) {
    super();
    this.item_name = itemName;
    this.unit_price = unitPrice;
    this.stock_quantity = stockQuantity;
    if (upcCode) {
      this.upc_code = upcCode;
    }
  }

  @PrimaryKey({ type: 'string'})
    item_guid: string = v4();

  @Property({ type: 'string' })
  @Check({expression: 'required'})
    item_name: string;

  @Property({ type: 'number' })
  @Check({expression: 'required'})
    unit_price: number;
  
  @Property({ type: 'string', nullable: true })
    upc_code?: string;

  @Property({ type: 'number' })
  @Check({expression: 'required'})
    stock_quantity: number;

}