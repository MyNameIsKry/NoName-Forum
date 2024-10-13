import { prisma } from "..";
import { createNodeCache } from "../utils/createCache";
import { IPost, IComment } from "./postService";

const cache = createNodeCache(300);

interface IPostHasId {
    author_name: string;
    title: string;
    content: string;
    comments: IComment[];
    created_at: Date;
    updated_at: Date;
    category_name: string;
}

export class CommentService {
    constructor() {}

    // Lấy all comments của bài viết cụ thể
    public static async getAllComments(postId: string): Promise<IComment[] | { error: string }> { 
        try {
            const cachePostId = cache.get<IPostHasId>(`post_id:${postId}`);

            if (cachePostId && cachePostId.comments) {
                return cachePostId.comments; 
            }

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

            if (cachePostId) {
                cachePostId.comments = comments;
                cache.set(`post_id:${postId}`, cachePostId); 
            } else {
                cache.set(`post_id:${postId}`, {
                    author_name: "",
                    title: "",
                    content: "",
                    comments: comments,
                    created_at: new Date(),
                    updated_at: new Date(),
                    category_name: "",
                });
            }

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

            const cachePost = cache.get<IPost>(`post_id:${postId}`);
            if (cachePost) {
                delete (cachePost as any).comments;
                cache.set(`post_id:${postId}`, cachePost);
            }            

            return newComment;
        } catch (err) {
            console.log(err);            
            return { error: err instanceof Error ? err.message : "Unknown error occurred" };
        }
    }
}
