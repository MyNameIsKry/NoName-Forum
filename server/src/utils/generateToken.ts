import jwt from "jsonwebtoken"
import { UserPayLoad } from "../types/userPayLoad"
import envConfig from "../config"

type TokenType = "access_token" | "refresh_token"

export class GenerateToken {
    constructor (
        public type: TokenType,
        public expiresIn: string
    ) {}

    public generate(user: UserPayLoad) {
        return jwt.sign(
            { 
                id: user.id, 
                username: user.username,
                email: user.email
            },
            envConfig?.JWT_SECRET as string,
            { expiresIn: this.expiresIn }
        )
    }
}