import React, { useEffect, useState } from "react";
import TripCard from "../components/triplist/TripCard"; // Importing the TripCard component to display each trip
import { httpRequest } from "../utils/auth"; // Importing the custom httpRequest utility for API calls

const TripTimeLineList = ({ handleClick }) => {
  // State to store the list of trips fetched from the API
  const [trips, setTrips] = useState([]);

  // Function to fetch trips from the server
  const fetchTrips = async () => {
    try {
      // Making the GET request to fetch the trips data
      httpRequest({
        type: "get", // HTTP method
        endpoint: "/trip/getTrips", // API endpoint to fetch trips
        formData: {}, // Empty data object since no form data is required
        callBack: (data, msg) => {
          // On success, set the trips state with the fetched data
          setTrips(data);
        },
        isPublic: false, // Indicates that this request is not public
      });
    } catch (err) {
      // Handle any errors (e.g., network failure), but here we don't perform any specific action
    }
  };

  // useEffect hook to fetch trips when the component mounts
  useEffect(() => {
    fetchTrips(); // Call fetchTrips when the component is mounted
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
        Trips List
      </h2>
      {/* Render each trip in the trips array as a TripCard */}
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} handleClick={handleClick} />
      ))}
    </div>
  );
};

export default TripTimeLineList;
