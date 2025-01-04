import express from "express";
import {
  login,
  logout,
  refreshAccessToken,
  signup,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/logout").post(verifyJWT, logout);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
