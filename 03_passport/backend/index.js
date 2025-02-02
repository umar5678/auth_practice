import dotenv from "dotenv";
dotenv.config();
import express from "express";

import cors from "cors";
import passport from "./passport/index.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());

// const handleSocialLogin = async (req, res) => {
//   console.log("handle social login run");
//   console.log("user: ", req.user);

//   res.redirect(`${process.env.CLIENT_SSO_REDIRECT_URL}`);
// };

app.get("/", (req, res) => {
  res.send("hi, hello world");
});

import userAuthRouter from "./routes/auth.routes.js";

app.use("/api/v1/user/auth", userAuthRouter);

// app.get(
//   "/api/v1/user/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/api/v1/user/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/", session: false }),
//   handleSocialLogin
// );

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
