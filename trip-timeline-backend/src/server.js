// Import necessary modules
import bodyParser from "body-parser"; // Middleware to parse request bodies
import express from "express"; // Framework for handling HTTP requests
import mongoose from "mongoose"; // MongoDB ORM
import cors from "cors"; // Middleware to enable Cross-Origin Resource Sharing
import tripRouter from "../src/routes/trip/index.js"; // Import router for trip-related routes
import {
  ErrorHandlerMiddleware,
  NotFoundMiddleware,
} from "../src/middleware/ValidationMiddleware.js"; // Import custom error-handling middleware
import { config } from "dotenv"; // Import dotenv to load environment variables

// Load environment variables from .env file
config();

// Initialize Express app
const app = express();

// Enable CORS to allow requests from specified origin (localhost:3000)
app.use(cors());

// Parse JSON bodies for incoming requests
app.use(bodyParser.json());

// Route for trip-related API endpoints, prefixed with /api/trip
app.use("/api/trip", tripRouter);

// Middleware for error handling and handling 404 errors
app.use(ErrorHandlerMiddleware);
app.use(NotFoundMiddleware);

// Main function to start the server and connect to MongoDB
const main = () => {
  // Connect to MongoDB using connection string from environment variables
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true, // Use new URL parser
      useUnifiedTopology: true, // Use new server discovery and monitoring engine
    })
    .then(() => console.log("MongoDB connected")) // Log on successful connection
    .catch((err) => console.log(err)); // Log errors if connection fails

  // Start the server on the specified port
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
};

// Export main function to start the server
export { main };
