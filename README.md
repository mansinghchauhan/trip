# Trip Timeline

This repository contains two projects:

- **trip-timeline-backend**: Node.js Express app for backend services.
- **trip-timeline-frontend**: React.js app for the frontend UI.

## Prerequisites

- **Node.js** (version 14 or later)
- **npm** (usually comes with Node.js)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/mansinghchauhan/trip.git
cd trip-timeline
```

### 2. Setup and Run Backend (trip-timeline-backend)

1. Navigate to the backend folder:

   ```bash
   cd trip-timeline-backend
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - Rename the `.env.example` file to `.env`.
   - Populate the `.env` file with your environment-specific values.

4. Start the backend server:

   ```bash
   npm start
   ```

5. The server should now be running on `http://localhost:6002` (or the port specified in your `.env` file).

---

### 3. Setup and Run Frontend (trip-timeline-frontend)

1. Navigate to the frontend folder:

   ```bash
   cd ../trip-timeline-frontend
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. The frontend should now be running on `http://localhost:3000`.

---

## Additional Notes

- Make sure both the backend and frontend are running for the full application to work.
- For any additional configurations, refer to the individual project folders.

---

### License

This project is licensed under the MIT License.
