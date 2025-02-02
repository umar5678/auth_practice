import express from "express";
import { refreshAccessToken } from "../controllers/user.controllers.js";

const router = express.Router();

router.route("/profile").get((req, res) => {
  res.send("User Profile");
});
router.route("/refresh-token").post(refreshAccessToken);

export default router;
