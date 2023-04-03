import fastify from "fastify";

export const app = fastify({logger:true});

app.register(require("@fastify/redis"), {
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD || '',
    port: process.env.REDIS_PORT
});