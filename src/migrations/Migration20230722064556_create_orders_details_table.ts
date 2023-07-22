import { Migration } from '@mikro-orm/migrations';

export class Migration20230722064556 extends Migration {

  async up(): Promise<void> {
    await this.addSql(`
      CREATE TABLE IF NOT EXISTS order_details (
      order_detail_guid UUID DEFAULT uuid_generate_v4(), 
      order_guid UUID NOT NULL, 
      item_guid UUID NOT NULL, 
      quantity REAL NOT NULL, 
      unit_price REAL NOT NULL,
      quantity_acquired REAL NOT NULL,
      CONSTRAINT order_detals_guid_fkey FOREIGN KEY (order_guid)
      REFERENCES orders(order_guid) ON DELETE CASCADE,
      CONSTRAINT order_details_item_guid_fkey FOREIGN KEY (item_guid)
      REFERENCES items  (item_guid) ON DELETE CASCADE,
      created_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1), 
      updated_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
      CONSTRAINT order_details_pkey PRIMARY KEY (order_detail_guid),
      CONSTRAINT order_details_order_detail_guid_order_guid_uidx UNIQUE (order_detail_guid, order_guid)
    )`);

    return this.addSql(`
    CREATE OR REPLACE FUNCTION
      on_order_details_update()
    RETURNS
      TRIGGER LANGUAGE plpgsql AS $$
    BEGIN
      NEW.updated_at := CURRENT_TIMESTAMP(1);
      RETURN NEW;
    END;
    $$;

    CREATE OR REPLACE TRIGGER trigger_order_details_updated
    BEFORE UPDATE ON order_details
    FOR EACH ROW EXECUTE FUNCTION on_order_details_update();
  `);
  }

  async down(): Promise<void> {
    return this.addSql(`DROP TABLE IF EXISTS orders;`)
  }

}
