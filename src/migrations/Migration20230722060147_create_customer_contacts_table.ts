import { Migration } from '@mikro-orm/migrations';

export class Migration20230722060147 extends Migration {

  async up(): Promise<void> {
    await this.addSql(`
      CREATE TABLE IF NOT EXISTS customer_contacts (
      customer_contact_guid UUID DEFAULT uuid_generate_v4(), 
      customer_guid UUID NOT NULL, 
      phone VARCHAR(255) NOT NULL, 
      email VARCHAR(255) DEFAULT NULL, 
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      company_position VARCHAR(100) DEFAULT NULL,
      CONSTRAINT customer_contacts_customer_guid_fkey FOREIGN KEY (customer_guid)
      REFERENCES customers(customer_guid) ON DELETE CASCADE,
      created_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1), 
      updated_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
      CONSTRAINT customer_contacts_pkey PRIMARY KEY (customer_contact_guid)
    )`);

    return this.addSql(`
    CREATE OR REPLACE FUNCTION
      on_customer_contacts_update()
    RETURNS
      TRIGGER LANGUAGE plpgsql AS $$
    BEGIN
      NEW.updated_at := CURRENT_TIMESTAMP(1);
      RETURN NEW;
    END;
    $$;

    CREATE OR REPLACE TRIGGER trigger_customer_contacts_updated
    BEFORE UPDATE ON customer_contacts
    FOR EACH ROW EXECUTE FUNCTION on_customer_contacts_update();
  `);
  }

  async down(): Promise<void> {
    return this.addSql(`DROP TABLE IF EXISTS customer_contacts;`)
  }

}
