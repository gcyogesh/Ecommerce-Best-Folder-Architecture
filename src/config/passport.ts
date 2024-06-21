import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import AuthModel from "../models/AuthSchema";
import dotenv from 'dotenv';

dotenv.config();

const googleClientId = process.env.GOOGLE_CLIENT_ID || '';
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
// console.log("Clientid:",googleClientId, "cliet secret:", googleClientSecret)

interface User {
  id: string;
}

  passport.use(new GoogleStrategy({
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback", 
      scope: ["profile", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await AuthModel.findOne({ googleId: profile.id });
        if (!user) {
          user = new AuthModel({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user as User);
  });


export default passport