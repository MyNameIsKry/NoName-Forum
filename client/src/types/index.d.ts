interface IRegister {
    email: string;
    username: string;
    password: string;
    repeatPassword?: string;  
}

interface IPost {
    id: string;
    author_name: string;
    category_name: string;
    title: string;
    content: string;
    created_at: Date;
}

interface IUserInfo {
    status: number;
    user?: {
        id: string;
        username: string;
        display_name: string;
        bio: string | null;
        avatar_url: string | null;
        role: string;
        registered_at: Date;
        posts: IPost[];
    }
    error?: string;
}

type NotiType = 'success' | 'error' | 'warning' | 'info';

type DetailsPostType = {
    title: string;
    content: string;
    author_name: string;
    created_at: Date;
    updated_at: Date;
    category_name: string;
    author: {
        avatar_url: string;
    };
    comment?: any;
    votes?: any;
}

type CommentType = {
    id: string;
    post_id: string;
    parent_id: string | null;
    author_id: string;
    author_name: string;
    content: string;
    created_at: Date;
    updated_at: Date;
}

interface IComment {
    id: string
    author_name: string,
    content: string,
    replies?: IRepliesComment[]
    created_at: Date,
    updated_at: Date
}