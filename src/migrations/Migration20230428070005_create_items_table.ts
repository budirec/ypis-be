import { Migration } from '@mikro-orm/migrations';

export class Migration20230428070005 extends Migration {

  async up(): Promise<void> {
    await this.addSql(`
      CREATE TABLE IF NOT EXISTS items (
      item_guid UUID DEFAULT uuid_generate_v4(), 
      item_name VARCHAR(100) NOT NULL, 
      unit_price REAL NOT NULL, 
      upc_code VARCHAR(100) DEFAULT NULL, 
      stock_quantity REAL NOT NULL,
      unit VARCHAR(10) NOT NULL DEFAULT 'kg'
      created_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1), 
      updated_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
      CONSTRAINT items_pkey PRIMARY KEY (item_guid)
    )`);

    await this.addSql(`CREATE UNIQUE INDEX items_item_name_u_idx ON items(item_name);`);
  
    return this.addSql(`
    CREATE OR REPLACE FUNCTION
      on_items_update()
    RETURNS
      TRIGGER LANGUAGE plpgsql AS $$
    BEGIN
      NEW.updated_at := CURRENT_TIMESTAMP(1);
      RETURN NEW;
    END;
    $$;

    CREATE OR REPLACE TRIGGER trigger_items_updated
    BEFORE UPDATE ON items
    FOR EACH ROW EXECUTE FUNCTION on_items_update();
  `);
  }

  async down(): Promise<void> {
    return this.addSql(`DROP TABLE IF EXISTS items;`)
  }
}
