import Trip from "../../models/Trip.js";

// Controller function to handle retrieving all trips
export const getTrip = async (req, res, next) => {
  try {
    // Fetch all trips from the database
    const trips = await Trip.find();
    // Send the trips as a response with a 200 status code
    res.status(200).send(trips);
  } catch (err) {
    // Pass any error to the next middleware (like an error handler)
    next(err);
  }
};

// Controller function to handle adding a new trip
export const addTrip = async (req, res, next) => {
  try {
    // Destructure required fields from the request body
    const { tripName, vehicleNumber, startTime, endTime, breaks } = req.body;

    // Validate that the end time is after the start time
    if (new Date(endTime) <= new Date(startTime)) {
      // Send a 400 Bad Request response if validation fails
      return res.status(400).send({
        status: false,
        code: 102,
        message: "End time must be after start time.",
      });
    }

    // Create a new Trip instance with provided data
    const trip = new Trip({
      tripName,
      vehicleNumber,
      startTime,
      endTime,
      breaks,
    });

    // Save the trip to the database
    await trip.save();

    // Send a success response with a 200 status code
    res.status(200).send({
      status: true,
      code: 101,
      message: "Successfully submitted",
    });
  } catch (err) {
    // Pass any error to the next middleware (like an error handler)
    next(err);
  }
};
