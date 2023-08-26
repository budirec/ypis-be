import { Migration } from '@mikro-orm/migrations'

export class Migration20230428070040 extends Migration {
  async up (): Promise<void> {
    this.addSql(`
      CREATE TABLE IF NOT EXISTS production_statuses (
      production_status_guid UUID DEFAULT uuid_generate_v4(), 
      status VARCHAR(100) NOT NULL, 
      status_slug VARCHAR(100) NOT NULL, 
      created_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1), 
      updated_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
      CONSTRAINT production_statuses_pkey PRIMARY KEY (production_status_guid)
    )
  `)

    this.addSql(
      'CREATE UNIQUE INDEX production_statuses_status_slug_u_idx ON production_statuses(status_slug);'
    )

    this.addSql(`
      CREATE OR REPLACE FUNCTION
      on_production_statuses_update()
      RETURNS
      TRIGGER LANGUAGE plpgsql AS $$
      BEGIN
      NEW.updated_at := CURRENT_TIMESTAMP(1);
      RETURN NEW;
      END;
      $$;

      CREATE OR REPLACE TRIGGER trigger_production_statuses_updated
      BEFORE UPDATE ON production_statuses
      FOR EACH ROW EXECUTE FUNCTION on_production_statuses_update();
    `)

    this.addSql(`
      INSERT INTO production_statuses (status, status_slug) 
      VALUES ('Open', 'open'), ('In Progress', 'in-progress'), ('Done', 'done')
    `)
  }

  async down (): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS production_statuses;')
  }
}
