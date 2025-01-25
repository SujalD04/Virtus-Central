import React, { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Jupiter = ({ highlight, onClick, onPointerOver, onPointerOut }) => {
  const jupiterRef = useRef();
  const texture = useLoader(THREE.TextureLoader, 'jupiter.jpg'); // Load Jupiter's texture

  // Rotate Jupiter on its axis
  useFrame(() => {
    if (jupiterRef.current) {
      jupiterRef.current.rotation.y += 0.01; // Rotate Jupiter on its axis
    }
  });

  // Set emissive color based on highlight
  const [emissiveColor, setEmissiveColor] = useState(new THREE.Color(0x000000)); // Default emissive color is black

  useEffect(() => {
    if (highlight) {
      setEmissiveColor(new THREE.Color(0xffffff)); // Set white glow when highlighted
    } else {
      setEmissiveColor(new THREE.Color(0x000000)); // Set no glow when not highlighted
    }
  }, [highlight]); // Run when the 'highlight' prop changes

  return (
    <mesh
      ref={jupiterRef}
      scale={[0.7, 0.7, 0.7]} // Scale the planet
      position={[0.2, 0, 0]} // Position of Jupiter in the solar system
      onClick={onClick} // Handle click event
      onPointerOver={onPointerOver} // Handle hover event
      onPointerOut={onPointerOut} // Handle hover out event
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={texture} // Jupiter texture
        emissive={emissiveColor} // Use the state color for emissive glow
        emissiveIntensity={highlight ? 0.05 : 0.012} // Increase emissive intensity when highlighted
      />
    </mesh>
  );
};

export default Jupiter;
