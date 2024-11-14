import React, { useState } from "react";
import TimelineChart from "./TripTimeLineChart"; // Importing the component for displaying the timeline chart
import TripTimeLineList from "./TripTimeLineList"; // Importing the component for displaying the list of trips

const TripTimeline = () => {
  // State to store the selected trip when a trip is clicked from the list
  const [selectedTrip, setSelectedTrip] = useState(null);

  return (
    <div>
      {/* If a trip is selected, render the TimelineChart component */}
      {selectedTrip && (
        <TimelineChart trip={selectedTrip} setSelectedTrip={setSelectedTrip} />
      )}

      {/* If no trip is selected, render the TripTimeLineList component */}
      {!selectedTrip && (
        <TripTimeLineList
          handleClick={(value) => {
            // When a trip from the list is clicked, update the selected trip
            setSelectedTrip(value);
          }}
        />
      )}
    </div>
  );
};

export default TripTimeline;
