import { Model } from "objection";
import { Production } from "./Production";
import { EventType } from "./EventType";

export class ProductionHistory extends Model {
  production_history_guid: string;
  production_guid: string;
  event_type_guid: string;
  label: string;
  args: object;

  static tableName = 'production_histories';
  static idColumn = 'production_history_guid';
  
  static jsonSchema = {
    type: 'object',
    required: ['production_guid', 'event_type_guid', 'label'],
    properties: {
      production_history_guid: { type: "string" },
      production_guid: { type: "string" },
      event_type_guid: { type: "string" },
      label: { type: "string" },
      args: { 
        type: "object", 
        properties: {
          additionalProperties: true
        } 
      },
    },
  }
  static relationMappings = {
    production: {
      relation: Model.BelongsToOneRelation,
      modelClass: Production,
      join: {
        from: 'production_histories.production_guid',
        to: 'production.production_guid'
      }
    },
    eventType: {
      relation: Model.BelongsToOneRelation,
      modelClass: EventType,
      join: {
        from: 'production_histories.event_type_guid',
        to: 'event_types.event_type_guid'
      }
    }
  };
}