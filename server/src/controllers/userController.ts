import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../services/userService';

interface IParams {
    username: string;
}

export class UserController {
    constructor() {};

    public static async getUserInfo(req: FastifyRequest<{ Params: IParams }>, res: FastifyReply) {
        try {
            const { username } = req.params;
            const userInfo = await UserService.getUserInfo(username);  
            
            if (userInfo.status >= 400) {
                return res.status(userInfo.status).send({ status: userInfo.status, error: userInfo.error });
            }

            res.status(201).send(userInfo);

        } catch (error) {
            res.status(500).send({ status: 500, error: error });
        }
    }

    public static async getMyInfo(req: FastifyRequest, res: FastifyReply) {
        try {
            const userId = req.user?.id;
            
            if (!userId)
                return res.status(403).send({ error: "User is not authentiacted" })
            const userInfo = await UserService.getMyInfo(userId);

            if (userInfo.status >= 400) {
                return res.status(userInfo.status).send({ status: userInfo.status, error: userInfo.error });
            }

            res.status(200).send(userInfo);

        } catch(err) {
            console.log(err);
            res.status(500).send({error: err instanceof Error ? err.message : "An unknown error occured" });
        }
    }

    public static async changeDisplayName(req: FastifyRequest<{ Body: { displayName: string } }>, res: FastifyReply) {
        try {
            const userId = req.user?.id;

            if (!userId)
                return res.status(403).send({ error: "User is not authentiacted" })

            const { displayName } = req.body;

            if (!displayName) 
                return res.status(400).send({ error: "displayName field invalid!" });
            
            const result = await UserService.changeDisplayName(userId, displayName);

            if ('error' in result)
                res.status(400).send(result);
            else
                res.status(201).send(result);

        } catch(err) {
            console.log(err);
            res.status(500).send({error: err instanceof Error ? err.message : "An unknown error occured" });
        }
    }

    public static async changeBio(req: FastifyRequest<{ Body: { bio: string } }>, res: FastifyReply) {
        try {
            const userId = req.user?.id;

            if (!userId)
                return res.status(403).send({ error: "User is not authentiacted" })

            const { bio } = req.body;

            if (!bio) 
                return res.status(400).send({ error: "bio field invalid!" });
            
            const result = await UserService.changeBio(userId, bio);

            if ('error' in result)
                res.status(400).send(result);
            else
                res.status(201).send(result);

        } catch(err) {
            console.log(err);
            res.status(500).send({error: err instanceof Error ? err.message : "An unknown error occured" });
        }
    }
}
