import { prisma } from "..";

export interface PostRequestBody {
    authorId?: string;
    authorName?: string;
    title: string;
    content: string;
}

export class PostService {
    constructor() {}

    public static async createPost(data: PostRequestBody) {
        try {
            const { authorId, authorName, title, content } = data;

            if (!title || !content || !authorName || !authorId)
                return { error: "Thiếu các trường!" };

            const newPost = await prisma.post.create({
                data: {
                    author_id: authorId,
                    author_name: authorName,
                    title: title, 
                    content: content,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            });

            return newPost;
        } catch(err) {
            console.log(err);
            return { error: err instanceof Error ? err.message : "Unknow error occured"};
        }
    }

    public static async getAllPost() {
        try {
            const allPosts = await prisma.post.findMany({
                include: {
                    author: true,
                    comments: true
                }
            });
            return allPosts;
        } catch(err) {
            console.log(err);
            return { error:  err instanceof Error ? err.message : "Unknow error occured" };
        }
    }
}