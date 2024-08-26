import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserPayLoad } from '../types/userPayLoad';
import { createNodeCache } from '../utils/createCache';

const cache = createNodeCache(300);

async function authMiddleware(fastify: FastifyInstance) {
  fastify.decorate('authMiddleware', async (req: FastifyRequest, res: FastifyReply) => {

    try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.accessToken;

      if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
      }

      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;

      if (!decoded || typeof decoded !== 'object') {
        return res.status(403).send({ error: "Invalid Token" })
      }

      req.user = decoded as UserPayLoad;
      
      let userPayLoadCache;
      userPayLoadCache = cache.get<UserPayLoad>(`user_id:${req.user?.id}`);

      if (!userPayLoadCache) {
        cache.set(`user_id:${req.user?.id}`, req.user);
      }

    } catch (error) {
      res.status(500).send({ error: error instanceof Error ? error.message : "An unknown error occured" });
    }
  });
}

export default authMiddleware;
