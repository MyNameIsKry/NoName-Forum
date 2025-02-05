import { prisma } from "..";
import { searchEngine } from "../utils/searchEngine";

export interface PostRequestBody {
    authorId?: string;
    authorName?: string;
    title: string;
    content: string;
    categoryName: CategoryType;
}

export interface IPost {
    author_name: string;
    title: string; 
    content: string;
    created_at: Date;
    updated_at: Date;
    category_name: string;
};

interface IRepliesComment {
    content: string;
    author_name: string;
    created_at: Date;
    updated_at: Date;
}

export interface IComment {
    author_name: string,
    content: string,
    replies?: IRepliesComment[]
    created_at: Date,
    updated_at: Date
}

export class PostService {
    constructor() {}

    public static async createPost(data: PostRequestBody) {
        const allowedCategoryTypes: CategoryType[] = ["buon-ban", "tam-su", "cong-nghe"];

        try {
            const { authorId, authorName, title, content, categoryName } = data;

            if (!title || !content || !authorName || !authorId || !categoryName)
                return { error: "Thiếu các trường!" };

            if (!allowedCategoryTypes.includes(categoryName))
                return { error : "Invalid Category type" };

            const newPost = await prisma.post.create({
                data: {
                    author_id: authorId,
                    author_name: authorName,
                    title: title, 
                    content: content,
                    created_at: new Date(),
                    updated_at: new Date(),
                    category_name: categoryName
                }
            });

            return newPost;
        } catch(err) {
            console.log(err);
            return { error: err instanceof Error ? err.message : "Unknow error occured"};
        }
    }

    public static async getAllPost(): Promise<IPost[] | { error: string }> {
        try {     
            const allPosts = await prisma.post.findMany({
                select:{
                    id: true,
                    title: true,
                    content: true,
                    author_name: true,
                    created_at: true,
                    updated_at: true,
                    category_name: true,
                    author: {
                        select: {
                            avatar_url: true
                        }
                    },
                    votes: {
                        select: {
                            value: true
                        }
                    }
                }
            });

            return allPosts;
        } catch(err) {
            console.log(err); 
            return { error: err instanceof Error ? err.message : "Unknow error occured" };
        }
    }

    public static async getPostById(postId: string): Promise<IPost | { error: string }> {
        try {
            const post = await prisma.post.findUnique({
                where: { id: postId },
                select: {
                    title: true,
                    content: true,
                    author_name: true,
                    created_at: true,
                    updated_at: true,
                    category_name: true,
                    author: {
                        select: {
                            avatar_url: true
                        }
                    },
                    comments: {
                        select: {
                            author_name: true,
                            content: true,
                            created_at: true,
                            updated_at: true,
                            replies: true
                        }
                    },
                    votes: {
                        select: {
                            value: true
                        }
                    }
                }
            })

            if (!post)
                return { error: "Không tìm thấy id bài viết này" };

            return post;
            
        } catch (err) {
            console.log(err); 
            return { error: err instanceof Error ? err.message : "Unknow error occured" };
        }
    }

    public static async getPostByName(input: string): Promise<IPost[] | { error: string }> {
        try {
            const allPosts = await PostService.getAllPost();
            if ('error' in allPosts) 
                return { error: allPosts.error };
            else {
                const result = searchEngine(input, allPosts);
                return result;
            }
                
        } catch(err) {
            console.log(err);
            return { error:  err instanceof Error ? err.message : "Unknow error occured" };
        }
    }

    public static async getPostByCategory(categoryName: CategoryType): Promise<IPost[] | { error: string }> {
         try {
            const posts = await prisma.post.findMany({
                where: {
                    category_name: categoryName
                },
                select: {
                    author_name: true,
                    title: true,
                    content: true,
                    created_at: true,
                    updated_at: true,
                    category_name: true,
                    comments: {
                        select: {
                            author_name: true,
                            content: true,
                            created_at: true,
                            updated_at: true,
                        }
                    },
                    votes: {
                        select: {
                            value: true
                        }
                    }
                }
            })
            if (posts.length === 0)
                return { error: `Không tìm thấy post theo category: ${categoryName}` };

            return posts;
        } catch(err) {  
            console.log(err);
            return { error:  err instanceof Error ? err.message : "Unknow error occured" };
        }
    }
}