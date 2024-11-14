import { FaArrowLeft } from "react-icons/fa";
import React from "react";

const TripTimeLineChart = ({ trip, setSelectedTrip }) => {
  const startTime = new Date(trip.startTime);
  const endTime = new Date(trip.endTime);

  const breaks = trip.breaks.map((b) => ({
    start: new Date(b.start),
    end: new Date(b.end),
  }));

  // Generate the timeline hours (24-hour scale)
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Function to calculate percentage offset of time on a 24-hour scale
  const getTimePercentage = (time) => {
    const midnight = new Date(time);
    midnight.setHours(0, 0, 0, 0); // Set to midnight of the same day
    return ((time - midnight) / (24 * 60 * 60 * 1000)) * 100;
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => {
          setSelectedTrip(null);
        }}
      >
        <FaArrowLeft /> <span>Back</span>
      </div>

      <div className="flex flex-col ">
        {/* Red Triangle (Break) */}
        <div className="flex items-center space-x-2">
          <div className="w-0 h-5 border-l-8 border-r-8 border-t-8 border-t-transparent border-l-transparent border-r-transparent bg-red-500"></div>
          <span>Break</span>
        </div>

        {/* Blue Triangle (Trip Time) */}
        <div className="flex items-center space-x-2">
          <div className="w-0 h-5 border-l-8 border-r-8 border-t-8 border-t-transparent border-l-transparent border-r-transparent bg-blue-500"></div>
          <span>Trip Time</span>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="text-xl font-bold">Vehicle: {trip.vehicleNumber}</div>

      {/* Timeline */}
      <div className="relative w-full h-16 bg-gray-200 rounded-md">
        <div className="absolute top-0 left-0 flex w-full justify-between px-2 mt-3">
          {hours.map((hour) => {
            // if (!hour) return <></>;
            return <div key={hour} className="text-xs">{`${hour}:00`}</div>;
          })}
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-500" />

        {/* Trip Duration Highlight */}
        <div
          className="absolute top-0 h-4 bg-blue-500 rounded-md mt-10 opacity-50"
          style={{
            left: `${getTimePercentage(startTime)}%`,
            width: `${
              getTimePercentage(endTime) - getTimePercentage(startTime)
            }%`,
          }}
        >
          <span className="absolute text-white text-xs left-1 top-1"></span>
        </div>

        {/* Breaks */}
        {breaks.map((brk, index) => (
          <div
            key={index}
            className="absolute top-0 h-4 bg-red-500 mt-10"
            style={{
              left: `${getTimePercentage(brk.start)}%`,
              width: `${
                getTimePercentage(brk.end) - getTimePercentage(brk.start)
              }%`,
            }}
          >
            <span className="absolute text-white text-xs left-1 top-1"></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripTimeLineChart;
