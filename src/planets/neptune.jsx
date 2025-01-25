import React, { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Neptune = ({ highlight, onClick, onPointerOver, onPointerOut }) => {
  const neptuneRef = useRef();
  const [emissiveColor, setEmissiveColor] = useState(new THREE.Color(0x000000)); // Default emissive color

  const texture = useLoader(THREE.TextureLoader, 'neptune.jpg');

  // Rotate Neptune while keeping the axial tilt
  useFrame(() => {
    if (neptuneRef.current) {
      neptuneRef.current.rotation.y += 0.01;
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
      ref={neptuneRef}
      scale={[0.45, 0.45, 0.45]}
      position={[6, 0, 0]}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
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

export default Neptune;
