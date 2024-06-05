import { FastifyInstance } from 'fastify';
import { PostController } from '../controllers/postController';
import authMiddleware from '../middlewares/authMiddleware';

export async function postRoutes(fastify: FastifyInstance) {
    fastify.get("/all", PostController.getAllPost);

    fastify.register(async (authenticatedRoutes) => {
        authenticatedRoutes.addHook('preHandler', async (req, res) => {
          await authMiddleware(authenticatedRoutes);
        });
    });
     
    fastify.post("/new", PostController.createNewPost);
}