import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Uranus = ({ texture }) => {
  // Reference to Uranus mesh for rotation
  const uranusRef = useRef();

  // Rotate the Uranus model in each frame while keeping its position fixed
  useFrame(() => {
    if (uranusRef.current) {
      uranusRef.current.rotation.y += 0.001; // Rotate Uranus on its axis
    }
  });

  return (
    <mesh
      ref={uranusRef}
      scale={[2, 2, 2]} // Scale the planet
      position={[0, 0, 0]} // Keep Uranus fixed in its position
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={texture} // Uranus' texture
        emissive={new THREE.Color(0x000000)} // No glow for now
        emissiveIntensity={0.03} // Adjust the intensity of the glow
      />
    </mesh>
  );
};

const UranusPage = () => {
  // Load Uranus' texture
  const texture = useLoader(THREE.TextureLoader, 'uranus.jpg');

  return (
    <div className="uranus-page" style={{ display: "flex" }}>
      {/* Left side: 3D Uranus model inside Canvas */}
      <div
        className="planet-3d"
        style={{
          width: "50%",
          height: "100vh",
          background: "#000",
          pointerEvents: "none", // Prevent cursor change on the background div
        }}
      >
        <Canvas style={{ width: "100%", height: "100%" }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          {/* Pass the texture to the Uranus component */}
          <Uranus texture={texture} />
        </Canvas>
      </div>

      {/* Right side: Welcome box */}
      <div
        className="server-info"
        style={{
          width: "50%",
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
          <h1>Welcome to Virtus Central</h1>
        </div>
      </div>
    </div>
  );
};

export default UranusPage;
