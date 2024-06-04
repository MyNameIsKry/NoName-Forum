import { prisma } from "..";

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
                posts: true,
                registered_at: true,
            }
        });
        if (!user) 
            return { error: "Không tìm thấy username này!" };
        return user;
    }
}