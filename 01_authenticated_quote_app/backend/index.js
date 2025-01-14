import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./db/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 3000;

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello world");
});

import quoteRouter from "./routes/quotes.route.js";
import userRouter from "./routes/user.routes.js";
import { notFound } from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

// /api/v1/
// /api/v1/quote
// /api/v1/user/login
// /api/v1/user/signup

app.use("/api/v1/quote", quoteRouter);
app.use("/api/v1/user", userRouter);

app.use(errorHandler);
app.use(notFound);

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
