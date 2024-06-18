import { CommentController } from '../../controllers/commentController';
import { FastifyInstance } from 'fastify';
import authMiddleware from '../../middlewares/authMiddleware';

export async function commentRoutes(fastify: FastifyInstance) {
    await authMiddleware(fastify);
    fastify.post("/:postId/comments", CommentController.createComment); // Tạo bình luận mới cho bài viết cụ thể
}