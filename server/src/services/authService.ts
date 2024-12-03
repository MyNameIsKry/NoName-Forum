import { hash, genSalt, compare } from 'bcrypt';
import { prisma } from '..';
import envConfig from '../config';
import { GenerateToken } from '../utils/generateToken';
import jwt from "jsonwebtoken";
import Joi from 'joi';
import { UserPayLoad } from '../types/userPayLoad';
import { sendVerificationCode } from '../utils/sendMail';
import { cache } from "..";

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

export interface VerifyBody {
    email: string;
    code: string;
    username: string;
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

        const { value } = schema.validate({
            username: username,
            password: password,
            repeatPassword: repeatPassword
        });

        const existingUserEmail = await prisma.user.findUnique({ where: { email } });
        const existingUsername = await prisma.user.findUnique({ where: { username } });

        if (existingUserEmail)
            return { status: 409, error: "Email đã tồn tại" };

        if (existingUsername)
            return { status: 409, error: "Username đã tồn tại" };

        if (value.password !== value.repeatPassword)
            return { status: 400, error: "Mật khẩu không khớp với nhau" };

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        cache.set<VerifyBody>("verification_code", {
            email: email,
            code: verificationCode,
            username: username,
            password: password
        });

        await sendVerificationCode(email, verificationCode, username);

        return { status: 200, message: "Đã gửi mã xác thực thành công" };
    }

    public static async verify(data: VerifyBody) {
        const { email, code, username, password } = data;
        const verificationCode = cache.get<VerifyBody>("verification_code");
        
        if (verificationCode && verificationCode.email == email && verificationCode.code == code ) {
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
            return { status: 201, user }
        }

        return { status: 400, error: "Đã hết thời gian hoặc mã xác thực không hợp lệ" };
    }

    public static async login(data: LoginRequestBody) {
        try {
            const { email, password } = data;
            
            if (!email || !password)
                return { status: 400, error: "Invalid password or email" };

            const user = await prisma.user.findUnique({ where: { email } });

            if (!user || !(await compare(password, user.password!))) {
                return { status: 401, error: "Email hoặc password sai!" };
            }
    
            if (user.isloginWithGoogle)
                return { 
                    status: 403,
                    error: "Người dùng này đã đăng nhập bằng google. Hãy dùng google để đăng nhập"        
            }

            const accessToken = new GenerateToken("access_token", envConfig?.JWT_ACCESS_TOKEN_EXPIRES_IN as string).generate(user);
            const refreshToken = new GenerateToken("refresh_token", envConfig?.JWT_REFRESH_TOKEN_EXPIRES_IN as string).generate(user);

            await prisma.user.update({
                where: { id: user.id },
                data: { refresh_token: refreshToken }
            })

            return { status: 201, user, accessToken, refreshToken };   
        } catch (err) {
            console.log(err);
            return { status: 500, error: err };
        }
    }

    public static async refreshToken(token: string) {
        try {
            const payload = jwt.verify(token, envConfig?.JWT_REFRESH_SECRET as string) as UserPayLoad;
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
            const payload = jwt.verify(refreshToken, envConfig?.JWT_REFRESH_SECRET as string) as UserPayLoad;
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