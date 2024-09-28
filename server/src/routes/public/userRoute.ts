import { FastifyInstance } from 'fastify';
import { UserController } from '../../controllers/userController';

export async function userRoutes(fastify: FastifyInstance) {
    fastify.get("/:username", { preValidation: [fastify.authMiddleware] }, UserController.getUserInfo);
    fastify.get("/me", { preValidation: [fastify.authMiddleware] }, UserController.getMyInfo);
    fastify.put("/me/display_name", { preValidation: [fastify.authMiddleware] }, UserController.changeDisplayName);
    fastify.put("/me/bio", { preValidation: [fastify.authMiddleware] }, UserController.changeBio);
}