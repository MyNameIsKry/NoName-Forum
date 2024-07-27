import { FastifyInstance, FastifyRequest, PassportUser } from 'fastify';
import { UserPayLoad } from './userPayLoad';

declare module 'fastify' {
    interface FastifyInstance {
      authMiddleware: any;
      isAdminMiddleware: any;
    }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: UserPayLoad;
  }
}

declare module 'fastify' {
  interface PassportUser {
    id: string;
    username: string;
    email: string;
  }
}