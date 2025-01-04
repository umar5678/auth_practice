import express from "express";
import { getQuote } from "../controllers/quotes.controllers.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(verifyJWT, getQuote);

export default router;
