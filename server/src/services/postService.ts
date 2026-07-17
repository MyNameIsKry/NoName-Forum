import { prisma } from "..";
import { Prisma } from "@prisma/client";
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

export interface IHotPostRow {
    id: string;
    author_id: string;
    author_name: string;
    avatar_url: string | null;
    title: string;
    content: string;
    category_name: string;
    created_at: Date;
    score: number;
    commentsCount: number;
}

const ALLOWED_CATEGORIES: CategoryType[] = ["buon-ban", "tam-su", "cong-nghe"];

export class PostService {
    constructor() {}

    public static async createPost(data: PostRequestBody) {
        const { authorId, authorName, title, content, categoryName } = data;

        if (!title || !content || !authorName || !authorId || !categoryName)
            return { error: "Thiếu các trường!" };

        if (!ALLOWED_CATEGORIES.includes(categoryName))
            return { error : "Invalid Category type" };

        try {
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

    public static async getAllPost(): Promise<Array<IPost & { id: string; avatar_url: string | null; commentsCount: number; votes: { value: number }[] }> | { error: string }> {
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
                    },
                    _count: {
                        select: { comments: true }
                    }
                }
            });

            const shaped = allPosts.map(p => ({
                id: p.id,
                title: p.title,
                content: p.content,
                author_name: p.author_name,
                created_at: p.created_at,
                updated_at: p.updated_at,
                category_name: p.category_name,
                avatar_url: p.author?.avatar_url ?? null,
                commentsCount: p._count.comments,
                votes: p.votes
            }));

            return shaped;
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
                    },
                    _count: {
                        select: { comments: true }
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

    /**
     * Hot posts: sorted by score (SUM of Vote.value) DESC, then created_at DESC.
     * Single SQLite round-trip via $queryRaw. Parameterized — no SQL injection.
     * NOTE: SQLite-flavored. If migrating to Postgres, revisit the JOIN syntax.
     */
    public static async getHotPosts(params: {
        limit?: number;
        offset?: number;
        category?: string;
    }): Promise<IHotPostRow[] | { error: string }> {
        const limit = Math.min(Math.max(params.limit ?? 20, 1), 50);
        const offset = Math.max(params.offset ?? 0, 0);
        const category = params.category;

        if (category !== undefined && !ALLOWED_CATEGORIES.includes(category as CategoryType)) {
            return { error: "Invalid Category type" };
        }

        const whereClause = category
            ? Prisma.sql`WHERE p.category_name = ${category}`
            : Prisma.empty;

        try {
            const rows = await prisma.$queryRaw<IHotPostRow[]>`
                SELECT
                    p.id              AS id,
                    p.author_id       AS author_id,
                    p.author_name     AS author_name,
                    u.avatar_url      AS avatar_url,
                    p.title           AS title,
                    p.content         AS content,
                    p.category_name   AS category_name,
                    p.created_at      AS created_at,
                    COALESCE(SUM(v.value), 0) AS score,
                    (SELECT COUNT(*) FROM Comment c WHERE c.post_id = p.id) AS commentsCount
                FROM Post p
                LEFT JOIN User u ON u.id = p.author_id
                LEFT JOIN Vote  v ON v.postId = p.id
                ${whereClause}
                GROUP BY p.id
                ORDER BY score DESC, p.created_at DESC
                LIMIT ${limit} OFFSET ${offset}
            `;

            return rows;
        } catch (err) {
            console.log(err);
            return { error: err instanceof Error ? err.message : "Unknow error occured" };
        }
    }
}
