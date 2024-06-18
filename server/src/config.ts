import { config } from "dotenv";
import z from "zod";

config({
    path: ".env"
})

const configSchema = z.object({
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    JWT_ACCESS_TOKEN_EXPIRES_IN: z.string(),
    JWT_REFRESH_TOKEN_EXPIRES_IN: z.string(),
    COOKIE_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string()
})

const configServer = configSchema.safeParse(process.env);

const envConfig = configServer.data;

export default envConfig;