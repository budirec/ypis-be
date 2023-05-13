import { FastifyInstance, FastifyPluginAsync } from "fastify"
import fastifyPlugin from "fastify-plugin"
import { MikroORM } from "@mikro-orm/postgresql"
import config from "../config/mikro-orm.config"
import { MikroORMOptions, RequestContext } from "@mikro-orm/core"


const mikroOrmPlugin: FastifyPluginAsync<MikroORMOptions> = async (fastify: FastifyInstance): Promise<void> => { 
  const orm = await MikroORM.init(config);
  await RequestContext.createAsync(orm.em, ()=>{ return new Promise(_resolve => ()=>{return;});});
  // fastify.addHook('onRequest', async function (request, _reply) {
  fastify.orm = orm;
    // RequestContext.create(orm.em, )
  // })
  
}

export default fastifyPlugin(mikroOrmPlugin)