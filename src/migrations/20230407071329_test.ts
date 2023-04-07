import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.raw("CREATE TABLE IF NOT EXISTS test ( test_id BIGNIT )");
}


export async function down(knex: Knex): Promise<void> {
    knex.raw("DROP TABLE IF EXISTS test");
}

