import { FastifyInstance, FastifyPluginAsync } from "fastify"
import fastifyPlugin from "fastify-plugin"
import { MikroORM } from "@mikro-orm/postgresql"
import config from "../config/mikro-orm.config"
import { MikroORMOptions } from "@mikro-orm/core"


const mikroOrmPlugin: FastifyPluginAsync<MikroORMOptions> = async (fastify: FastifyInstance) => { 
  const orm = await MikroORM.init(config);
  fastify.decorate('orm', orm);
  fastify.addHook('onRequest', async function (request, _reply) {
    request.orm = orm;
  })
  
}

export default fastifyPlugin(mikroOrmPlugin)