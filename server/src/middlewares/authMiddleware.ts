import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import jwt, { JwtPayload } from 'jsonwebtoken';

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

async function authMiddleware(fastify: FastifyInstance) {
  fastify.addHook('preHandler', async (req: FastifyRequest, res: FastifyReply) => {
    
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      if (!decoded || typeof decoded !== 'object' || !('userId' in decoded)) {
        return res.status(403).send({ error: "Invalid Token" })
      }

      req.user = decoded as User;
    } catch (error) {
      res.status(500).send({ error: error instanceof Error ? error.message : "An unknown error occured" });
    }
  });
}

export default authMiddleware;
