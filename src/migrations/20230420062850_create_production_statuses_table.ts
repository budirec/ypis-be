import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
        CREATE TABLE IF NOT EXISTS production_statuses (
        production_status_guid UUID DEFAULT uuid_generate_v4(), 
        status VARCHAR(100) NOT NULL, 
        status_slug VARCHAR(100) NOT NULL, 
        created_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1), 
        updated_at TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
        CONSTRAINT production_statuses_pkey PRIMARY KEY (production_status_guid)
        )
    `);

    await knex.raw(`CREATE UNIQUE INDEX production_statuses_status_slug_u_idx ON production_statuses(status_slug);`);
  
    await knex.raw(`
        CREATE FUNCTION
        on_production_statuses_update()
        RETURNS
        TRIGGER LANGUAGE plpgsql AS $$
        BEGIN
        NEW.updated_at := CURRENT_TIMESTAMP(1);
        RETURN NEW;
        END;
        $$;

        CREATE TRIGGER trigger_production_statuses_updated
        BEFORE UPDATE ON production_statuses
        FOR EACH ROW EXECUTE FUNCTION on_production_statuses_update();
    `);

    return knex.raw(`
        INSERT INTO production_statuses (status, status_slug) 
        VALUES ('Open', 'open'), ('In Progress', 'in-progress'), ('Done', 'done')
    `);
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw("DROP TABLE IF EXISTS production_statuses");
}


