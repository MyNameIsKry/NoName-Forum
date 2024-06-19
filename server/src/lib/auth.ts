import fastifyPassport from "@fastify/passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import envConfig from "../config";

fastifyPassport.use("google", new GoogleStrategy({
    clientID: envConfig?.GOOGLE_CLIENT_ID as string,
    clientSecret: envConfig?.GOOGLE_CLIENT_SECRET as string,
    callbackURL: "/oauth2/google/callback",
    passReqToCallback: true
  },
  async (req, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    try {
        // let user = await prisma.user.findUnique({
        //     where: {
        //         google_id: profile.id
        //     }
        // })

        // if (!user) 
        //   user = await prisma.user.create({
        //     data: {
        //       google_id: profile.id,
        //       username: p
        //     }
        //   })
        const a = done(null, profile);
        console.log(a);
        return a;
    } catch (err) {
      console.log(err);
        done(err);
    }
  }
));

fastifyPassport.registerUserSerializer(async (user, request) => {
  return user;
});

fastifyPassport.registerUserDeserializer(async (user, request) => {
  return user;
});