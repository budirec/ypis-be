import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS items (
    item_guid UUID DEFAULT uuid_generate_v4(), 
    item_name VARCHAR(100) NOT NULL, 
    unit_price REAL NOT NULL, 
    upc_code VARCHAR(100) NOT NULL, 
    stock_quantity INTEGER NOT NULL, 
    created_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1), 
    updated_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
    CONSTRAINT items_pkey PRIMARY KEY (item_guid)
    )
  `);
  
  await knex.raw(`CREATE UNIQUE INDEX items_item_name_u_idx ON items(item_name);`);
  
  return knex.raw(`
    CREATE FUNCTION
      on_items_update()
    RETURNS
      TRIGGER LANGUAGE plpgsql AS $$
    BEGIN
      NEW.updated_at := CURRENT_TIMESTAMP(1);
      RETURN NEW;
    END;
    $$;

    CREATE TRIGGER trigger_items_updated
    BEFORE UPDATE ON items
    FOR EACH ROW EXECUTE FUNCTION on_items_update();
  `);
}


export async function down(knex: Knex): Promise<void> {
  return knex.raw("DROP TABLE IF EXISTS items");
}

