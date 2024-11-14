import { Schema, model } from "mongoose";

const tripSchema = new Schema(
  {
    tripName: String,
    vehicleNumber: String,
    startTime: Date,
    endTime: Date,
    breaks: [{ start: Date, end: Date }],
  },
  { timestamps: true }
);

const Trip = model("trip", tripSchema);

export default Trip;
