import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import ShootingStars from "./components/ui/shooting-stars";
import Stars from "./components/ui/stars-background";
import SolarSystem from "./components/SolarSystem";
import MercuryPage from "./pages/MercuryPage";
import VenusPage from "./pages/VenusPage";
import EarthPage from "./pages/EarthPage";
import MarsPage from "./pages/MarsPage";
import JupiterPage from "./pages/JupiterPage";
import SaturnPage from "./pages/SaturnPage";
import UranusPage from "./pages/UranusPage";
import NeptunePage from "./pages/NeptunePage";
import "../src/App.css";
import * as THREE from "three";

// Loading animation component
const LoadingAnimation = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div className="w-16 h-16 border-4 border-t-4 border-white rounded-full animate-spin"></div>
    </div>
  );
};

// FreeFlyCamera component for navigation
const FreeFlyCamera = () => {
  const { camera } = useThree();
  const speed = 0.04;
  const rotationSpeed = 0.002;
  const keysPressed = useRef({});
  const mouseDelta = useRef({ x: 0, y: 0 });
  const isMousePressed = useRef(false);
  const touchStart = useRef({ x: 0, y: 0 });

  // Set the initial camera position here
  useEffect(() => {
    camera.position.set(-1, 0, 6);
  }, [camera]);

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

  // Touch event for swipe handling
  const handleTouchStart = (event) => {
    if (event.touches.length === 1) {
      touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
  };

  const handleTouchMove = (event) => {
    if (event.touches.length === 1) {
      const deltaX = event.touches[0].clientX - touchStart.current.x;
      const deltaY = event.touches[0].clientY - touchStart.current.y;

      // Set the mouse delta for rotation (same as before)
      mouseDelta.current.x = deltaX;
      mouseDelta.current.y = deltaY;

      // Update touch start position for continuous movement
      touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };

      // Add movement for forward/backward (based on vertical swipe direction)
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        if (deltaY < 0) {
          // Swipe up - move forward
          camera.position.z -= speed; // Move the camera forward (toward the scene)
        } else if (deltaY > 0) {
          // Swipe down - move backward
          camera.position.z += speed; // Move the camera backward (away from the scene)
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
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

    // Fixing inverted camera movement
    if (isMousePressed.current) {
      camera.rotation.y += mouseDelta.current.x * rotationSpeed; // Fix inverted movement for horizontal
      camera.rotation.x += mouseDelta.current.y * rotationSpeed; // Fix inverted movement for vertical
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
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  // Handle loading of assets (example for 3D models)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000); // Simulate 3D model loading time
    return () => clearTimeout(timer);
  }, []);

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

        {/* Show loading animation if the objects are still loading */}
        {isLoading && <LoadingAnimation />}

        {/* Routes for Planet Pages */}
        <Routes>
          {/* Main Solar System Canvas */}
          <Route
            path="/"
            element={
              <Canvas style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <SolarSystem />
                <FreeFlyCamera />
              </Canvas>
            }
          />

          {/* Planet-specific pages */}
          <Route path="/MercuryPage" element={<MercuryPage />} />
          <Route path="/VenusPage" element={<VenusPage />} />
          <Route path="/EarthPage" element={<EarthPage />} />
          <Route path="/MarsPage" element={<MarsPage />} />
          <Route path="/JupiterPage" element={<JupiterPage />} />
          <Route path="/SaturnPage" element={<SaturnPage />} />
          <Route path="/UranusPage" element={<UranusPage />} />
          <Route path="/NeptunePage" element={<NeptunePage />} />
        </Routes>

        {/* Background Music */}
        <audio ref={audioRef} loop muted={!isAudioPlaying}>
          <source src="/Interstellar.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>

        {/* Artist Credit and Toggle Button */}
        <div className="absolute bottom-4 left-4 text-white text-sm z-50 song flex flex-col items-center space-y-2">
          <p>Music: Hans Zimmer - Interstellar</p>
          <button onClick={handleToggleAudio} className="text-white bg-black p-2 rounded">
            {isAudioPlaying ? "Pause Music" : "Play Music"}
          </button>
        </div>
      </div>
    </Router>
  );
};

export default App;
