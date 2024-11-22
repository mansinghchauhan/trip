import React, { useState } from "react";
import TripTimeLineList from "./TripTimeLineList"; // Importing the component for displaying the list of trips

const TripTimeline = () => {
  // State to store the selected trip when a trip is clicked from the list
  return (
    <div>
      {/* If no trip is selected, render the TripTimeLineList component */}
      <TripTimeLineList />
    </div>
  );
};

export default TripTimeline;
