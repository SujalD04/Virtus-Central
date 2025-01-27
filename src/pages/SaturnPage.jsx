import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Saturn = ({ texture, ringTexture }) => {
  const saturnRef = useRef();
  const ringsRef = useRef();

  // Rotate the Saturn model and rings in each frame while keeping their positions fixed
  useFrame(() => {
    if (saturnRef.current) {
      saturnRef.current.rotation.y += 0.001; // Rotate Saturn on its axis
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.y = 0.001; // Rotate the rings slowly
    }
  });

  return (
    <>
      {/* Saturn Planet */}
      <mesh
        ref={saturnRef}
        scale={[2, 2, 2]} // Scale the planet
        position={[0, 0, 0]} // Keep Saturn fixed in its position
      >
        <sphereGeometry args={[1, 64, 64]} /> {/* Increase segments for smoother surface */}
        <meshStandardMaterial
          map={texture} // Saturn's texture
          emissive={new THREE.Color(0x000000)} // No glow for now
          emissiveIntensity={0.03} // Adjust the intensity of the glow
        />
      </mesh>

      {/* Saturn's Rings */}
      <mesh
        ref={ringsRef}
        position={[-0.01, -0.1, -1]} // Position the rings around Saturn
        rotation={[-Math.PI / 2.1, -Math.PI/2, 8]} // Rotate to make the rings flat
      >
        <ringGeometry args={[2.5, 3.7, 64]} /> {/* Inner radius, outer radius, segments */}
        <meshStandardMaterial
          map={ringTexture} // Apply the ring texture
          emissive={new THREE.Color(0x000000)} // No glow for now
          emissiveIntensity={0.02} // Adjust the intensity of the glow
          transparent
          opacity={0.8} // Make rings slightly transparent
        />
      </mesh>
    </>
  );
};

const SaturnPage = () => {
  // Load the textures
  const texture = useLoader(THREE.TextureLoader, 'saturn.jpg'); // Ensure this texture is high-res
  const ringTexture = useLoader(THREE.TextureLoader, 'saturn_ring.jpg'); // Use a high-quality ring texture

  return (
    <div className="saturn-page" style={{ display: "flex" }}>
      {/* Left side: 3D Saturn model inside Canvas */}
      <div
        className="planet-3d"
        style={{
          width: "50%",
          height: "100vh",
          background: "#000",
          pointerEvents: "none",
        }}
      >
        <Canvas style={{ width: "100%", height: "100%" }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          <Saturn texture={texture} ringTexture={ringTexture} />
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

export default SaturnPage;
