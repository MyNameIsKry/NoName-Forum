import axios from "axios";
import { getCurrentUserId } from "@/lib/getCurrentUser";
import PostList from "@/components/PostList";
import EmptyState from "@/components/EmptyState";

const PAGE_SIZE = 20;

const fetchFirstPage = async () => {
    try {
        const res = await axios.get<IPost[]>(
            `${process.env.NEXT_PUBLIC_API_URL}/posts?offset=0&limit=${PAGE_SIZE + 1}`
        );
        const data = res.data ?? [];
        const hasMore = data.length > PAGE_SIZE;
        return { posts: data.slice(0, PAGE_SIZE), hasMore };
    } catch {
        return { posts: [], hasMore: false };
    }
};

const Home = async () => {
    const [currentUserId, { posts, hasMore }] = await Promise.all([
        getCurrentUserId(),
        fetchFirstPage()
    ]);

    if (posts.length === 0) {
        return <EmptyState />;
    }

    return (
        <PostList
            initialPosts={posts}
            initialHasMore={hasMore}
            currentUserId={currentUserId ?? undefined}
        />
    );
};

export default Home;
