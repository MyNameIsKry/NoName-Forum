import { prisma } from "..";
import { CategoryType } from "../types/category/categoryTypes";
const allowedCategoryTypes: CategoryType[] = ["buon-ban", "tam-su", "hup-so"];

export class CategoryService {
    constructor() {}

    public static async createNewCategory() {
        try {
            for (const cate of allowedCategoryTypes) {
                await prisma.category.upsert({
                    where: {
                        name: cate
                    },
                    update: {},
                    create: {
                        name: cate
                    }
                })
            }
            return { message: "Cập nhật category thành công" };   
        } catch (error) {
            return { error: error instanceof Error ? error.message : "An unknow error occur" };
        }
    } 
}