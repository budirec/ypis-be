import { Model } from "objection";
import { ProductionStatus } from "./ProductionStatus";
import { Item } from "./Item";
import { ProductionHistory } from "./ProductionHistory";

export class Production extends Model {
  production_guid: string;
  production_status_guid: string;
  finished_item_guid: string;
  args: object;

  static tableName = 'productions';
  static idColumn = 'production_guid';
  
  static jsonSchema = {
    type: 'object',
    required: ['production_status_guid', 'finished_item_guid', 'args'],

    properties: {
      production_guid: { type: "string" },
      production_status_guid: { type: "string" },
      finished_item_guid: { type: "string" },
      args: { 
        type: "object", 
        properties: {
          additionalProperties: true
        } 
      },
    },
  }
  static relationMappings = {
    productionStatus: {
      relation: Model.BelongsToOneRelation,
      modelClass: ProductionStatus,
      join: {
        from: 'productions.production_status_guid',
        to: 'production_statuses.production_status_guid'
      }
    },
    items: {
      relation: Model.BelongsToOneRelation,
      modelClass: Item,
      join: {
        from: 'productions.finished_item_guid',
        to: 'items.item_guid'
      }
    },
    productionHistories: {
      relation: Model.HasManyRelation,
      modelClass: ProductionHistory,
      join: {
        from: 'productions.production_guid',
        to: 'production_histories.production_guid'
      }
    },
  };
}