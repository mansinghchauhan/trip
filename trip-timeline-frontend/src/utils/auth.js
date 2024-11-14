// Import axios for making HTTP requests
import axios from "axios";
// Import the base URL constant for the API
import { BASE_URL } from "../../src/Constants";

// Define an 'Auth' object for handling authentication and HTTP requests
const Auth = {
  // Create an axios instance with default configurations
  instance: axios.create({
    baseURL: `${BASE_URL}api/`, // Base URL for API requests
    headers: {
      "X-Frame-Options": "deny", // Prevents the page from being embedded in an iframe
    },
  }),

  // Define some standard response codes with associated messages
  codes: {
    101: "trip added successfully", // Success message for trip addition
    102: "End time must be after start time.", // Validation message for trip timing
  },

  // Function for making HTTP requests (GET, POST, PUT, DELETE)
  async httpRequest({
    type, // HTTP method (get, post, put, delete)
    endpoint, // API endpoint to request
    formData, // Data to send with the request (for post/put)
    isPublic = true, // Flag to indicate whether the request is public
    token, // Authentication token (for private requests)
    callBack, // Callback function to handle the response
    time = 1, // Time in seconds for retry in case of failure
    instance = "instance", // Default instance for requests
    config = {}, // Additional configuration for requests (e.g., headers)
  }) {
    let response = ""; // Variable to store the HTTP response

    // Handle different HTTP methods (GET, POST, PUT, DELETE)
    switch (type) {
      case "get":
        // Perform GET request
        response = await Auth[instance].get(endpoint, formData).catch((err) => {
          return err.response; // Return the error response if the request fails
        });
        break;

      case "post":
        // Perform POST request
        response = await Auth[instance]
          .post(endpoint, formData, config)
          .catch((err) => {
            return err.response; // Return the error response if the request fails
          });
        break;

      case "put":
        // Perform PUT request
        response = await Auth[instance].put(endpoint, formData).catch((err) => {
          return err.response; // Return the error response if the request fails
        });
        break;

      case "delete":
        // Perform DELETE request
        response = await Auth[instance].delete(endpoint).catch((err) => {
          return err.response; // Return the error response if the request fails
        });
        break;

      default:
        // If no valid HTTP method is provided, return an empty response
        response = "";
    }

    // If the request is public, skip the token handling
    if (!isPublic) {
      if (token) {
        // If a token is provided, set it in the default headers for authorization
        Auth[instance].defaults.headers.common["Authorization"] = token;
        callBack(true); // Indicate success with the callback
        return;
      }
    }

    // If no response was received (e.g., network issue), retry the request
    if (!response) {
      // Retry logic with exponential backoff (retry after doubling the time)
      if (time <= 512) {
        callBack(false, Auth.codes[600]); // Return a network error code
        let timer = setTimeout(() => {
          // Retry the request with an increased timeout
          httpRequest({
            type: type,
            endpoint: endpoint,
            formData: formData,
            token: token,
            callBack: callBack,
            time: time * 2,
            instance,
          });
          clearTimeout(timer);
        }, time * 1000); // Wait 'time' seconds before retrying
      } else {
        // After too many retries, return a final error
        callBack(false, Auth.codes[403]); // Return a failure message
      }
      return;
    } else {
      // If a response was received, handle different HTTP status codes
      let msg = ""; // Variable to store the response message

      if (response.status === 200) {
        // If the response status is 200 (OK), call the callback with the data
        msg = response.data?.message || "";
        callBack(response.data, msg);
        return;
      } else if (response.status === 500) {
        // Handle server error (500)
        callBack(false, response.data.message || "Something went wrong");
        return;
      } else if (response.status === 400) {
        // Handle bad request error (400)
        msg = response.data?.message || "";
        callBack({ ...response.data, status: false }, msg);
        return;
      } else if (response.status === 422) {
        // Handle unprocessable entity error (422)
        msg = response.data?.message || "";
        callBack(response.data, msg);
        return;
      } else if (response.status === 401) {
        // Handle unauthorized error (401)
        msg = response.data?.message || "";
        callBack(false, msg);
        return;
      } else {
        // Handle other errors with the corresponding message
        msg = response.data?.message || "";
        callBack(false, msg);
        if (response.status !== 403) {
          callBack(false, msg);
          return;
        }
      }

      // If the response status is 403, log out the user
      if (response.status === 403) {
        localStorage.clear(); // Clear local storage (log the user out)
        // window.location.href = EMAILID;  // Redirect the user (optional)
      }
    }
  },
};

// Export the httpRequest function from the Auth object for use in other parts of the application
export const httpRequest = Auth.httpRequest;
