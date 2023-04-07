import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.raw("CREATE TABLE test ( test_id INT primary key)");
}


export async function down(knex: Knex): Promise<void> {
  return knex.raw("DROP TABLE IF EXISTS test");
}

