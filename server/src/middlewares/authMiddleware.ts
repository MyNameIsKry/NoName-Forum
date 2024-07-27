import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserPayLoad } from '../types/userPayLoad';
import { createNodeCache } from '../utils/createCache';



async function authMiddleware(fastify: FastifyInstance) {
  fastify.decorate('authMiddleware', async (req: FastifyRequest, res: FastifyReply) => {

    try {
    const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      if (!decoded || typeof decoded !== 'object') {
        return res.status(403).send({ error: "Invalid Token" })
      }

      const cache = createNodeCache(300);
      const userPayLoadCache = cache.get<string>(`user_id:${req.user?.id}`);

      if (!userPayLoadCache) {
        req.user = decoded as UserPayLoad;
        cache.set(`user_id:${req.user?.id}`, req.user);
      }
    } catch (error) {
      res.status(500).send({ error: error instanceof Error ? error.message : "An unknown error occured" });
    }
  });
}

export default authMiddleware;
