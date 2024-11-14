import React from "react";

const FullLoader = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center bg-black/50 w-full h-full z-[9999]">
      <div class="fullSpinner">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default FullLoader;
