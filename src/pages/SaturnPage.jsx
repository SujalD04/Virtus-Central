import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import "./SaturnPage.css"; // Import the CSS file

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
      <mesh ref={saturnRef} scale={[2, 2, 2]} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive={new THREE.Color(0x000000)}
          emissiveIntensity={0.03}
        />
      </mesh>

      {/* Saturn's Rings */}
      <mesh ref={ringsRef} position={[-0.01, -0.1, -1]} rotation={[-Math.PI / 2.1, -Math.PI / 2, 8]}>
        <ringGeometry args={[2.5, 3.7, 64]} />
        <meshStandardMaterial
          map={ringTexture}
          emissive={new THREE.Color(0x000000)}
          emissiveIntensity={0.02}
          transparent
          opacity={0.8}
        />
      </mesh>
    </>
  );
};

const SaturnPage = () => {
  // Load the textures
  const texture = useLoader(THREE.TextureLoader, "saturn.jpg");
  const ringTexture = useLoader(THREE.TextureLoader, "saturn_ring.jpg");

  return (
    <div className="saturn-page">
      {/* Left side: 3D Saturn model inside Canvas */}
      <div className="planet-3d">
        <Canvas style={{ width: "100%", height: "100%" }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Saturn texture={texture} ringTexture={ringTexture} />
        </Canvas>
      </div>

      {/* Right side: Word Doc viewer */}
      <div className="server-info">
        <div className="doc-container">
          {/* Embedding the Word document using Google Docs Viewer */}
          <iframe
            src="https://docs.google.com/document/d/1h5xFHIHebF2bI1Uy37DRV_YRYVUEyVcpSiD3D0tL2y8/edit?usp=sharing"
            className="doc-iframe"
            frameBorder="0"
            title="Saturn Document"
          />
        </div>
      </div>
    </div>
  );
};

export default SaturnPage;