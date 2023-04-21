import { Model } from "objection";

export class ProductionStatus extends Model {
  production_status_guid: string;
  status: string;
  status_slug: string;
  created_at: string;
  updated_at: string;

  static tableName = 'production_statuses';
  static idColumn = 'production_status_guid';

  static jsonSchema = {
    type: 'object',
    required: ['status', 'status_slug'],

    properties: {
      production_status_guid: { type: "string" },
      status: { type: "string" },
      status_slug: { type: "string" },
    },
  }
}