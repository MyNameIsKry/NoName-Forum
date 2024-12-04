import React from 'react'
import axios from 'axios'
import { DetailsPostType } from '@/types';

const DetailsPost = async ({ params }: { params: { id: string } }) => {
    const fetchPost = async (id: string) => {
        const data = await axios.get<DetailsPostType>(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);

        return data.data;
    }

    const post = await fetchPost(params.id);
    return (
        <div className='text-white flex w-full gap-2 flex-col'>
            <span>
                Title: {post.title}
                
            </span>
            <span>
                Content: {post.content}

            </span>
            <span>
                Author_name: {post.author_name}

            </span>
        </div>
    )
}

export default DetailsPost;