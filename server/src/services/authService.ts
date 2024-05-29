import { hash, genSalt, compare } from 'bcrypt';
import { prisma } from '..';
import jwt from "jsonwebtoken";
import envConfig from '../config';
//import { createTransport } from "nodemailer";

export interface RegisterRequestBody {
    email: string;
    password: string;
    username: string;
}

export interface LoginRequestBody {
    email: string;
    password: string;
}

export class AuthService {
    constructor() {}

    public static async register(data: RegisterRequestBody) {
        const { username, password, email } = data;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser)
            throw new Error("Email đã tồn tại");

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);
        
        const user = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
                email: email,
                registered_at: new Date()
            }
        });

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            envConfig?.SESSION_TOKEN_SECRET as string,
            { expiresIn: "30s" }
        );
        
        return { user, token }
    }

    public static async login(data: LoginRequestBody) {
        const { email, password } = data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) 
            throw new Error("Sai email hoặc password.");

        const isMatch = await compare(password, user.password);
        if (!isMatch)
            throw new Error("Sai email hoặc password.");

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            envConfig?.SESSION_TOKEN_SECRET as string,
            { expiresIn: "30s" }
        );

        console.log(token);

        return { user, token };
    }
}