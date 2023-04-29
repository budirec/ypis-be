import { Migration } from '@mikro-orm/migrations';

export class Migration20230428070122 extends Migration {

  async up(): Promise<void> {
    await this.addSql(`
  CREATE TABLE IF NOT EXISTS event_types (
  event_type_guid UUID DEFAULT uuid_generate_v4(), 
  event_type VARCHAR(100) NOT NULL, 
  created_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1), 
  updated_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
  CONSTRAINT event_types_pkey PRIMARY KEY (event_type_guid)
  )
`);

    await this.addSql(`CREATE UNIQUE INDEX event_types_event_type_u_idx ON event_types(event_type);`);

    await this.addSql(`
    CREATE OR REPLACE FUNCTION
    on_event_types_update()
    RETURNS
    TRIGGER LANGUAGE plpgsql AS $$
    BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP(1);
    RETURN NEW;
    END;
    $$;

    CREATE OR REPLACE TRIGGER trigger_event_types_updated
    BEFORE UPDATE ON event_types
    FOR EACH ROW EXECUTE FUNCTION on_event_types_update();
  `);

    return this.addSql(`
    INSERT INTO event_types (event_type) 
    VALUES ('Production'),
    ('Production Approved'),
    ('Production Started'), 
    ('Bean Soaked'), 
    ('Cleanup Bean'), 
    ('Cooking'),
    ('Yeast'), 
    ('Packing'), 
    ('Weighing'), 
    ('Sealing'), 
    ('Tray'), 
    ('Incubator'), 
    ('Checks'), 
    ('Flip'), 
    ('Harvest'), 
    ('Second Packaging'), 
    ('Frozen'), 
    ('Done')
`);

  }

  async down(): Promise<void> {
    return this.addSql(`DROP TABLE IF EXISTS event_types;`)
  }

}
