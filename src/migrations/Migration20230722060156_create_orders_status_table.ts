import { Migration } from '@mikro-orm/migrations';

export class Migration20230722060156 extends Migration {

  async up(): Promise<void> {
    await this.addSql(`
      CREATE TABLE IF NOT EXISTS order_statuses (
      order_status_guid UUID DEFAULT uuid_generate_v4(), 
      status VARCHAR(100) NOT NULL, 
      status_slug VARCHAR(100) NOT NULL, 
      created_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1), 
      updated_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
      CONSTRAINT order_statuses_pkey PRIMARY KEY (order_status_guid)
    )
  `);

    await this.addSql(`CREATE UNIQUE INDEX order_statuses_status_slug_u_idx ON order_statuses(status_slug);`);
  
    await this.addSql(`
      CREATE OR REPLACE FUNCTION
      on_order_statuses_update()
      RETURNS
      TRIGGER LANGUAGE plpgsql AS $$
      BEGIN
      NEW.updated_at := CURRENT_TIMESTAMP(1);
      RETURN NEW;
      END;
      $$;

      CREATE OR REPLACE TRIGGER trigger_order_statuses_updated
      BEFORE UPDATE ON order_statuses
      FOR EACH ROW EXECUTE FUNCTION on_order_statuses_update();
    `);

    return this.addSql(`
      INSERT INTO order_statuses (status, status_slug) 
      VALUES ('New', 'new'), ('Incomplete', 'incomplete'), ('In Progress', 'in-progress'), ('Delivered', 'delivered'), ('Done', 'done')
    `);
  }

  async down(): Promise<void> {
    return this.addSql(`DROP TABLE IF EXISTS order_statuses;`)
  }


}
