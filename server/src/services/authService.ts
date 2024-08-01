import { hash, genSalt, compare } from 'bcrypt';
import { prisma } from '..';
import envConfig from '../config';
import { GenerateToken } from '../utils/generateToken';
import jwt from "jsonwebtoken";
import Joi from 'joi';
import { UserPayLoad } from '../types/userPayLoad';
//import { createNodeCache } from '../utils/createCache';

export interface RegisterRequestBody {
    email: string;
    password: string;
    repeatPassword: string;
    username: string;
}

export interface LoginRequestBody {
    email: string;
    password: string;
}

export class AuthService {
    constructor() {}

    public static async register(data: RegisterRequestBody) {
        const { username, password, email, repeatPassword } = data;

        const schema = Joi.object({
            username: Joi.string().min(3).max(35),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            repeatPassword: Joi.ref('password')
        });

        const { error } = schema.validate({
            username: username,
            password: password,
            repeatPassword: repeatPassword
        });

        if (error)
            return { error: error };

        const existingUserEmail = await prisma.user.findUnique({ where: { email } });
        const existingUsername = await prisma.user.findUnique({ where: { username } });

        if (existingUserEmail)
            return { error: "Email đã tồn tại" };

        if (existingUsername)
            return { error: "Username đã tồn tại" };

        if (password !== repeatPassword)
            return { error: "Mật khẩu không khớp với nhau" };

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);
        
        const user = await prisma.user.create({
            data: {
                username: username,
                display_name: username,
                password: hashedPassword,
                email: email,
                registered_at: new Date(),
                updated_at: new Date(),
            }
        });
        
        return { user }
    }

    public static async login(data: LoginRequestBody) {
        try {
            const { email, password } = data;

            if (!email || !password)
                return { error: "Invalid password or email" };

            const user = await prisma.user.findUnique({ where: { email } });

            if (!user || !(compare(password, user.password!))) {
                return { error: "Email hoặc password sai!" };
            }
    
            if (user.isloginWithGoogle)
                return;

            const accessToken = new GenerateToken("access_token", envConfig?.JWT_ACCESS_TOKEN_EXPIRES_IN as string).generate(user);
            const refreshToken = new GenerateToken("refresh_token", envConfig?.JWT_REFRESH_TOKEN_EXPIRES_IN as string).generate(user);

            await prisma.user.update({
                where: { id: user.id },
                data: { refresh_token: refreshToken }
            })

            return { user, accessToken, refreshToken };   
        } catch (err) {
            console.log(err);
            return;
        }
    }

    public static async refreshToken(token: string) {
        try {
            const payload = jwt.verify(token, envConfig?.JWT_SECRET as string) as UserPayLoad;
            const user = await prisma.user.findUnique({ where: { id: payload.id } });

            if (!user)
                return { error: "Invalid Token!" };

            const accessToken = new GenerateToken("access_token", envConfig?.JWT_ACCESS_TOKEN_EXPIRES_IN as string).generate(user);
            const refreshToken = new GenerateToken("refresh_token", envConfig?.JWT_REFRESH_TOKEN_EXPIRES_IN as string).generate(user);

            await prisma.user.update({
                where: { id: user.id },
                data: { refresh_token: refreshToken }
            });

            return { accessToken, refreshToken };   
            
        } catch(err) {
            console.log(err);
            return {error: err};
        }
    }

    public static async logout(refreshToken: string) {
        try {
            const payload = jwt.verify(refreshToken, envConfig?.JWT_SECRET as string) as UserPayLoad;
            const user = await prisma.user.findUnique({ where: { id: payload.id } });

            await prisma.user.update({
                where: { id: user?.id },
                data: { refresh_token: null }
            })
            
        } catch(err) {
            console.log(err);
        }
    }
}