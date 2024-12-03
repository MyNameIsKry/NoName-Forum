import { prisma } from "..";
import { IComment } from "./postService";


export class CommentService {
    constructor() {}

    public static async getAllComments(postId: string): Promise<IComment[] | { error: string }> { 
        try {
            const comments = await prisma.comment.findMany({
                where: { post_id: postId, parent_id: null },
                select: {
                    author_name: true,
                    content: true,
                    replies: {
                        select: {
                            author_name: true,
                            content: true,
                            created_at: true,
                            updated_at: true,
                        }
                    },
                    created_at: true,
                    updated_at: true,
                }
            });

            return comments;
        } catch (err) {
            console.log(err);
            return { error: err instanceof Error ? err.message : "Unknown error occurred" };
        }
    }

    public static async createComment(postId: string, authorId: string, authorName: string, content: string) {
        try {   
            const newComment = await prisma.comment.create({
                data: {
                    post_id: postId,
                    author_name: authorName,
                    author_id: authorId,
                    content: content,
                }
            });

            return newComment;
        } catch (err) {
            console.log(err);            
            return { error: err instanceof Error ? err.message : "Unknown error occurred" };
        }
    }
}
