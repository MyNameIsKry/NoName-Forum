import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService, LoginRequestBody, RegisterRequestBody } from '../services/authService';

export class AuthController {
    public static async register(req: FastifyRequest<{ Body: RegisterRequestBody }>, res: FastifyReply) {
        try {
            const { email, password, username, repeatPassword } = req.body;
            const result = await AuthService.register({ email, password, username, repeatPassword });

            if (result.status >= 400) {
                return res.status(result.status).send(result.error);
            }

            res.status(201).send(result);
        } catch (error) {
            res.status(400).send({ error: error });
        }
    }

    public static async login(req: FastifyRequest<{ Body: LoginRequestBody }>, res: FastifyReply) {
        try {
                const { email, password } = req.body;
                const result = await AuthService.login({ email, password });
                if (result.status >= 400 ) {
                    return res.status(result.status).send({ status: result.status, error: result.error });
                }
                
                res.setCookie("refreshToken", result.refreshToken!, {
                    httpOnly: false,
                    sameSite: "lax",
                    secure: process.env.NODE_ENV === "production",
                    path: "/"
                });

                res.setCookie("accessToken", result.accessToken!, {
                    httpOnly: false,
                    sameSite: "lax",
                    secure: process.env.NODE_ENV === "production",
                    path: "/"
                })
    
                res.status(201).send(result); 
        } catch (error) {
            res.status(400).send({ error: error });
        }
    }

    public static async refreshToken(req: FastifyRequest, res: FastifyReply) {
        try {
            const cookies = req.cookies;
            const refreshToken = cookies && cookies.refreshToken;

            if (!refreshToken) {
                return res.status(403).send({ error: "Token invalid!" });
            }
            
            const result = await AuthService.refreshToken(refreshToken);

            if (result.error)
                return res.status(403).send(result)

            res.setCookie("refreshToken", result.refreshToken!, {
                httpOnly: false,
                sameSite: true,
                secure: false,
                path: "/"
            });

            res.setCookie("accessToken", result.accessToken!, {
                httpOnly: false,
                sameSite: true,
                secure: false,
                path: "/"
            })

            res.status(200).send(result);
        } catch (err) {
            console.log(err);
            res.send({ error: err });
        }
    }

    public static async logout(req: FastifyRequest, res: FastifyReply) {
        try {
            const cookies = req.cookies;
            const refreshToken = cookies && cookies.refreshToken;
    
            if (!refreshToken) {
                return res.status(403).send({ error: "Token invalid!" });
            }
    
            AuthService.logout(refreshToken);
    
            res.clearCookie("refreshToken", {
                httpOnly: false,
                sameSite: true,
                secure: false,
                path: "/"
            })
    
            res.status(200).send({ message: "Logout successful" });

        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    } 
}
