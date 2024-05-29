import { config } from "dotenv";
import z from "zod";

config({
    path: ".env"
})

const configSchema = z.object({
    DATABASE_URL: z.string(),
    SESSION_TOKEN_SECRET: z.string(),
    SESSION_TOKEN_EXPIRES_IN: z.string(),
})

const configServer = configSchema.safeParse(process.env);

const envConfig = configServer.data;

export default envConfig;