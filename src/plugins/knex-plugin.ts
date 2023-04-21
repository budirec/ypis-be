import { FastifyPluginAsync } from "fastify"
import fastifyPlugin from "fastify-plugin"
import knex, { Knex } from "knex";
import * as config from "../knexfile"
import { Model } from "objection";


const knexObjectionPlugin: FastifyPluginAsync = async () => { 
  const db = knex(<Knex.Config>config);
  Model.knex(db);
}

export default fastifyPlugin(knexObjectionPlugin)