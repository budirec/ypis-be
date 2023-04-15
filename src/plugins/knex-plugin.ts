import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions } from "fastify"
import fastifyPlugin from "fastify-plugin"
import knex, { Knex } from "knex";
import * as config from "../knexfile"


const knexPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => { 
    const db = knex(<Knex.Config>config);
    fastify.decorate('knex', db);
  }

export default fastifyPlugin(knexPlugin)