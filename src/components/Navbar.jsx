import React from 'react';

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 flex justify-center items-center py-4 z-10">
      <div className="flex items-center space-x-2">
        <img src="/path/to/logo.png" alt="Virtus Central Logo" className="w-10 h-10" />
        <h1 className="text-white text-3xl font-bold">Virtus Central</h1>
      </div>
    </nav>
  );
};

export default Navbar;
