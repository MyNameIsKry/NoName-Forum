import Fastify from 'fastify'
import { PrismaConnect } from './connectToDB'
import { authRoutes } from './routes/authRoute'
import { userRoutes } from './routes/userRoute'
import { postRoutes } from './routes/postRoute'
import cookie from "@fastify/cookie"
import type { FastifyCookieOptions } from '@fastify/cookie'
import envConfig from './config'
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const fastify = Fastify({
  logger: true
})

const swaggerOptions = {
  swagger: {
      info: {
          title: "NoName Forum",
          description: "Documents.",
          version: "1.0.0",
      },
      host: "localhost",
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [{ name: "Default", description: "Default" }],
  },
};

const swaggerUiOptions = {
  routePrefix: "/docs",
  exposeRoute: true,
};

fastify.register(fastifySwagger, swaggerOptions);
fastify.register(fastifySwaggerUi, swaggerUiOptions);



fastify.register(cookie, {
  secret: envConfig?.COOKIE_SECRET as string,
  parseOptions: {}
} as FastifyCookieOptions ) 

fastify.get('/', (request, reply) => {
  reply.send("Hello world!")
})

fastify.register(authRoutes, { prefix: "/auth" });
fastify.register(userRoutes, { prefix: "/users" });
fastify.register(postRoutes, { prefix: "/posts" });


const start = async () => {
  fastify.listen({ port: 3300 }, (err, address) => {
    if (err) throw err;
  });
  await PrismaConnect.connect();
}

const prisma = PrismaConnect.getPrismaClient();

start();

export { prisma, fastify };