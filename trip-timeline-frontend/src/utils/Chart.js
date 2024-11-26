export const filterTripdataWithTime = ({ trips, selectedId }) => {
  // Find the trip by selected _id
  const selectedTrip = trips.find((trip) => trip._id === selectedId);

  // If the trip is found, use its startTime and endTime to filter other trips
  if (selectedTrip) {
    const startRange = new Date(selectedTrip.startTime); // Set startRange from selected trip's startTime
    const endRange = new Date(selectedTrip.endTime); // Set endRange from selected trip's endTime

    const timeDifference = endRange - startRange;

    // Convert milliseconds to hours (1 hour = 3600000 milliseconds)
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    const startTimeFormatted = startRange.toLocaleTimeString([], {
      hour: "2-digit",
      hour12: false,
    });
    const endTimeFormatted = endRange.toLocaleTimeString([], {
      hour: "2-digit",
      hour12: false,
    });

    // Filter trips based on the selected trip's time range
    const filteredTrips = trips.filter((trip) => {
      const tripStartTime = new Date(trip.startTime);
      const tripEndTime = new Date(trip.endTime);

      // Check if the trip's start and end times overlap with the selected trip's time range
      return (
        (tripStartTime >= startRange && tripStartTime <= endRange) ||
        (tripEndTime >= startRange && tripEndTime <= endRange) ||
        (tripStartTime <= startRange && tripEndTime >= endRange)
      );
    });
    return {
      filteredTrips,
      time: {
        start: startTimeFormatted,
        end: endTimeFormatted,
        hoursDifference,
      },
    };
  } else {
    return null;
  }
};
