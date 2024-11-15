import { type } from "os";

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