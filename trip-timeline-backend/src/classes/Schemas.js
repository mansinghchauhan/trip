// Import Joi for schema validation
import Joi from "joi";

// Define validation schemas for different data structures
const schemas = {
  // Schema to validate trip data
  tripSchema: Joi.object({
    // Trip name should be a non-empty string and is required
    tripName: Joi.string().required(),

    // Vehicle number should be a non-empty string and is required
    vehicleNumber: Joi.string().required(),

    // Start time should be a valid ISO date and is required
    startTime: Joi.date().iso().required(),

    // End time should be a valid ISO date, must be greater than startTime, and is required
    endTime: Joi.date().iso().greater(Joi.ref("startTime")).required(),

    // Optional breaks array containing break periods
    breaks: Joi.array()
      .items(
        Joi.object({
          // Start time of the break, should be a valid ISO date and is required
          start: Joi.date().iso().required(),

          // End time of the break, must be greater than the start time, and is required
          end: Joi.date().iso().greater(Joi.ref("start")).required(),
        })
      )
      .optional(), // breaks array is optional
  }),
};

// Export the schemas for use in other parts of the application
export default schemas;
