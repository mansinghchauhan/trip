import React from "react";
import { FaCar, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import bus_img from "../../assets/images/bus_img.png";
const TripCard = ({ trip, handleClick }) => {
  // Calculate trip duration in hours and minutes
  const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInMinutes = Math.floor((end - start) / (1000 * 60));
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div
      className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex items-center space-x-6 p-4 cursor-pointer"
      onClick={() => {
        handleClick(trip);
      }}
    >
      {/* Left Side - Trip Details */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-800">{trip.tripName}</h2>
        <p className="text-gray-600">{trip.vehicleNumber}</p>

        <div className="mt-4 flex items-center text-gray-700">
          <FaCar className="mr-2 text-blue-600" />
          <p>{trip.vehicleType}</p>
        </div>

        {/* <div className="mt-2 flex items-center text-gray-700">
          <FaMapMarkerAlt className="mr-2 text-red-600" />
          <p>
            {trip.startLocation} to {trip.endLocation}
          </p>
        </div> */}

        <div className="mt-4 flex justify-between text-gray-700">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-yellow-600" />
            <p>Duration</p>
          </div>
          <p>{calculateDuration(trip.startTime, trip.endTime)}</p>
        </div>
      </div>

      {/* Right Side - Trip Image or Additional Info (Optional) */}
      <div className="w-32 h-32 bg-gray-300 rounded-lg">
        <img src={bus_img} />
      </div>
    </div>
  );
};

export default TripCard;
