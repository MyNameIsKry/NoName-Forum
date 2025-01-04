import fastifyPassport from "@fastify/passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import envConfig from "../config";
import { prisma } from "..";

fastifyPassport.use("google", new GoogleStrategy({
    clientID: envConfig?.GOOGLE_CLIENT_ID as string,
    clientSecret: envConfig?.GOOGLE_CLIENT_SECRET as string,
    callbackURL: "/oauth2/google/callback",
    passReqToCallback: true,
    scope: ["profile", "email"],
  },
  async (req, ggAccessToken: string, ggRefreshToken: string, profile: Profile, done: VerifyCallback) => {
    try {
        let user = await prisma.user.findUnique({
            where: {
                google_id: profile.id
            }
        })
        if (!user) {
          user = await prisma.user.create({
            data: {
              google_id: profile.id,
              email: profile.emails?.[0].value || '',
              username: profile.displayName,
              password: "",
              avatar_url: profile.photos ? profile.photos[0].value : null,
              isloginWithGoogle: true,
              display_name: profile.displayName,
            }
          })
        }
      
        return done(null, user);
    } catch (err) {
      console.log(err);
        done(err);
    }
  }
));

fastifyPassport.registerUserSerializer(async (user: UserPayLoad, done) => {
  return user;
});

fastifyPassport.registerUserDeserializer(async (user: UserPayLoad, request) => {
  return user;
});