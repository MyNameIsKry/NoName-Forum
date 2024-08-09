import Fastify from 'fastify'
import { PrismaConnect } from './connectToDB'
import { authRoutes } from './routes/public/authRoute'
import { userRoutes } from './routes/public/userRoute'
import { postRoutes } from './routes/public/postRoute'
import { commentRoutes } from './routes/public/commentRoute'
import { oauth2Route } from './routes/public/oauth2Route'
import privateRoute from './routes/privateRoute'
import cookie from "@fastify/cookie"
import type { FastifyCookieOptions } from '@fastify/cookie'
import envConfig from './config'
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyPassport from "@fastify/passport";
import fastifySecureSession from '@fastify/secure-session';
import fastifyCors from '@fastify/cors'
import "./lib/auth";
import authMiddleware from './middlewares/authMiddleware'
import isAdminMiddleware from './middlewares/isAdminMiddleware'

const fastify = Fastify({
  logger: true
})

fastify.register(fastifyCors, {
  credentials: true,
  origin: "*"
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
    maxAge: 24 * 60 * 60 // 24 hours in seconds
  }
});

authMiddleware(fastify);
isAdminMiddleware(fastify);

fastify.register(authRoutes, { prefix: "/auth" });
fastify.register(userRoutes, { prefix: "/users" });
fastify.register(postRoutes, { prefix: "/posts" });
fastify.register(commentRoutes, { prefix: "/posts" });
fastify.register(privateRoute);

fastify.register(fastifyPassport.initialize());
fastify.register(fastifyPassport.secureSession());

fastify.register(oauth2Route, { prefix: "/oauth2" });

const start = async () => {
  fastify.listen({ port: 3300 }, (err, address) => {
    if (err) throw err;
  });
  await PrismaConnect.connect();
}

const prisma = PrismaConnect.getPrismaClient();

start();

export { prisma, fastify };