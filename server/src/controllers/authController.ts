import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService, LoginRequestBody, RegisterRequestBody } from '../services/authService';

export class AuthController {
    public static async register(req: FastifyRequest<{ Body: RegisterRequestBody }>, res: FastifyReply) {
        try {
            const { email, password, username } = req.body;
            const result = await AuthService.register({ email, password, username });
            res.status(201).send(result);
        } catch (error) {
            res.status(400).send({ error: error });
        }
    }

    public static async login(req: FastifyRequest<{ Body: LoginRequestBody }>, res: FastifyReply) {
        try {
            const { email, password } = req.body;
            const result = await AuthService.login({ email, password });
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send({ error: error });
        }
    }
}
