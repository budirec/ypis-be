import { Migration } from '@mikro-orm/migrations'

export class Migration20230722064526 extends Migration {
  async up (): Promise<void> {
    this.addSql(`
      CREATE TABLE IF NOT EXISTS orders (
      order_guid UUID DEFAULT uuid_generate_v4(),
      order_number VARCHAR(50) NOT NULL,
      customer_guid UUID NOT NULL, 
      total_price REAL NOT NULL, 
      order_date TIMESTAMP(1) NOT NULL, 
      expected_delivery_date TIMESTAMP(1) NOT NULL,
      order_status_guid UUID NOT NULL,
      po VARCHAR(50) NULL,
      CONSTRAINT orders_customer_guid_fkey FOREIGN KEY (customer_guid)
      REFERENCES customers(customer_guid) ON DELETE CASCADE,
      CONSTRAINT orders_order_status_guid_fkey FOREIGN KEY (order_status_guid)
      REFERENCES order_statuses(order_status_guid) ON DELETE CASCADE,
      created_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1), 
      updated_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
      CONSTRAINT orders_pkey PRIMARY KEY (order_guid),
      CONSTRAINT orders_order_guid_customer_guid_uidx UNIQUE (order_guid, customer_guid)
    )`)

    this.addSql(`
      CREATE OR REPLACE FUNCTION
        on_orders_update()
      RETURNS
        TRIGGER LANGUAGE plpgsql AS $$
      BEGIN
        NEW.updated_at := CURRENT_TIMESTAMP(1);
        RETURN NEW;
      END;
      $$;

      CREATE OR REPLACE TRIGGER trigger_orders_updated
      BEFORE UPDATE ON orders
      FOR EACH ROW EXECUTE FUNCTION on_orders_update();
    `)
  }

  async down (): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS orders;')
  }
}
