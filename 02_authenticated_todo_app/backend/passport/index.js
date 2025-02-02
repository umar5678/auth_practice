import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import crypto from "crypto";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { ApiError } from "../utils/ApiError.js";

import { User } from "../models/user.model.js";

const googleConfigOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
};

const createRandomPassword = (length) => {
  return crypto.randomBytes(length).toString("hex");
};

passport.use(
  new GoogleStrategy(
    googleConfigOptions,
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
