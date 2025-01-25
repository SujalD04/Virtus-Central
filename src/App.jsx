import React from "react";
import { Canvas } from "@react-three/fiber";
import Navbar from "./components/Navbar";
import ShootingStars from './components/ui/shooting-stars';
import Stars from './components/ui/stars-background';
import SolarSystem from "./components/SolarSystem";

function App() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Shooting Stars and Starry Background */}
      <ShootingStars />
      <Stars />

      {/* Solar System */}
      <Canvas style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <SolarSystem />
      </Canvas>
    </div>
  );
}

export default App;
