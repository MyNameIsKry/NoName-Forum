import { FastifyRequest, FastifyReply } from 'fastify';
import { CategoryService } from '../services/categoryService';

export class CategoryController {
    constructor() {}

    public static async createCategory(req: FastifyRequest, res: FastifyReply) {
        try {
            const result = await CategoryService.createNewCategory();
            if ('error' in result)
                res.status(400).send(result);
            else
                res.status(201).send(result);

        } catch (err) {
            console.log(err);
            res.status(500).send({error: err instanceof Error ? err.message : "An unknown error occured" });
        }
    } 
}