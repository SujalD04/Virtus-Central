import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Jupiter = () => {
  const jupiterRef = useRef();

  // Load Jupiter's texture (optional)
  const texture = useLoader(THREE.TextureLoader, 'jupiter.jpg'); 

  // Rotate Jupiter on its axis and orbit around the Sun
  useFrame(() => {
    if (jupiterRef.current) {
      // Rotate Jupiter faster on its axis
      jupiterRef.current.rotation.y += 0.01; 
    }
  });

  return (
    <mesh ref={jupiterRef} scale={[0.6, 0.6, 0.6]} position={[0.2, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Jupiter;
