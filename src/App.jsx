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
    <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="relative w-20 h-20">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-b-transparent border-white animate-spin"></div>
        {/* Inner glowing core */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
      </div>
      <p className="mt-4 pl-3 text-white text-lg font-semibold animate-bounce">
        Loading...
      </p>
    </div>
  );
};


const FreeFlyCamera = () => {
  const { camera } = useThree();
  const speed = 0.04;
  const rotationSpeed = 0.002;
  const keysPressed = useRef({});
  const mouseDelta = useRef({ x: 0, y: 0 });
  const isMouseDown = useRef(false); // Track mouse button state
  const touchStart = useRef([]);
  const lastTouchDistance = useRef(0);

  useEffect(() => {
    camera.position.set(-0.5, 0, 10);
  }, [camera]);

  const handleKeyDown = (event) => {
    keysPressed.current[event.code] = true;
  };

  const handleKeyUp = (event) => {
    keysPressed.current[event.code] = false;
  };

  const handleMouseMove = (event) => {
    if (isMouseDown.current) {
      mouseDelta.current.x = event.movementX;
      mouseDelta.current.y = event.movementY;
    }
  };

  const handleMouseDown = () => {
    isMouseDown.current = true;
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
  };

  const handleTouchStart = (event) => {
    touchStart.current = Array.from(event.touches).map((t) => ({
      x: t.clientX,
      y: t.clientY,
    }));

    if (event.touches.length === 2) {
      const dx = event.touches[0].clientX - event.touches[1].clientX;
      const dy = event.touches[0].clientY - event.touches[1].clientY;
      lastTouchDistance.current = Math.sqrt(dx * dx + dy * dy);
    }
  };

  const handleTouchMove = (event) => {
    if (event.touches.length === 1) {
      const deltaX = event.touches[0].clientX - touchStart.current[0].x;
      const deltaY = event.touches[0].clientY - touchStart.current[0].y;

      mouseDelta.current.x = -deltaX;
      mouseDelta.current.y = deltaY;

      touchStart.current[0] = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    } else if (event.touches.length === 2) {
      const dx = event.touches[0].clientX - event.touches[1].clientX;
      const dy = event.touches[0].clientY - event.touches[1].clientY;
      const newDistance = Math.sqrt(dx * dx + dy * dy);

      const zoomSpeed = 0.01;
      const zoomDelta = (newDistance - lastTouchDistance.current) * zoomSpeed;

      camera.getWorldDirection(mouseDelta.current);
      camera.position.addScaledVector(mouseDelta.current, zoomDelta);

      lastTouchDistance.current = newDistance;
    }
  };

  const handleTouchEnd = () => {
    mouseDelta.current.x = 0;
    mouseDelta.current.y = 0;
    lastTouchDistance.current = 0;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
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

    if (mouseDelta.current.x !== 0 || mouseDelta.current.y !== 0) {
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
