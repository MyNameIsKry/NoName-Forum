import { FastifyRequest, FastifyReply } from "fastify";
import { PostService, PostRequestBody } from "../services/postService";

export class PostController {
    constructor() {}
    
    public static async createNewPost(req: FastifyRequest<{ Body: PostRequestBody }>, res: FastifyReply) {
        try {
            const { title, content} = req.body;
            const authorId = req.user?.userId;
            const authorName = req.user?.username;
    
            if (!authorId || !authorName) return res.status(403).send({ error: "User is not authentiacted" });
    
            const newPost = await PostService.createPost({ authorId, authorName, title, content});
            
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
}