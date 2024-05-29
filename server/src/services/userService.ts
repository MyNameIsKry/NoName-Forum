import { prisma } from "..";

export class UserService {
    constructor() {}

    public static async getUserInfo(email: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        return user;
    }
}