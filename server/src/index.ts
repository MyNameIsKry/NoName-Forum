import Fastify from 'fastify'
import { PrismaConnect } from './connectToDB'
import { authRoutes } from './routes/public/authRoute'
import { userRoutes } from './routes/public/userRoute'
import { postRoutes } from './routes/public/postRoute'
import { commentRoutes } from './routes/public/commentRoute'
import privateRoute from './routes/privateRoute'
import cookie from "@fastify/cookie"
import type { FastifyCookieOptions } from '@fastify/cookie'
import envConfig from './config'
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyPassport from "@fastify/passport";
import fastifySecureSession from '@fastify/secure-session';
import "./lib/auth";

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

fastify.register(fastifySecureSession, {
  key: Buffer.from(envConfig?.SESSION_SECRET as string, 'hex'),
  cookie: {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 86400 // 24 hours in seconds
  }
});

fastify.get('/', (request, reply) => {
  reply.send("Hello world!")
})

fastify.register(authRoutes, { prefix: "/auth" });
fastify.register(userRoutes, { prefix: "/users" });
fastify.register(postRoutes, { prefix: "/posts" });
fastify.register(commentRoutes, { prefix: "/posts" });
fastify.register(privateRoute);

fastify.register(fastifyPassport.initialize());
fastify.register(fastifyPassport.secureSession());

fastify.get('/oauth2/google', {
  preValidation: fastifyPassport.authenticate('google', { scope: ['profile', 'email'] }),
  handler: (request, reply) => {
    reply.send("lỏ lỏ lỏ lỏ cac cac cac cac")
  }
});

fastify.get(
  '/oauth2/google/callback',
  {
    preValidation: fastifyPassport.authenticate('google', { failureRedirect: '/' }),
    handler: (request, reply) => {
      // Successful authentication
      reply.send({ message: 'Logged in with Google' });
    }
  }
);

const start = async () => {
  fastify.listen({ port: 3300 }, (err, address) => {
    if (err) throw err;
  });
  await PrismaConnect.connect();
}

const prisma = PrismaConnect.getPrismaClient();

start();

export { prisma, fastify };