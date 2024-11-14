// Middleware function for validating request bodies using a provided schema
const ValidationMiddleware = (schema) => {
  return (req, res, next) => {
    // Validate the request body against the schema
    const { error } = schema.validate(req.body);
    const valid = error == null;

    // If validation passes, proceed to the next middleware or route handler
    if (valid) {
      next();
    } else {
      // If validation fails, extract error details and pass an error object to the next middleware
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      next({ status: 422, message: message });
    }
  };
};

// Middleware function for handling errors and responding with appropriate status codes and messages
const ErrorHandlerMiddleware = (err, req, res, next) => {
  // Set error message in locals, only providing the full error in development environments
  res.locals.message = err.message;

  // Mask sensitive information in the request body, especially for logged-out users
  if (req.user) {
    let requestBody = JSON.stringify(req.body);
  } else {
    if (req.body.password) {
      delete req.body.password; // Remove password for security reasons
    }
    let requestBody = JSON.stringify(req.body);
  }

  // Custom error handling based on error status
  if (err.status == 500) {
    // Internal server error
    res.status(500).send({
      code: 500,
      message: "internal error",
      type: "internal",
      status: false,
    });
  } else if (err.status == 422) {
    // Validation error
    res.status(422).send({
      code: 422,
      message: err.message,
      type: "validation",
      status: false,
    });
  } else if (err.status == 401) {
    // Unauthorized access
    res.status(401).send({
      code: 401,
      message: err.message,
      type: "Unauthorized",
      status: false,
    });
  } else if (err.status == 403) {
    // Forbidden access
    res.status(403).send({
      code: 403,
      message: err.message,
      type: "Forbidden",
      status: false,
    });
  } else if (err.status == 400) {
    // Bad request error
    res.status(400).send({
      code: err.code,
      message: err.message,
      type: "Bad Request",
      status: false,
    });
  } else {
    // Fallback for unknown errors
    res.status(err.status || 500).send({
      message: "Something went wrong, We are looking into it",
      type: "internal",
      status: false,
    });
  }
};

// Middleware for handling 404 errors (route not found)
const NotFoundMiddleware = (req, res, next) => {
  res.status(404).send({ error: "Not found" });
};

// Exporting all middleware functions for use in other parts of the application
export { ValidationMiddleware, ErrorHandlerMiddleware, NotFoundMiddleware };
