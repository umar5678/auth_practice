import express from "express";
// import passport from "../passport/index.js";
import passport from "passport";

const router = express.Router();

import { handleSocialLogin } from "../controllers/auth.controllers.js";

// const handleSocialLogin = async (req, res) => {
//   console.log("handle social login run");
//   console.log("user: ", req.user);

//   res.redirect(`${process.env.CLIENT_SSO_REDIRECT_URL}`);
// };

router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }), () =>
    console.log("called")
  );
router
  .route("/google/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    handleSocialLogin
  );

export default router;
