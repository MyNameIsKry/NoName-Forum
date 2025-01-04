import jwt from "jsonwebtoken"
import envConfig from "../config"

type TokenType = "access_token" | "refresh_token"

export class GenerateToken {
    constructor (
        public type: TokenType,
        public expiresIn: string
    ) {}

    public generate(user: UserPayLoad) {
        const jwtSecret = this.type === "access_token" ? envConfig?.JWT_ACCESS_SECRET : envConfig?.JWT_REFRESH_SECRET;

        return jwt.sign(
            { 
                id: user.id, 
                username: user.username,
                email: user.email,
                role: user.role
            },
            jwtSecret as string,
            { expiresIn: this.expiresIn }
        )
    }
}