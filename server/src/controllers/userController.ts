import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../services/userService';

interface IQuery {
    username: string;
}

export class UserController {
    public static async getUserInfo(req: FastifyRequest<{ Querystring: IQuery }>, res: FastifyReply) {
        try {
            const { username } = req.query;
            const userInfo = await UserService.getUserInfo(username);  
            res.send(userInfo);
        } catch (error) {
            res.status(500).send({ error: error });
        }
    }
}
