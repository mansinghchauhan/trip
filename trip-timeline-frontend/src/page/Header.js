import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/" className="hover:text-gray-300">
          Go Trip
        </Link>
      </div>
      <nav className="flex space-x-4">
        <Link to="/TripForm" className="hover:text-gray-300">
          Add Trip
        </Link>
        <Link to="/" className="hover:text-gray-300">
          Trip List
        </Link>
      </nav>
    </header>
  );
};

export default Header;
