import { Migration } from '@mikro-orm/migrations'

export class Migration20230722060130 extends Migration {
  async up (): Promise<void> {
    this.addSql(`
      CREATE TABLE IF NOT EXISTS customers (
      customer_guid UUID DEFAULT uuid_generate_v4(), 
      company_name VARCHAR(100) NULL, 
      address1 VARCHAR(255) NOT NULL, 
      address2 VARCHAR(255) DEFAULT NULL, 
      city VARCHAR(100) NOT NULL,
      state VARCHAR(10) NOT NULL,
      zip VARCHAR(10) NOT NULL,
      code VARCHAR(3) NULL,
      created_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1), 
      updated_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
      CONSTRAINT customers_pkey PRIMARY KEY (customer_guid)
    )`)

    this.addSql(`
      CREATE OR REPLACE FUNCTION
        on_customers_update()
      RETURNS
        TRIGGER LANGUAGE plpgsql AS $$
      BEGIN
        NEW.updated_at := CURRENT_TIMESTAMP(1);
        RETURN NEW;
      END;
      $$;

      CREATE OR REPLACE TRIGGER trigger_customers_updated
      BEFORE UPDATE ON customers
      FOR EACH ROW EXECUTE FUNCTION on_customers_update();
    `)
  }

  async down (): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS customers;')
  }
}
