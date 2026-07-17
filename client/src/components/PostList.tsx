"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Box, Button, Typography, Alert, CircularProgress } from "@mui/material";
import axios from "axios";
import Post from "./Post";

interface PostListProps {
    initialPosts: IPost[];
    initialHasMore: boolean;
    currentUserId?: string;
    category?: string;
    pageSize?: number;
}

const PostList: React.FC<PostListProps> = ({
    initialPosts,
    initialHasMore,
    currentUserId,
    category,
    pageSize = 20
}) => {
    const [posts, setPosts] = useState<IPost[]>(initialPosts);
    const [hasMore, setHasMore] = useState<boolean>(initialHasMore);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // On mount, re-render once so any client-side relative-time strings align
    // with what the server already emitted. Cheap and avoids hydration drift.
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams({
                offset: String(posts.length),
                limit: String(pageSize)
            });
            if (category) params.set("category", category);

            const url = `${process.env.NEXT_PUBLIC_API_URL}/posts?${params.toString()}`;
            const res = await axios.get<IPost[]>(url);
            const next = res.data ?? [];
            setPosts(prev => [...prev, ...next]);
            setHasMore(next.length === pageSize);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Không tải được thêm bài viết");
        } finally {
            setLoading(false);
        }
    }, [posts.length, hasMore, loading, category, pageSize]);

    return (
        <Box className="flex flex-col gap-4">
            {mounted && error && (
                <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}
            {posts.map(post => (
                <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    avatar_url={post.avatar_url ?? null}
                    category_name={post.category_name}
                    created_at={post.created_at}
                    author_name={post.author_name}
                    author_id={post.author_id}
                    score={post.score}
                    commentsCount={post.commentsCount}
                    currentUserId={currentUserId}
                />
            ))}
            <Box className="flex justify-center py-4">
                {hasMore ? (
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={loadMore}
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={16} /> : undefined}
                    >
                        {loading ? "Đang tải..." : "Tải thêm"}
                    </Button>
                ) : (
                    <Typography variant="body2" className="text-gray-500">
                        Đã hết bài viết.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default PostList;
