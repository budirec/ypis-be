import { Model } from "objection";

export class Item extends Model {
  item_guid: string;
  item_name: string;
  unit_price: number;
  upc_code: string;
  stock_quantity: number;
  created_at: string;
  updated_at: string;

  static tableName = 'items';
  static idColumn = 'item_guid'

  static jsonSchema = {
    type: 'object',
    required: ['item_name', 'unit_price', 'upc_code', 'stock_quantity'],

    properties: {
      item_guid: { type: "string" },
      item_name: { type: "string" },
      unit_price: { type: "number", format: "double" },
      upc_code: { type: "string" },
      stock_quantity: { type: "integer" },
      created_at: { type: "string" },
      updated_at: { type: "string" },
      // name: { type: "string", minLength: 1, maxLength: 255 },
    },
  }
}