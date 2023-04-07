import { FastifyPluginAsync } from "fastify"
import fastifyPlugin from "fastify-plugin"
import knex from "knex";
const knexPlugin: FastifyPluginAsync = async (fastify, options = {}) => {

    const db = knex({
        client: 'pg',
        connection: {
            host: process.env.POSTGRES_HOST,
            port: 5432,
            database: process.env.POSTGRES_DB,
        },
        migrations:{
            tableName: 'knex_migrations',
            directory: 'migrations'
        },
        ...options
    });
    fastify.decorate('knex', db);
 }


export default fastifyPlugin(knexPlugin);