import { FastifyRequest, FastifyReply } from "fastify";
import { PostService, PostRequestBody } from "../services/postService";
import { CategoryType } from "../types/category/categoryTypes";

export class PostController {
    constructor() {}
    
    public static async createNewPost(req: FastifyRequest<{ Body: PostRequestBody }>, res: FastifyReply) {
        try {
            const { title, content, categoryName} = req.body;
            const authorId = req.user?.id;
            const authorName = req.user?.username;
            
            if (!authorId || !authorName) return res.status(403).send({ error: "User is not authentiacted" });
            
            const newPost = await PostService.createPost({ authorId, authorName, title, content, categoryName});
            
            if ('error' in newPost)
                res.status(400).send(newPost);
            else
                res.status(201).send(newPost);

        } catch (err) {
            res.status(500).send({ error: err instanceof Error ? err.message : "An unknown error occured" });
            console.log(err);
        }
    }
    
    public static async getAllPost(req: FastifyRequest, res: FastifyReply) {
        try {
            const result = await PostService.getAllPost();

            if ('error' in result)
                res.status(400).send(result);
            else
                res.status(200).send(result);
        } catch(err) {
            console.log(err);
            res.status(500).send({error: err instanceof Error ? err.message : "An unknown error occured" });
        }
    }

    public static async getPostById(req: FastifyRequest<{ Params: { postId: string } }>, res: FastifyReply) {
        try {
            const { postId } = req.params;
            const result = await PostService.getPostById(postId);
            
            if ('error' in result)
                res.status(400).send(result);
            else
                res.status(200).send(result);
            
        } catch (err) {
            console.log(err);
            res.status(500).send({error: err instanceof Error ? err.message : "An unknown error occured" });
        }
    }

    public static async getPostByName(req: FastifyRequest<{ Querystring: { postName: string } }>, res: FastifyReply) {
        try {
            const { postName } = req.query;
            if (!postName)
                res.status(400).send({ error: "Vui lòng nhập tên bài viết muốn tìm" });
            
            const result = await PostService.getPostByName(postName);
            if ('error' in result)
                res.status(400).send(result);
            else if (result.length === 0)
                res.status(404).send({ message: "Không tìm thấy bài viết nào" });
            else
                res.status(200).send(result);
        } catch(err) {
            console.log(err);
            res.status(500).send({error: err instanceof Error ? err.message : "An unknown error occured" });
        }
    }

    public static async getPostByCategory(req: FastifyRequest<{ Params: { categoryName: CategoryType } }>, res: FastifyReply) {
        try {
            const { categoryName } = req.params;
            const result = await PostService.getPostByCategory(categoryName);
            
            if ("error" in result)
                res.status(400).send(result);
            else
                res.status(200).send(result);
        } catch(err) {
            console.log(err);
            res.status(500).send({error: err instanceof Error ? err.message : "An unknown error occured" });
        }
    }
}