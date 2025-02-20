import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Mercury = ({ texture }) => {
  // Reference to Mercury mesh for rotation
  const mercuryRef = useRef();

  // Rotate the Mercury model in each frame while keeping its position fixed
  useFrame(() => {
    if (mercuryRef.current) {
      mercuryRef.current.rotation.y += 0.001; // Rotate Mercury on its axis (you can adjust the speed)
    }
  });

  return (
    <mesh
      ref={mercuryRef}
      scale={[2, 2, 2]} // Scale the planet
      position={[0, 0, 0]} // Keep Mercury fixed in its position
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={texture} // Mercury's texture
        emissive={new THREE.Color(0x000000)} // No glow for now
        emissiveIntensity={0.03} // Adjust the intensity of the glow
      />
    </mesh>
  );
};

const MercuryPage = () => {
  // Load Mercury's texture
  const texture = useLoader(THREE.TextureLoader, 'mercury.webp');
  
  // Handle click events for Mercury
  const handleClick = () => {
    console.log("Mercury clicked!");
  };

  return (
    <div className="mercury-page" style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      {/* Left side: 3D Mercury model inside Canvas */}
      <div
        className="planet-3d"
        style={{
          flex: 1,
          height: "100vh",
          background: "#000",
          pointerEvents: "none", // Prevent cursor change on the background div
        }}
      >
        <Canvas style={{ width: "100%", height: "100%" }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          {/* Pass the texture to the Mercury component */}
          <Mercury texture={texture} />
        </Canvas>
      </div>

      {/* Right side: Welcome box */}
      <div
        className="server-info"
        style={{
          flex: 1,
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          backgroundColor: "#111", // Dark background for contrast
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "30px",
            backgroundColor: "#333",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h1 className="text-lg">Welcome to Virtus Central!</h1>
        </div>
      </div>

      {/* Mobile responsiveness */}
      <style>
        {`
          @media (max-width: 768px) {
            .mercury-page {
              flex-direction: column; /* Stack the elements vertically */
            }
            .planet-3d {
              display: none; /* Hide the 3D model on smaller screens */
            }
            .server-info {
              width: 100%; /* Info area takes up the full width */
              padding: 20px;
              height: 100vh; /* Full height on mobile */
            }
          }
        `}
      </style>
    </div>
  );
};

export default MercuryPage;
