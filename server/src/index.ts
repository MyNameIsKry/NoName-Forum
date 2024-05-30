import Fastify from 'fastify'
import { PrismaConnect } from './connectToDB'
import { authRoutes } from './routes/authRoute'
import { userRoutes } from './routes/userRoute'
import authMiddleware from './middlewares/authMiddleware'

const fastify = Fastify({
  logger: true
})

fastify.get('/', (request, reply) => {
  reply.send("Hello world!")
})

fastify.register(authRoutes, { prefix: "/auth" });
fastify.register(userRoutes);

authMiddleware(fastify);

const start = async () => {
    fastify.listen({ port: 3300 }, (err, address) => {
      if (err) throw err;
    });
    await PrismaConnect.connect();
}

const prisma = PrismaConnect.getPrismaClient();

start();

export { prisma, fastify };