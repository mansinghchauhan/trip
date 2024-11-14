import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TripForm from "./page/TripForm";
import TripTimeline from "./page/TripTimeline";
import Headers from "../src/page/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Headers />

        <Routes>
          <Route path="/" element={<TripTimeline />} />
          <Route path="/TripForm" element={<TripForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;