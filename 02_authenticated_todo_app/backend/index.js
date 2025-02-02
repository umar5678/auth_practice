import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./db/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
// import passport from "passport";
import passport from "./passport/index.js";
import session from "express-session";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
  })
);
// __________________________________________

// _____________________________

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("hello world");
});

import quoteRouter from "./routes/quotes.route.js";
import userRouter from "./routes/user.routes.js";
import userAuhRouter from "./routes/user.auth.router.js";
import { notFound } from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

// /api/v1/
// /api/v1/quote
// /api/v1/user/login
// /api/v1/user/signup

app.use("/api/v1/quote", quoteRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/user/auth", userAuhRouter);

app.use(errorHandler);
app.use(notFound);

app.get("/login", (req, res) => {
  res.send('<h1>Login Page</h1><a href="/auth/google">Login with Google</a>');
});

// app server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
