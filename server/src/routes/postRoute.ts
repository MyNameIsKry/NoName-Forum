import { FastifyInstance } from 'fastify';
import { PostController } from '../controllers/postController';
import authMiddleware from '../middlewares/authMiddleware';

export async function postRoutes(fastify: FastifyInstance) {
    await authMiddleware(fastify);
    fastify.get("/all", PostController.getAllPost);
    fastify.post("/new", PostController.createNewPost);
    fastify.get("/search", PostController.getPostByName);
}