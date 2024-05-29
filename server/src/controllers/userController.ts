import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../services/userService';

interface IQuery {
    email: string;
}

export class UserController {
    public static async getUserInfo(req: FastifyRequest<{ Querystring: IQuery }>, res: FastifyReply) {
        try {
            const { email } = req.query;
            console.log(email);
            const userInfo = await UserService.getUserInfo(email);  
            res.send(userInfo);
        } catch (error) {
            res.status(500).send({ error: error });
        }
    }
}
