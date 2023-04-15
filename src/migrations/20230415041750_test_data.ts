import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.raw("INSERT into test (test_id) VALUES (2),(3)");
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw("DELETE FROM test WHERE test_id IN (2,3)");
}

