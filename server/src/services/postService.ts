import { prisma } from "..";
import { searchEngine } from "../utils/searchEngine";

type CategoryType = "Buôn bán" | "Tâm sự chuyện đời" | "Húp sò";

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
    comments: IComment[];
    category_name: string;
};

interface IComment {
    author_name: string,
    content: string,
    created_at: Date,
    updated_at: Date
}

export class PostService {
    constructor() {}

    public static async createPost(data: PostRequestBody) {
        const allowedCategoryTypes: CategoryType[] = ["Buôn bán", "Tâm sự chuyện đời", "Húp sò"];

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
                    title: true,
                    content: true,
                    author_name: true,
                    created_at: true,
                    updated_at: true,
                    category_name: true,
                    comments: {
                        select: {
                            author_name: true,
                            content: true,
                            created_at: true,
                            updated_at: true
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
}