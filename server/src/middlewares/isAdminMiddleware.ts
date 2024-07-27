import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '..';
import NodeCache from "node-cache";

async function isAdminMiddleware(fastify: FastifyInstance) {
  const myCache = new NodeCache({
    stdTTL: 300
  });
  fastify.decorate('isAdminMiddleware', async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const userId = req.user?.id;
      const userData = await prisma.user.findUnique({
        where: {
          id: userId,
        }
      });
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