import { FastifyRequest, FastifyReply } from 'fastify';
import { CommentService } from '../services/commentService';

interface IPostCommandParams {
    postId: string;
}

interface IPostCommandBody {
    content: string;
}

interface IPostCommand {
    Params: IPostCommandParams;
    Body: IPostCommandBody;
}

export class CommentController {
    constructor() {}

    public static async getAllComments(req: FastifyRequest<{ Params: { postId: string } }>, res: FastifyReply) {
        try {            
            const { postId } = req.params;
            const result = await CommentService.getAllComments(postId);
            if ("error" in result)
                res.status(400).send(result);
            else
                res.status(200).send(result);
        } catch(err) {
            console.log(err);
            res.status(500).send({ error: err instanceof Error ? err.message : "An unknown error occured" });
        }
    }

    public static async createComment(req: FastifyRequest<IPostCommand>, res: FastifyReply) {
        try {
            const authorId = req.user?.userId;
            const authorName = req.user?.displayName;
            const { postId } = req.params;
            const { content } = req.body;

            if (!authorId || !authorName)
                return res.status(403).send({ error: "User is not authentiacted" });

            const result = await CommentService.createComment(postId, authorId, authorName, content);
            
            if ("error" in result)
                res.status(400).send(result);
            else
                res.status(200).send(result);

        } catch (err) {
            console.log(err);            
            res.status(500).send({ error: err instanceof Error ? err.message : "An unknown error occured" });
        }
    }
}