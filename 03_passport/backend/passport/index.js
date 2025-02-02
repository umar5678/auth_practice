import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, next) => {
      try {
        console.log("gogle user profile: ", profile);

        return next(null, profile.id); // Pass the user object to serializeUser
      } catch (err) {
        return next(err, null);
      }
    }
  )
);

export default passport;
