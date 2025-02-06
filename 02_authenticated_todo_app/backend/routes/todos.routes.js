import express from "express";
const router = express.Router();

import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  getAllTodos,
  createTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos.controllers.js";

router.route("/").get(verifyToken, getAllTodos).post(verifyToken, createTodo);
router
  .route("/:todoId")
  .get(verifyToken, getSingleTodo)
  .put(verifyToken, updateTodo)
  .delete(verifyToken, deleteTodo);

export default router;
