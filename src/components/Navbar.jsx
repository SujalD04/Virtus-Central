import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom for navigation
import '../components/Navbar.css';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Toggle dropdown visibility on click
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 flex justify-between items-center py-4 px-8 z-10">
      {/* Left side: Logo and Title */}
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2"> {/* Link to homepage */}
          <img src="Logo.png" alt="Virtus Central Logo" className="w-10 h-10" />
          <h1 className="text-white text-3xl font-bold title">Virtus Central</h1>
        </Link>
      </div>

      {/* Right side: Dropdown Menu */}
      <div className="relative">
        <button 
          className="text-white bg-transparent border border-white py-2 px-4 rounded-lg focus:outline-none planet-button"
          onClick={toggleDropdown}  // Toggle dropdown on click
        >
          Planets
        </button>
        
        {/* Show the dropdown based on the state */}
        {dropdownVisible && (
          <div className="dropdown-content absolute bg-gray-800 text-white py-2 px-4 rounded-lg mt-2">
            {/* Dropdown links to different planet pages */}
            <Link to="/MercuryPage" className="block py-1">Mercury</Link>
            <Link to="/VenusPage" className="block py-1">Venus</Link>
            <Link to="/EarthPage" className="block py-1">Earth</Link>
            <Link to="/MarsPage" className="block py-1">Mars</Link>
            <Link to="/JupiterPage" className="block py-1">Jupiter</Link>
            <Link to="/SaturnPage" className="block py-1">Saturn</Link>
            <Link to="/UranusPage" className="block py-1">Uranus</Link>
            <Link to="/NeptunePage" className="block py-1">Neptune</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
