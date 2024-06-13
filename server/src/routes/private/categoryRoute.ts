import { FastifyInstance } from 'fastify';
import { CategoryController } from '../../controllers/categoryController';
import isAdminMiddleware from '../../middlewares/isAdminMiddleware';
import authMiddleware from '../../middlewares/authMiddleware';

export async function categoryRoutes(fastify: FastifyInstance) {
    await authMiddleware(fastify);
    await isAdminMiddleware(fastify);
    fastify.put("/create", CategoryController.createCategory);
}