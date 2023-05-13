import { Migration } from '@mikro-orm/migrations';

export class Migration20230428070307 extends Migration {

  async up(): Promise<void> {
    await this.addSql(`
      CREATE TABLE IF NOT EXISTS production_histories (
      production_history_guid UUID DEFAULT uuid_generate_v4(), 
      production_guid UUID NOT NULL,
      event_type_guid UUID NOT NULL,
      label VARCHAR(255) NOT NULL,
      args JSONB DEFAULT NULL,
      created_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
      updated_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
      CONSTRAINT prod_hist_production_guid_fkey FOREIGN KEY (production_guid)
      REFERENCES productions(production_guid) ON DELETE CASCADE,
      CONSTRAINT prod_hist_event_type_guid_fkey FOREIGN KEY (event_type_guid)
      REFERENCES event_types(event_type_guid) ON DELETE CASCADE,
      CONSTRAINT production_histories_pkey PRIMARY KEY (production_history_guid)
      )
    `);

    await this.addSql(`CREATE INDEX production_histories_args_idx ON production_histories USING GIN(args);`);
  
    return this.addSql(`
      CREATE OR REPLACE FUNCTION
      on_production_histories_update()
      RETURNS
      TRIGGER LANGUAGE plpgsql AS $$
      BEGIN
      NEW.updated_at := CURRENT_TIMESTAMP(1);
      RETURN NEW;
      END;
      $$;

      CREATE OR REPLACE TRIGGER trigger_production_histories_updated
      BEFORE UPDATE ON production_histories
      FOR EACH ROW EXECUTE FUNCTION on_production_histories_update();
    `);
  }

  async down(): Promise<void> {
    return this.addSql(`DROP TABLE IF EXISTS production_histories;`)
  }

}
