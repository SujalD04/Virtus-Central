import React, { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Mars = ({ highlight, onClick, onPointerOver, onPointerOut }) => {
  const marsRef = useRef();
  const texture = useLoader(THREE.TextureLoader, 'mars.jpg'); // Load Mars texture

  // Rotate Mars on its axis
  useFrame(() => {
    if (marsRef.current) {
      marsRef.current.rotation.y += 0.01; // Rotate Mars on its axis
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
      ref={marsRef}
      scale={[0.2, 0.2, 0.2]} // Scale the planet
      position={[-1.4, 0, 0]} // Position of Mars in the solar system
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
        map={texture} // Mars texture
        emissive={emissiveColor} // Use the state color for emissive glow
        emissiveIntensity={highlight ? 0.05 : 0.012} // Increase emissive intensity when highlighted
      />
    </mesh>
  );
};

export default Mars;
