import fastify from "fastify";
import { swaggerConfig } from "./config/swagger-config";
import { swaggerUIConfig } from "./config/swagger-ui-config";
import { bootstrap } from "fastify-decorators";
import { controllers } from "./config/controllers";
import { constants } from "./config/constants";
import mikiroOrmPlugin from "./plugins/mikiro-orm-plugin";

export const app = fastify({ logger: true });

app.register(require("@fastify/redis"), {
  host: constants.CACHE_HOST,
  password: constants.CACHE_PASSWORD || "",
  port: constants.CACHE_PORT,
});

app.register(import("@fastify/swagger"), swaggerConfig);
app.register(require("@fastify/swagger-ui"), swaggerUIConfig);
app.register(bootstrap, {
  controllers,
});
app.register(mikiroOrmPlugin);
