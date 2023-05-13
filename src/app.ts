import fastify from "fastify";
import { swaggerConfig } from "./config/swagger-config";
import { swaggerUIConfig } from "./config/swagger-ui-config";
import { bootstrap } from "fastify-decorators";
import { controllers } from "./config/controllers";
import { constants } from "./config/constants";
import mikiroOrmPlugin from "./plugins/mikiro-orm-plugin";
import { fastifySwagger } from "@fastify/swagger";
import { Container } from "inversify";
import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";

export const app = fastify({logger:true});

const myContainer = new Container();

app.register(require("@fastify/redis"), {
  host: constants.CACHE_HOST,
  password: constants.CACHE_PASSWORD || '',
  port: constants.CACHE_PORT
});
app.register(mikiroOrmPlugin);
myContainer.bind<MikroORM<IDatabaseDriver<Connection>>>(Symbol.for('MikroORM')).toConstantValue(app.orm);
app.register(fastifySwagger, swaggerConfig);
app.register(require('@fastify/swagger-ui'), swaggerUIConfig);
app.register(bootstrap, {
  controllers
});

export { myContainer }