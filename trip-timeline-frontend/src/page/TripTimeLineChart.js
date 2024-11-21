import { filterTripdataWithTime } from "../utils/Chart";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CHART_WIDTH = 1200;
const HOURS_IN_DAY = 24;
const MS_IN_HOUR = 3600000;

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

const calculateSegmentWidth = (duration) => {
  const totalDayInMs = HOURS_IN_DAY * MS_IN_HOUR;
  return (duration / totalDayInMs) * CHART_WIDTH;
};

const processBlocks = (blocks) => {
  const result = [];
  let currentBlock = null;

  for (const block of blocks) {
    if (!currentBlock || currentBlock.type !== block.type) {
      if (currentBlock) {
        result.push({ ...currentBlock });
      }
      currentBlock = {
        ...block,
        style: {
          ...block.style,
          width: parseInt(block.style.width, 10),
        },
      };
    } else {
      currentBlock.style.width += parseInt(block.style.width, 10);
    }
  }

  if (currentBlock) {
    result.push({ ...currentBlock });
  }

  return result.map((block) => ({
    ...block,
    style: {
      ...block.style,
      width: `${block.style.width}px`,
    },
    className: `${block.className.replace(/w-\[\d+px\]/g, "")} w-[${
      block.style.width
    }]`,
  }));
};

const Chart = () => {
  const { tripId } = useParams();
  const timeLabels = generateTimeLabels();
  const [selectedTip, setSelectedTrips] = useState(null);
  useEffect(() => {
    const trips = JSON.parse(localStorage.getItem("list"));
    const filteredData = filterTripdataWithTime({
      trips: trips,
      selectedId: tripId,
    });
    setSelectedTrips(filteredData.filteredTrips);
  }, []);

  return (
    <div className="flex flex-col h-full w-full border border-[#19181a]">
      {/* Time Axis */}
      <div className="h-[80px] bg-blue-700 text-white flex">
        <div className="w-[150px]" />
        <div className="flex-grow flex items-center">
          {timeLabels.map((label, index) => (
            <div
              key={index}
              style={{
                width: `${CHART_WIDTH / HOURS_IN_DAY}px`,
              }}
              className="text-center text-sm text-white font-bold"
            >
              {label.time}
            </div>
          ))}
        </div>
      </div>
      {/* Vehicle Rows */}
      {selectedTip && (
        <div className="flex-grow flex flex-col">
          {selectedTip.map((trip) => {
            const blocks = [];
            const tripStartTime = new Date(trip.startTime).getTime();
            const tripEndTime = new Date(trip.endTime).getTime();
            const totalDayStart = new Date(
              new Date(trip.startTime).setUTCHours(0, 0, 0, 0)
            ).getTime();
            const totalDayEnd = totalDayStart + HOURS_IN_DAY * MS_IN_HOUR;

            let currentTime = totalDayStart;

            while (currentTime < totalDayEnd) {
              const nextTime = Math.min(
                currentTime + MS_IN_HOUR / 2,
                totalDayEnd
              );

              let color;
              const isBreak = trip.breaks.some(
                (b) =>
                  currentTime < new Date(b.end).getTime() &&
                  nextTime > new Date(b.start).getTime()
              );

              let type;
              const isJourney =
                currentTime >= tripStartTime && nextTime <= tripEndTime;
              if (isBreak) {
                color = "bg-red-300";
                type = "B";
              } else if (isJourney) {
                color = "bg-green-500";
                type = "J";
              } else {
                color = "bg-white";
                type = "I";
              }

              const segmentWidth = calculateSegmentWidth(
                nextTime - currentTime
              );

              blocks.push({
                type,
                index: currentTime,
                className: `${color} h-[40px] rounded-sm mx-[2px]`,
                style: { width: `${segmentWidth}px` },
              });

              currentTime = nextTime;
            }

            const result = processBlocks(blocks);

            return (
              <div key={trip._id} className="h-[80px] text-white flex">
                <div className="w-[150px] h-full bg-blue-700 flex justify-center items-center">
                  {trip.vehicleNumber}
                </div>
                <div className="flex-grow flex items-center border-solid border-[1px] border-t-0 border-x-0 border-[#19181a]">
                  {result.map((block) => (
                    <div {...block} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Chart;
