import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
        CREATE TABLE IF NOT EXISTS productions (
        production_guid UUID DEFAULT uuid_generate_v4(), 
        production_status_guid UUID NOT NULL,
        finished_item_guid UUID NOT NULL,
        args JSONB NOT NULL,
        created_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
        updated_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
        CONSTRAINT productions_production_status_guid_fkey FOREIGN KEY (production_status_guid)
        REFERENCES production_statuses(production_status_guid),
        CONSTRAINT productions_finished_item_guid_fkey FOREIGN KEY (finished_item_guid)
        REFERENCES items(item_guid),
        CONSTRAINT productions_pkey PRIMARY KEY (production_guid)
    )
    `);

    await knex.raw(`CREATE INDEX productions_args_idx ON productions USING GIN(args);`);

    return knex.raw(`
        CREATE FUNCTION
        on_productions_update()
        RETURNS
        TRIGGER LANGUAGE plpgsql AS $$
        BEGIN
        NEW.updated_at := CURRENT_TIMESTAMP(1);
        RETURN NEW;
        END;
        $$;

        CREATE TRIGGER trigger_productions_updated
        BEFORE UPDATE ON productions
        FOR EACH ROW EXECUTE FUNCTION on_productions_update();
    `);

}


export async function down(knex: Knex): Promise<void> {
    return knex.raw("DROP TABLE IF EXISTS productions");
}
