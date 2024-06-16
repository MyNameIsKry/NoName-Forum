import { CommentController } from '../../controllers/commentController';
import { FastifyInstance } from 'fastify';
import authMiddleware from '../../middlewares/authMiddleware';

export async function commentRoutes(fastify: FastifyInstance) {
    await authMiddleware(fastify);
    fastify.get("/:postId/comments", CommentController.getAllComments); // Lấy tất cả bình luận của bài viết cụ thể
    fastify.post("/:postId/comments", CommentController.createComment); // Tạo bình luận mới cho bài viết cụ thể
}