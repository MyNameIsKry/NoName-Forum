import { FastifyInstance } from 'fastify';
import { PostController } from '../../controllers/postController';
import authMiddleware from '../../middlewares/authMiddleware';

export async function postRoutes(fastify: FastifyInstance) {
    await authMiddleware(fastify);
    fastify.get("/", PostController.getAllPost); // Lấy tất cả bài viết
    fastify.get("/:postId", PostController.getPostById); // Lấy bài viết theo ID
    fastify.get("/search", PostController.getPostByName); // Tìm kiếm bài viết theo tên
    fastify.get("/category/:categoryName", PostController.getPostByCategory); // Lấy bài viết theo thể loại
    
    fastify.post("/", PostController.createNewPost); // Tạo bài viết mới
}