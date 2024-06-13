import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

interface User {
  userId: string;
  role: string;
  username: string;
  displayName: string;
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: User;
  }
}

async function isAdminMiddleware(fastify: FastifyInstance) {
  fastify.addHook('preHandler', async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const role = req.user?.role;
      if (role !== "admin") {
        res.status(403).send({ message: "Forbidden" });
      }
    } catch (error) {
      res.send({ error: error });
    }
  });
}

export default isAdminMiddleware;