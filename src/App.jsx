import React from "react";
import Navbar from "./components/Navbar"; 
import ShootingStars from './components/ui/shooting-stars';
import Stars from './components/ui/stars-background';

function App() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <ShootingStars />
      <Stars />
    </div>
  );
}

export default App;
