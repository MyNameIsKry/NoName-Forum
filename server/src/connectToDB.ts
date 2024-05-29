import { PrismaClient } from "@prisma/client";

export class PrismaConnect {
    private static prisma = new PrismaClient();
    constructor() {}
    
    public static getPrismaClient() {
        return this.prisma;
    }
    public static async connect() {
        try {
            await this.prisma.$connect();
            console.log('Kết nối tới sqlite thành công');
        } catch (error) {
            console.error('Lỗi khi đang kết nối tới database:', error);
        }
    }
}