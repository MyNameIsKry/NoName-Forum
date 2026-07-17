import { FastifyInstance } from 'fastify';
import { PostController } from '../../controllers/postController';

export async function postRoutes(fastify: FastifyInstance) {
    fastify.get("/", PostController.getHotPosts); // Hot feed: score DESC, created_at DESC. Query: ?offset=&limit=&category=
    fastify.get("/:postId", PostController.getPostById); // Lấy bài viết theo ID
    fastify.get("/search", { preValidation: [fastify.authMiddleware] }, PostController.getPostByName); // Tìm kiếm bài viết theo tên
    fastify.get("/category/:categoryName", PostController.getPostByCategory); // Lấy bài viết theo thể loại

    fastify.post("/", { preValidation: [fastify.authMiddleware] }, PostController.createNewPost); // Tạo bài viết mới
}
