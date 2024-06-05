import Fastify from 'fastify'
import { PrismaConnect } from './connectToDB'
import { authRoutes } from './routes/authRoute'
import { userRoutes } from './routes/userRoute'
import { postRoutes } from './routes/postRoute'
import cookie from "@fastify/cookie"
import type { FastifyCookieOptions } from '@fastify/cookie'
import envConfig from './config'

const fastify = Fastify({
  logger: true
})

fastify.register(cookie, {
  secret: envConfig?.COOKIE_SECRET as string,
  parseOptions: {}
} as FastifyCookieOptions ) 

fastify.get('/', (request, reply) => {
  reply.send("Hello world!")
})

fastify.register(authRoutes, { prefix: "/auth" });
fastify.register(userRoutes, { prefix: "/user" });
fastify.register(postRoutes, { prefix: "/post" });

const start = async () => {
    fastify.listen({ port: 3300 }, (err, address) => {
      if (err) throw err;
    });
    await PrismaConnect.connect();
}

const prisma = PrismaConnect.getPrismaClient();

start();

export { prisma, fastify };