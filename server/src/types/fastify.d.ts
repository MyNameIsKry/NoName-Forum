import { FastifyInstance, FastifyRequest, PassportUser } from 'fastify';

declare module 'fastify' {
    interface FastifyInstance {
      authMiddleware: any;
      isAdminMiddleware: any;
      isTargetUserMiddleware: any;
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
    role: string;
  }
}