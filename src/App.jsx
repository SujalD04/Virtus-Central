import React from "react";
import Navbar from "./components/Navbar"; 
import ShootingStars from './components/ui/shooting-stars';
import Stars from './components/ui/stars-background';
import SolarSystem from "./components/SolarSystem";

function App() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <ShootingStars />
      <Stars />
     {/* <SolarSystem /> */}
    </div>
  );
}

export default App;
