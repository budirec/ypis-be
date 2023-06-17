export interface Production {
  raw_materials: object;
  finished_item_guid: string;
  target: number;
  buffer: number;
  production_number?: number;
}