const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  console.log(err.statusCode);
  err.statusCode = err.statusCode || 500;

  // validation error
  if (err.name === "ValidationError") {
    const customMessage = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
    err = new ErrorHandler(customMessage, 400);
  }

  // wrong mongodb error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key error
  if (err.name === "MongoServerError" && err.code === 11000) {
    const errorMessage = err.message; // Get the full error message
    // Extract the field name from the error message using regular expressions
    const fieldMatch = errorMessage.match(/index: (\w+)_/);
    if (fieldMatch && fieldMatch[1]) {
      const duplicateField = fieldMatch[1];
      let customMessage = `${
        duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1)
      } already exists`;
      err = new ErrorHandler(customMessage, 400);
    } else {
      // If the field name cannot be extracted, provide a generic error message
      err = new ErrorHandler("Duplicate key error", 400);
    }
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
