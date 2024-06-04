import jwt from "jsonwebtoken"
import { User } from "@prisma/client"
import envConfig from "../config"

type TokenType = "access_token" | "refresh_token"

export class GenerateToken {
    constructor (
        public type: TokenType,
        public expiresIn: string
    ) {}

    public generate(user: User) {
        return jwt.sign(
            { userId: user.id, role: user.role },
            envConfig?.JWT_SECRET as string,
            { expiresIn: this.expiresIn }
        )
    }
}