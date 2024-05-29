import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/userController';

export async function userRoutes(fastify: FastifyInstance) {
    fastify.get("/search", UserController.getUserInfo);
}