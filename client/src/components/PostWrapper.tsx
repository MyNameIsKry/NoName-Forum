"use client";

import Post from './Post';

interface IPostWrapperProps {
    id: string;
    title: string;
    avatar_url: string;
    category_name: string;
    created_at: Date;
    author_name: string;
    onClick(): void;
}

const PostWrapper: React.FC<IPostWrapperProps> = (props) => {
    return <Post {...props} onClick={props.onClick} />;
};

export default PostWrapper;
