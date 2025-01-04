import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import jwt, { JwtPayload } from 'jsonwebtoken';

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

    } catch (error) {
      res.status(500).send({ error: error instanceof Error ? error.message : "An unknown error occured" });
    }
  });
}

export default authMiddleware;
