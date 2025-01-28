import React, { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Venus = ({ highlight, onClick, onPointerOver, onPointerOut }) => {
  const venusRef = useRef();
  const texture = useLoader(THREE.TextureLoader, 'venus.webp');
  const [emissiveColor, setEmissiveColor] = useState(new THREE.Color(0x000000)); // Default emissive color is black

  // Rotate Venus on its axis
  useFrame(() => {
    if (venusRef.current) {
      venusRef.current.rotation.y += 0.005; // Slower rotation
    }
  });

  useEffect(() => {
    // Update emissive color based on highlight state
    if (highlight) {
      setEmissiveColor(new THREE.Color(0xffffff)); // Set white glow when highlighted
    } else {
      setEmissiveColor(new THREE.Color(0x000000)); // Set no glow when not highlighted
    }
  }, [highlight]); // This effect runs when the 'highlight' state changes

  return (
    <mesh 
      ref={venusRef} 
      scale={[0.25, 0.25, 0.25]} 
      position={[-3.9, 0, 0]} 
      onClick={onClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer'; // Change cursor to pointer when hovering over Venus
        onPointerOver && onPointerOver(e);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'auto'; // Reset cursor when not hovering over Venus
        onPointerOut && onPointerOut(e);
      }}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        map={texture} 
        emissive={emissiveColor} // Use the state color for emissive glow
        emissiveIntensity={highlight ? 0.05 : 0.01} // Increase emissive intensity when highlighted
      />
    </mesh>
  );
};

export default Venus;
