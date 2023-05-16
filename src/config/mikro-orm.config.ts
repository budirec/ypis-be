import { Options } from "@mikro-orm/core";
import { constants } from "./constants";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TSMigrationGenerator } from "@mikro-orm/migrations";

const config: Options = {
  dbName: constants.DB_NAME,
  user: constants.DB_USER,
  password: constants.DB_PASSWORD,
  port: constants.DB_PORT,
  host: constants.DB_HOST,
  driver: PostgreSqlDriver, 
  entitiesTs: ['./models/**/*.ts'], 
  allowGlobalContext: true,
  migrations: {
    tableName: "mikro_orm_migrations",
    pathTs: "migrations",
    emit: "ts",
    generator: TSMigrationGenerator,
    transactional: true,
    disableForeignKeys: false,
    fileName: (timestamp: string, name: string) => {
      // force user to provide the name, otherwise we would end up with `Migration20230421212713_undefined`
      if (!name) {
        throw new Error('Specify migration name via `mikro-orm migration:create --name=...`');
      }
  
      return `Migration${timestamp}_${name}`;
    },
    snapshot: false
  },
  discovery: {
    warnWhenNoEntities: false,
  },
}

export default config;