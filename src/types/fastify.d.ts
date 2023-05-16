import { MikroORM } from "@mikro-orm/core";

declare module 'fastify' {
  interface FastifyRequest {
    orm: MikroORM
  }
}