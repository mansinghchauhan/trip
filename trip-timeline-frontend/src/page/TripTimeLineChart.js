import { filterTripdataWithTime } from "../utils/Chart";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

let CHART_WIDTH = 0;
const HOURS_IN_DAY = 25;

function convertTripToTimeIntervals(trip) {
  const { startTime, endTime, breaks } = trip;

  // Helper function to convert ISO time to minutes from midnight
  function timeToMinutesFromMidnight(isoTime) {
    const date = new Date(isoTime);
    return date.getHours() * 60 + date.getMinutes();
  }

  const tripStartMinutes = timeToMinutesFromMidnight(startTime);
  const tripEndMinutes = timeToMinutesFromMidnight(endTime);

  // If there are no breaks
  if (!breaks || breaks.length === 0) {
    return [tripStartMinutes, tripEndMinutes - tripStartMinutes];
  }

  // Sort breaks by start time (optional, ensures consistency)
  const sortedBreaks = breaks.sort(
    (a, b) => new Date(a.start) - new Date(b.start)
  );

  const intervals = [tripStartMinutes];

  // Time from trip start to first break start
  intervals.push(
    timeToMinutesFromMidnight(sortedBreaks[0].start) - tripStartMinutes
  );

  for (let i = 0; i < sortedBreaks.length; i++) {
    const breakStart = timeToMinutesFromMidnight(sortedBreaks[i].start);
    const breakEnd = timeToMinutesFromMidnight(sortedBreaks[i].end);

    // Time during the break
    intervals.push(breakEnd - breakStart);

    // Time between this break's end and the next break's start (or trip end)
    if (i < sortedBreaks.length - 1) {
      const nextBreakStart = timeToMinutesFromMidnight(
        sortedBreaks[i + 1].start
      );
      intervals.push(nextBreakStart - breakEnd);
    } else {
      // Time from last break's end to trip end
      intervals.push(tripEndMinutes - breakEnd);
    }
  }

  return intervals;
}

function isEvenOrOdd(number) {
  if (number % 2 === 0) {
    return "even";
  } else {
    return "odd";
  }
}

const generateTimeLabels = () => {
  const labels = [];
  for (let i = 0; i <= HOURS_IN_DAY; i++) {
    labels.push({
      time: i < 10 ? `0${i}:00` : `${i}:00`,
      position: (i / HOURS_IN_DAY) * CHART_WIDTH,
    });
  }
  return labels;
};

const ColorBar = ({ color, value, oneMinuteInChartWidth }) => {
  return (
    <div
      style={{
        width: `${oneMinuteInChartWidth * value}px`,
        height: "1vh",
        backgroundColor: color,
      }}
    />
  );
};
const renderTimeChartUsingIntervals = (
  intervals = [],
  oneMinuteInChartWidth
) => {
  return intervals.map((value, index) => {
    if (index === 0) {
      return (
        <ColorBar
          color="transparent"
          value={value}
          oneMinuteInChartWidth={oneMinuteInChartWidth}
        />
      );
    } else if (index === intervals.length) {
      return (
        <ColorBar
          color="red"
          value={value}
          oneMinuteInChartWidth={oneMinuteInChartWidth}
        />
      );
    } else if (isEvenOrOdd(index) === "even") {
      return (
        <ColorBar
          color="red"
          value={value}
          oneMinuteInChartWidth={oneMinuteInChartWidth}
        />
      );
    } else {
      return (
        <ColorBar
          color="green"
          value={value}
          oneMinuteInChartWidth={oneMinuteInChartWidth}
        />
      );
    }
  });
};

const Chart = () => {
  const { tripId } = useParams();
  let timeLabels = generateTimeLabels();

  const oneMinuteInChartWidth = ((CHART_WIDTH / HOURS_IN_DAY) * 1) / 60;
  const [selectedTrip, setSelectedTrips] = useState(null);
  useEffect(() => {
    const trips = JSON.parse(localStorage.getItem("list"));
    const filteredData = filterTripdataWithTime({
      trips: trips,
      selectedId: tripId,
    });
    setSelectedTrips(filteredData.filteredTrips);

    CHART_WIDTH = document
      .getElementById("timescale")
      .getBoundingClientRect().width;
  }, []);

  const timeIntervals = selectedTrip
    ? selectedTrip.map((trip) => convertTripToTimeIntervals(trip))
    : [];

  return (
    <div>
      <div className="flex">
        <div className="w-[5vw]"></div>
        <div className="w-[2vw]"></div>
        <div className="h-10 flex flex-row w-[93vw] mt-4" id="timescale">
          {timeLabels.map((label, index) => {
            return (
              <div
                key={index}
                style={{
                  minWidth: `${CHART_WIDTH / HOURS_IN_DAY}px`,
                }}
                className="text-sm font-bold text-black"
              >
                <p className="relative -left-4">
                  {index > HOURS_IN_DAY - 1 ? "" : label.time}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {timeIntervals.map((intervalList, index) => {
        return (
          <div className="flex" key={index}>
            <div className="w-[5vw] align-middle justify-center">
              {selectedTrip[index].vehicleNumber}
            </div>
            <div className="w-[2vw]"></div>
            <div className="h-10 w-[93vw] overflow-hidden flex">
              {renderTimeChartUsingIntervals(
                intervalList,
                oneMinuteInChartWidth
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chart;
