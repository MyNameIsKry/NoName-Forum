import axios from "axios";
import { notFound } from "next/navigation";
import { getCurrentUserId } from "@/lib/getCurrentUser";
import { isAllowedCategory, formatCategory } from "@/lib/categories";
import PostList from "@/components/PostList";
import EmptyState from "@/components/EmptyState";

const PAGE_SIZE = 20;

interface CategoryPageProps {
    params: { name: string };
}

const fetchFirstPage = async (category: string) => {
    try {
        const res = await axios.get<IPost[]>(
            `${process.env.NEXT_PUBLIC_API_URL}/posts?offset=0&limit=${PAGE_SIZE + 1}&category=${encodeURIComponent(category)}`
        );
        const data = res.data ?? [];
        const hasMore = data.length > PAGE_SIZE;
        return { posts: data.slice(0, PAGE_SIZE), hasMore };
    } catch {
        return { posts: [], hasMore: false };
    }
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
    const { name } = params;
    if (!isAllowedCategory(name)) {
        notFound();
    }

    const [currentUserId, { posts, hasMore }] = await Promise.all([
        getCurrentUserId(),
        fetchFirstPage(name)
    ]);

    return (
        <div>
            <h2 className="text-white text-2xl font-semibold mb-4">
                {formatCategory(name)}
            </h2>
            {posts.length === 0 ? (
                <EmptyState message="Chưa có bài viết nào trong danh mục này." />
            ) : (
                <PostList
                    initialPosts={posts}
                    initialHasMore={hasMore}
                    currentUserId={currentUserId ?? undefined}
                    category={name}
                />
            )}
        </div>
    );
};

export default CategoryPage;
