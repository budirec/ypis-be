import type { Knex } from "knex";
import { constants } from "./config/constants";

// Update with your config settings.

const config: Knex.Config  = {
    client: "postgresql",
    connection: {
      database: constants.DB_DATABASE,
      user: constants.DB_USER,
      password: constants.DB_PASSWORD,
      host: constants.DB_HOST
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations"
    }
  };

module.exports = config;
