import React from 'react'
import axios from 'axios'
import AuthorInfo from "@/components/AuthorInfo";
import PostContent from "@/components/PostContent";
import PostVotes from "@/components/PostVotes";
import PostTitle from '@/components/PostTitle';
import PostComment from '@/components/PostComment';

type DetailsPostWithCount = DetailsPostType & {
    votes?: { value: number }[];
    _count?: { comments: number };
};

const DetailsPost = async ({ params }: { params: { id: string } }) => {
    const fetchPost = async (id: string) => {
        const data = await axios.get<DetailsPostWithCount>(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);

        return data.data;
    }

    const post = await fetchPost(params.id);
    const votes: { value: number }[] = Array.isArray(post.votes) ? post.votes : [];
    const score = votes.reduce<number>((sum, v) => sum + (v?.value ?? 0), 0);
    const commentsCount = post._count?.comments ?? 0;

    return (
        <>
            <div className="container mx-auto p-4">
                <PostTitle title={post.title} category_name={post.category_name}/>
                <div className="flex gap-4 mb-6">
                    <AuthorInfo
                        avatar_url={post.author.avatar_url}
                        author_name={post.author_name}
                        created_at={post.created_at}
                    />
                </div>
                <PostContent content={post.content} />
                <PostVotes score={score} commentsCount={commentsCount} />
                <PostComment postId={params.id}/>
            </div>
        </>
    )
}

export default DetailsPost;
