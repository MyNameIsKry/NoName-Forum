import { prisma } from "..";
import Joi from "joi";
import { createNodeCache } from "../utils/createCache";

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

const cache = createNodeCache(300);

export class UserService {
    constructor() {}

    public static async getUserInfo(username: string): Promise<IUserInfo | { error: string }> {
        const cacheUser = cache.get<IUserInfo>(`user_username:${username}`);

        if (cacheUser)
            return cacheUser;

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
                    }
                },
            }
        });
        if (!user) 
            return { error: "Không tìm thấy username này!" };
        cache.set(`user_username:${username}`, user);
        return user;
    }

    public static async getMyInfo(userId: string): Promise<IUserInfo> {
        const cacheMyInfo = cache.get<IUserInfo>(`myInfo_id:${userId}`);

        if (cacheMyInfo)
            return cacheMyInfo;

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

        cache.set(`myInfo_id:${userId}`, myInfo);
        return myInfo!;
    }

    public static async changeDisplayName(userId: string, displayName: string) {
        try {
            const displayNameSchema = Joi.object({
                displayName: Joi.string().min(2).max(15).required()
            });
            const { error } = displayNameSchema.validate({displayName: displayName});
            if (error)
                return { error: error.message };

            await prisma.user.update({
                where: { id: userId },
                data: {
                    display_name: displayName
                }
            });

            cache.del(`myInfo_id:${userId}`); // Xóa cache info của mình sau khi cập nhật displayName thành công

            return { message: "Thay đổi display_name thành công!" };
        } catch (err) {
            console.log(err);
            return {error: err instanceof Error ? err.message : "An unknown error occured" };
        }
    }

    public static async changeBio(userId: string, bio: string) {
        try {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    bio: bio
                }
            });

            cache.del(`myInfo_id:${userId}`); // Xóa cache info của mình sau khi cập nhật bio thành công

            return { message: "Thay đổi bio thành công" };
        } catch(err) {
            console.log(err);
            return {error: err instanceof Error ? err.message : "An unknown error occured" };
        }
    }
}