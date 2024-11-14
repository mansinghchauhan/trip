import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { httpRequest } from "../utils/auth";
import FullLoader from "../widgets/FullLoader";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

// Importing custom components
import TextInput from "../components/forms/TextInput";
import DateTimeInput from "../components/forms/DateTimeInput";

const TripForm = () => {
  // State to manage form data and loading state
  const [trip, setTrip] = useState({
    tripName: "",
    vehicleNumber: "",
    startTime: "",
    endTime: "",
    breaks: [],
  });
  const [loader, setLoader] = useState(false);

  // Validation schema using Yup
  const tripValidationSchema = Yup.object({
    tripName: Yup.string().required("Trip name is required"),
    vehicleNumber: Yup.string()
      .required("Vehicle number is required")
      .matches(/^[A-Za-z0-9]+$/, "Vehicle number must be alphanumeric"),
    startTime: Yup.date()
      .required("Start time is required")
      .min(new Date(), "Start time cannot be in the past"),
    endTime: Yup.date()
      .required("End time is required")
      .min(Yup.ref("startTime"), "End time must be after start time"),
    breaks: Yup.array().of(
      Yup.object({
        start: Yup.date().required("Break start time is required"),
        end: Yup.date()
          .required("Break end time is required")
          .min(
            Yup.ref("start"),
            "Break end time must be after break start time"
          ),
      })
    ),
  });

  // Function to add a new break
  const addBreak = (setFieldValue, values) => {
    setFieldValue("breaks", [...values.breaks, { start: "", end: "" }]);
  };

  // Submit function to handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoader(true);
      // Making an API request using the custom HTTP request method
      httpRequest({
        type: "post",
        endpoint: "/trip/addTrip",
        formData: values,
        callBack: (data, msg) => {
          setLoader(false);
          if (data.status) {
            toast.success(msg); // Success toast
            resetForm(); // Reset form after successful submission
          } else {
            toast.error(msg); // Error toast
          }
        },
        isPublic: false,
      });
    } catch (err) {
      setLoader(false);
      toast.error("Error submitting form"); // Error handling
    }
  };

  return (
    <>
      <Formik
        initialValues={trip} // Initial form values
        validationSchema={tripValidationSchema} // Validation schema
        onSubmit={handleSubmit} // Submit handler
        enableReinitialize // Reinitialize form values if props change
      >
        {({ values, setFieldValue }) => (
          <Form className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              Trip Details
            </h2>

            {/* Form Fields for Trip */}
            <TextInput
              label="Trip Name"
              name="tripName"
              placeholder="Enter trip name"
            />
            <TextInput
              label="Vehicle Number"
              name="vehicleNumber"
              placeholder="Enter vehicle number"
            />
            <DateTimeInput label="Start Time" name="startTime" />
            <DateTimeInput label="End Time" name="endTime" />

            {/* Button to add new break */}
            <div>
              <button
                type="button"
                onClick={() => addBreak(setFieldValue, values)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Break
              </button>
            </div>

            {/* Dynamic Break Fields */}
            <div className="space-y-4">
              {values?.breaks?.map((breakItem, index) => (
                <div key={index} className="space-x-4 flex">
                  <DateTimeInput
                    label={`Break Start ${index + 1}`}
                    name={`breaks[${index}].start`}
                  />
                  <DateTimeInput
                    label={`Break End ${index + 1}`}
                    name={`breaks[${index}].end`}
                  />
                </div>
              ))}
            </div>

            {/* Submit button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Submit Trip
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Loader component shown during submission */}
      {loader && <FullLoader />}

      {/* Toast notifications */}
      <Toaster
        toastOptions={{
          className: "z-[9999]",
        }}
      />
    </>
  );
};

export default TripForm;
