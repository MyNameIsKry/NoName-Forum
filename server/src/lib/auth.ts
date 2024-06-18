import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import envConfig from "../config";
import { prisma } from "..";

passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: id } });
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

passport.use(new GoogleStrategy({
    clientID: envConfig?.GOOGLE_CLIENT_ID as string,
    clientSecret: envConfig?.GOOGLE_CLIENT_SECRET as string,
    callbackURL: "http://localhost:3300/auth/google/callback",
    passReqToCallback: true
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await prisma.user.findUnique({
            where: {
                google_id: profile.id
            }
        })
    } catch (err) {
        done(err, null)
    }
  }
));