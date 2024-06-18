import { FastifyInstance } from 'fastify';
import { AuthController } from '../../controllers/authController';

export async function authRoutes(fastify: FastifyInstance) {
    fastify.get("/google", AuthController.googleLogin);

    fastify.post('/register', AuthController.register);
    fastify.post('/login', AuthController.login);
    fastify.post('/refresh', AuthController.refreshToken);
    fastify.post('/logout', AuthController.logout);
}