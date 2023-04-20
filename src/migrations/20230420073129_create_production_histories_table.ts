import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
        CREATE TABLE IF NOT EXISTS production_histories (
        production_history_guid UUID DEFAULT uuid_generate_v4(), 
        production_guid UUID NOT NULL,
        event_type_guid UUID NOT NULL,
        label VARCHAR(255) NOT NULL,
        created_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
        updated_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
        CONSTRAINT prod_hist_production_guid_fkey FOREIGN KEY (production_guid)
        REFERENCES productions(production_guid),
        CONSTRAINT prod_hist_event_type_guid_fkey FOREIGN KEY (event_type_guid)
        REFERENCES event_types(event_type_guid),
        CONSTRAINT production_histories_pkey PRIMARY KEY (production_history_guid)
)
`);

return knex.raw(`
    CREATE FUNCTION
    on_production_histories_update()
    RETURNS
    TRIGGER LANGUAGE plpgsql AS $$
    BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP(1);
    RETURN NEW;
    END;
    $$;

    CREATE TRIGGER trigger_production_histories_updated
    BEFORE UPDATE ON production_histories
    FOR EACH ROW EXECUTE FUNCTION on_production_histories_update();
`);

}


export async function down(knex: Knex): Promise<void> {
return knex.raw("DROP TABLE IF EXISTS productions");
}

