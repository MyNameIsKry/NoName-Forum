import { FastifyInstance } from 'fastify';
import { AuthController } from '../controllers/authController';

export async function authRoutes(fastify: FastifyInstance) {
    fastify.post('/register', AuthController.register);
    fastify.post('/login', AuthController.login);
}