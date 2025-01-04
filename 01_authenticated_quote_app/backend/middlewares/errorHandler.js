import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";
  let errors = err.errors || [];
  let success = false;

  if (err instanceof ApiError) {
    success = false;
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else {
    console.error("Unhandled Error: ", err.message, err.stack);
  }

  res.status(statusCode).json({
    message,
    errors,
    success,
  });
};

export default errorHandler;
