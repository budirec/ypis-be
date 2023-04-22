import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
  CREATE TABLE IF NOT EXISTS event_types (
  event_type_guid UUID DEFAULT uuid_generate_v4(), 
  event_type VARCHAR(100) NOT NULL, 
  created_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1), 
  updated_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
  CONSTRAINT event_types_pkey PRIMARY KEY (event_type_guid)
  )
`);

  await knex.raw(`CREATE UNIQUE INDEX event_types_event_type_u_idx ON event_types(event_type);`);

  await knex.raw(`
    CREATE FUNCTION
    on_event_types_update()
    RETURNS
    TRIGGER LANGUAGE plpgsql AS $$
    BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP(1);
    RETURN NEW;
    END;
    $$;

    CREATE TRIGGER trigger_event_types_updated
    BEFORE UPDATE ON event_types
    FOR EACH ROW EXECUTE FUNCTION on_event_types_update();
  `);

  return knex.raw(`
    INSERT INTO event_types (event_type) 
    VALUES ('Production'),
    ('Production Approved'),
    ('Production Started'), 
    ('Bean Soaked'), 
    ('Cleanup Bean'), 
    ('Cooking'), 
    ('Boiling'), 
    ('Drying'), 
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


export async function down(knex: Knex): Promise<void> {
  return knex.raw("DROP TABLE IF EXISTS event_types");
}



