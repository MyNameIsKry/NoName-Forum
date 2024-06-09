import { prisma } from "..";

export interface ChangeDisplayNameRequestBody {
    displayName: string;
}

interface IUserInfo {
    username: string;
    display_name: string;
    bio: string | null;
    avatar_url: string | null;
    role: string;
    registered_at: Date;
}

export class UserService {
    constructor() {}

    public static async getUserInfo(username: string) {
        const user = await prisma.user.findUnique({ 
            where: { username },
            select: {
                username: true,
                display_name: true,
                bio: true,
                avatar_url: true,
                role: true,
                registered_at: true,
                posts: {
                    select: {
                        author_name: true,
                        title: true,
                        content: true,
                        created_at: true,
                        updated_at: true,
                        comments: true,
                    }
                },
            }
        });
        if (!user) 
            return { error: "Không tìm thấy username này!" };
        return user;
    }

    public static async getMyInfo(userId: string): Promise<IUserInfo> {
        const myInfo = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                username: true,
                display_name: true,
                bio: true,
                avatar_url: true,
                role: true,
                registered_at: true,
            }
        });
        return myInfo!;
    }

    public static async changeDisplayName(userId: string, displayName: string) {
        try {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    display_name: displayName
                }
            });

            return { message: "Thay đổi display_name thành công!" };
        } catch (err) {
            console.log(err);
            return {error: err instanceof Error ? err.message : "An unknown error occured" };
        }
    }
}