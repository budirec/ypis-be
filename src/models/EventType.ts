import { Model } from "objection";

export class EventType extends Model {
  event_type_guid: string;
  event_type: string;
  created_at: string;
  updated_at: string;

  static tableName = 'event_types';
  static idColumn = 'event_type_guid'

  static jsonSchema = {
    type: 'object',
    required: ['event_type'],

    properties: {
      event_type_guid: { type: "string" },
      event_type: { type: "string" },
      created_at: { type: "string" },
      updated_at: { type: "string" },
    },
  }
}