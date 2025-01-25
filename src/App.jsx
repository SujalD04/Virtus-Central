import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router components
import Navbar from "./components/Navbar";
import { useFrame, useThree } from "@react-three/fiber";
import ShootingStars from "./components/ui/shooting-stars";
import Stars from "./components/ui/stars-background";
import SolarSystem from "./components/SolarSystem";
import MercuryPage from "./pages/MercuryPage";  // Import each planet page
import VenusPage from "./pages/VenusPage";
import EarthPage from "./pages/EarthPage";
import MarsPage from "./pages/MarsPage";
import JupiterPage from "./pages/JupiterPage";
import SaturnPage from "./pages/SaturnPage";
import UranusPage from "./pages/UranusPage";
import NeptunePage from "./pages/NeptunePage";
import "../src/App.css";
import * as THREE from "three";

const FreeFlyCamera = () => {
  const { camera } = useThree();
  const speed = 0.04;
  const rotationSpeed = 0.002;
  const keysPressed = useRef({});
  const mouseDelta = useRef({ x: 0, y: 0 });
  const isMousePressed = useRef(false);

  const handleKeyDown = (event) => {
    keysPressed.current[event.code] = true;
  };

  const handleKeyUp = (event) => {
    keysPressed.current[event.code] = false;
  };

  const handleMouseMove = (event) => {
    if (isMousePressed.current) {
      mouseDelta.current.x = event.movementX;
      mouseDelta.current.y = event.movementY;
    }
  };

  const handleMouseDown = (event) => {
    if (event.button === 0) {
      isMousePressed.current = true;
    }
  };

  const handleMouseUp = (event) => {
    if (event.button === 0) {
      isMousePressed.current = false;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useFrame(() => {
    const direction = new THREE.Vector3();
    if (keysPressed.current["KeyW"]) {
      camera.getWorldDirection(direction);
      camera.position.addScaledVector(direction, speed);
    }
    if (keysPressed.current["KeyS"]) {
      camera.getWorldDirection(direction);
      camera.position.addScaledVector(direction, -speed);
    }
    if (keysPressed.current["KeyA"]) {
      camera.getWorldDirection(direction);
      direction.cross(camera.up).normalize();
      camera.position.addScaledVector(direction, -speed);
    }
    if (keysPressed.current["KeyD"]) {
      camera.getWorldDirection(direction);
      direction.cross(camera.up).normalize();
      camera.position.addScaledVector(direction, speed);
    }
    if (keysPressed.current["Space"]) {
      camera.position.y += speed;
    }
    if (keysPressed.current["ShiftLeft"]) {
      camera.position.y -= speed;
    }

    if (isMousePressed.current) {
      camera.rotation.y -= mouseDelta.current.x * rotationSpeed;
      camera.rotation.x -= mouseDelta.current.y * rotationSpeed;
      camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
    }

    mouseDelta.current.x = 0;
    mouseDelta.current.y = 0;
  });

  return null;
};

const App = () => {
  const audioRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isAudioPlaying]);

  const handleToggleAudio = () => {
    setIsAudioPlaying((prevState) => !prevState);
  };

  return (
    <Router>
      <div className="relative min-h-screen bg-black overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Shooting Stars and Starry Background */}
        <ShootingStars />
        <Stars />

        {/* Solar System Canvas */}
        <Canvas style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <SolarSystem />
          <FreeFlyCamera />
        </Canvas>

        {/* Background Music */}
        <audio ref={audioRef} loop muted={!isAudioPlaying}>
          <source src="/Interstellar.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>

        {/* Artist Credit and Toggle Button */}
        <div className="absolute bottom-4 right-4 text-white text-sm z-50 song flex flex-col items-center space-y-2">
          <p>Music: Hans Zimmer - Interstellar</p>
          <button onClick={handleToggleAudio} className="text-white bg-black p-2 rounded">
            {isAudioPlaying ? "Pause Music" : "Play Music"}
          </button>
        </div>

        {/* Routes for each planet */}
        <Routes>
          <Route path="/MercuryPage" element={<MercuryPage />} />
          <Route path="/VenusPage" element={<VenusPage />} />
          <Route path="/EarthPage" element={<EarthPage />} />
          <Route path="/MarsPage" element={<MarsPage />} />
          <Route path="/JupiterPage" element={<JupiterPage />} />
          <Route path="/SaturnPage" element={<SaturnPage />} />
          <Route path="/UranusPage" element={<UranusPage />} />
          <Route path="/NeptunePage" element={<NeptunePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
