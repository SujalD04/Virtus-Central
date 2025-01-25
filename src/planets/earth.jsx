import React, { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Earth = ({ highlight, onClick, onPointerOver, onPointerOut }) => {
  const earthRef = useRef();
  const texture = useLoader(THREE.TextureLoader, 'earth.jpg'); // Load Earth texture

  // Rotate Earth on its axis
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.01; // Slightly faster rotation
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
      ref={earthRef}
      scale={[0.25, 0.25, 0.25]} // Scale the planet
      position={[-2.6, 0, 0]} // Position of Earth in the solar system
      onClick={onClick} // Handle click event
      onPointerOver={(e) => {
        e.stopPropagation();
        onPointerOver && onPointerOver();
        document.body.style.cursor = "pointer"; // Change cursor to pointer
      }} // Handle hover event
      onPointerOut={(e) => {
        e.stopPropagation();
        onPointerOut && onPointerOut();
        document.body.style.cursor = "default"; // Reset cursor when mouse leaves
      }} // Handle hover out event
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={texture} // Earth texture
        emissive={emissiveColor} // Use the state color for emissive glow
        emissiveIntensity={highlight ? 0.05 : 0.012} // Increase emissive intensity when highlighted
      />
    </mesh>
  );
};

export default Earth;
