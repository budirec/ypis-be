import fastify from "fastify";
import knex from "./plugins/knex-plugin";
import { swaggerConfig } from "./config/swagger-config";
import { swaggerUIConfig } from "./config/swagger-ui-config";
import { bootstrap } from "fastify-decorators";
import { controllers } from "./config/controller";

export const app = fastify({logger:true});

app.register(require("@fastify/redis"), {
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD || '',
    port: process.env.REDIS_PORT
});

app.register(import('@fastify/swagger'), swaggerConfig);
app.register(require('@fastify/swagger-ui'), swaggerUIConfig);
app.register(bootstrap, {
    controllers
})
app.register(knex,{});