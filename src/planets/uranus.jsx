import React, { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Uranus = ({ highlight, onClick, onPointerOver, onPointerOut }) => {
  const uranusRef = useRef();
  const [emissiveColor, setEmissiveColor] = useState(new THREE.Color(0x000000)); // Default emissive color

  const texture = useLoader(THREE.TextureLoader, 'uranus.webp');

  // Rotate Uranus while keeping the axial tilt
  useFrame(() => {
    if (uranusRef.current) {
      uranusRef.current.rotation.set(0.1, uranusRef.current.rotation.y + 0.002, 0.1);
    }
  });

  useEffect(() => {
    if (highlight) {
      setEmissiveColor(new THREE.Color(0xffffff)); // White glow when highlighted
    } else {
      setEmissiveColor(new THREE.Color(0x000000)); // No glow when not highlighted
    }
  }, [highlight]);

  return (
    <mesh
    ref={uranusRef}
    scale={[0.5, 0.5, 0.5]}
    position={[4.3, 0, 0]}
    onClick={onClick}
    onPointerOver={(e) => {
      e.stopPropagation(); // Prevent event propagation to other objects
      onPointerOver && onPointerOver();
      document.body.style.cursor = "pointer"; // Change cursor to pointer
    }}
    onPointerOut={(e) => {
      e.stopPropagation();
      onPointerOut && onPointerOut();
      document.body.style.cursor = "default"; // Reset cursor when mouse leaves
    }}
  >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        emissive={emissiveColor}
        emissiveIntensity={highlight ? 0.1 : 0.02}
      />
    </mesh>
  );
};

export default Uranus;
