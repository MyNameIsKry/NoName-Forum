import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define a custom interface for the user object
interface User {
  userId: string;
}

// Extend the FastifyRequest interface to include the user property
declare module 'fastify' {
  interface FastifyRequest {
    user?: User;
  }
}

async function authMiddleware(fastify: FastifyInstance) {
  fastify.addHook('preHandler', async (req: FastifyRequest, res: FastifyReply) => {
    // Skip authorization check for login and register routes
    const publicRoutes = ['/auth/login', '/auth/register'];
    if (publicRoutes.includes(req.routeOptions.url!)) {
      return;
    }

    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
      }

      // Verify the token and ensure it matches the User interface structure
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      if (!decoded || typeof decoded !== 'object' || !('userId' in decoded)) {
        throw new Error('Invalid token');
      }

      // Assign the decoded user object to the request
      req.user = decoded as User;
    } catch (error) {
      res.send({ error: error });
    }
  });
}

export default authMiddleware;
