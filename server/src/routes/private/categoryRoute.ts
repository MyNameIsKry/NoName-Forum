import { FastifyInstance } from 'fastify';
import { CategoryController } from '../../controllers/categoryController';

export async function categoryRoutes(fastify: FastifyInstance) {
    fastify.put("/create", { preValidation: [fastify.authMiddleware, fastify.isAdminMiddleware] }, CategoryController.createCategory);
}