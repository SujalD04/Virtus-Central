import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Mercury = ({ highlight, onClick, onPointerOver, onPointerOut }) => {
  const mercuryRef = useRef();
  const texture = useLoader(THREE.TextureLoader, 'mercury.jpg'); // Load Mercury's texture

  // Rotate Mercury on its axis
  useFrame(() => {
    if (mercuryRef.current) {
      mercuryRef.current.rotation.y += 0.01; // Rotate slowly on its axis
    }
  });

  return (
    <mesh
      ref={mercuryRef}
      scale={[0.15, 0.15, 0.15]} // Scale the planet
      position={[-5.1, 0, 0]} // Position in the solar system
      onClick={onClick} // Handle click event
      onPointerOver={onPointerOver} // Handle hover event
      onPointerOut={onPointerOut} // Handle hover out event
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={texture} // Mercury's texture
        emissive={highlight ? new THREE.Color(0xffffff) : new THREE.Color(0x000000)} // Glow effect when highlighted
        emissiveIntensity={highlight ? 0.1 : 0.03} // Adjust the intensity of the glow when highlighted
      />
    </mesh>
  );
};

export default Mercury;
