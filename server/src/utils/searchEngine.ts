import { IPost } from "../services/postService"

export const searchEngine = (input: string, posts: IPost[]) => {
    const result = posts.filter(v => {
        return v.title.includes(input);
    })
    return result;
}