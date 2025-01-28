import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/Navbar.css';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('.relative')) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <nav className="absolute top-0 left-0 right-0 flex justify-between items-center py-4 px-8 z-10">
      {/* Left: Logo and Title */}
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2">
          <img src="Logo.png" alt="Virtus Central Logo" className="w-10 h-10" />
          {/* Title is hidden on small screens */}
          <h1 className="text-3xl font-bold title text-white hidden sm:block">Virtus Central</h1>
        </Link>
      </div>

      {/* Right: Dropdown */}
      <div className="relative">
        <button
          className="text-white bg-transparent border border-white py-2 px-4 rounded-lg focus:outline-none planet-button"
          onClick={toggleDropdown}
        >
          Planets
        </button>

        {dropdownVisible && (
          <div className="dropdown-content absolute bg-gray-800 text-white py-2 px-4 rounded-lg mt-2">
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
