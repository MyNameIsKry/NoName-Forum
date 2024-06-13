import { FastifyInstance } from 'fastify';
import { UserController } from '../../controllers/userController';
import authMiddleware from '../../middlewares/authMiddleware';

export async function userRoutes(fastify: FastifyInstance) {
    await authMiddleware(fastify);
    fastify.get("/search", UserController.getUserInfo);
    fastify.get("/me", UserController.getMyInfo);
    fastify.put("/display_name", UserController.changeDisplayName);
    fastify.put("/bio", UserController.changeBio);
}