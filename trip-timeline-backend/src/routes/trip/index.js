// Importing the Router module from Express to create a new router instance
import { Router } from "express";

// Importing specific controller functions for handling trip-related routes
import { getTrip, addTrip } from "../../controllers/trip/index.js";

// Importing a middleware function for validation and schema definitions
import { ValidationMiddleware } from "../../middleware/ValidationMiddleware.js";
import schemas from "../../classes/Schemas.js";

// Creating a new router instance for trip-related routes
const tripRouter = Router();

// Defining a GET route to fetch trip data
// When the "/getTrips" endpoint is hit, the `getTrip` controller function is called
tripRouter.get("/getTrips", getTrip);

// Defining a POST route to add a new trip
// The `ValidationMiddleware` is applied first to validate the incoming request against `schemas.tripSchema`
// If validation passes, the `addTrip` controller function is called
tripRouter.post("/addTrip", ValidationMiddleware(schemas.tripSchema), addTrip);

// Exporting the router as the default export of this module
// This allows the router to be imported and used in other parts of the application
export default tripRouter;
