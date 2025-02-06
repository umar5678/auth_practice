import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Todo } from "../models/todo.model.js";

const getAllTodos = AsyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const todos = await Todo.find({ userId }).sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, todos, "Todos, Fetched Successfully"));
});

const createTodo = AsyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const { title, isCompleted } = req.body;

  if (!title || title.trim() === "") {
    throw new ApiError(400, "Title is required");
  }

  const createdTodo = await Todo.create({ userId, title, isCompleted });

  await User.findByIdAndUpdate(userId, { $push: { todos: createdTodo._id } });

  res
    .status(201)
    .json(new ApiResponse(201, createdTodo, "Todo created Successfully"));
});

const getSingleTodo = AsyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const todoId = req.params.todoId;

  const todo = await Todo.findOne({ _id: todoId, userId });
  if (!todo) throw new ApiError(404, "Todo not found");

  res.status(200).json(new ApiResponse(200, todo, "Todo fetched succesfully"));
});

const updateTodo = AsyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const todoId = req.params.todoId;
  const { title, isCompleted } = req.body;

  if (!title || title.trim() === "") {
    throw new ApiError(400, "Title is required");
  }
  let todo = await Todo.findOne({ _id: todoId, userId });
  if (!todo) throw new ApiError(404, "Todo not found");

  todo.title = title || todo.title;

  todo.isCompleted = isCompleted ?? todo.isCompleted;

  await todo.save();
  const updatedTodo = await Todo.findById(todo._id);
  res
    .status(200)
    .json(new ApiResponse(200, updatedTodo, "Todo updated successfully"));
});

const deleteTodo = AsyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const todoId = req.params.todoId;

  const todo = await Todo.findOneAndDelete({ _id: todoId, userId });
  if (!todo) throw new ApiError(404, "Todo not Found");

  await User.findByIdAndUpdate(userId, { $pull: { todo: todoId } });

  res.status(200).json(new ApiResponse(200, null, "Todo Deleted Successfully"));
});

const toggleTodoComplete = AsyncHandler(async (req, res) => {
  const todoId = req.params.todoId;

  // get todo object

  const todo = await Todo.findById(todoId); // First, fetch the todo

  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }
  const updatedTodo = await Todo.findByIdAndUpdate(
    todoId,
    { $set: { isCompleted: !todo.isCompleted } }, // Toggle the value
    { new: true, runValidators: true }
  );

  if (!updatedTodo) {
    throw new ApiError(404, "Todo not found (after update)"); // Check again
  }

  res.status(200).json(new ApiResponse(200, updatedTodo, "Todo Toggled"));
});

export {
  getAllTodos,
  createTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo,
  toggleTodoComplete,
};
