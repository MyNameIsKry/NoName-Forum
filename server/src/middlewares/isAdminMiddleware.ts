import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

async function isAdminMiddleware(fastify: FastifyInstance) {

  fastify.decorate('isAdminMiddleware', async (req: FastifyRequest, res: FastifyReply) => {
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