import dotenv from "dotenv";
dotenv.config();
import express from "express";
import passport from "../passport/index.js";

import {
  login,
  logout,
  signup,
  // handleSocialLogin,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

const handleSocialLogin = async (req, res) => {
  console.log("handle social login run");
  console.log("user: ", req.user);

  res.redirect(`${process.env.SSO_CLIENT_REDIRECT_URL}`);
};

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/logout").post(verifyJWT, logout);

// google sso
router
  .route("/google")
  .get(
    passport.authenticate("google", { scope: ["profile", "email"] }),
    (req, res) => {
      res.send("redirecting to google...");
    }
  );

// github sso
router.route("/github");

// callback urls

router.route("/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  handleSocialLogin
);

export default router;
