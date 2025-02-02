export class ApiError extends Error {
  constructor(statusCode, message = "Something wend wrong", errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;

    Error.captureStackTrace(this, ApiError);
  }
}
