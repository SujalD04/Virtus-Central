import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Venus = () => {
  const venusRef = useRef();

  // Load Venus's texture (optional)
  const texture = useLoader(THREE.TextureLoader, 'venus.jpg');

  // Rotate Venus on its axis and orbit around the Sun
  useFrame(() => {
    if (venusRef.current) {
      // Rotate Venus on its axis
      venusRef.current.rotation.y += 0.005; // Slower rotation
    }
  });

  return (
    <mesh ref={venusRef} scale={[0.25, 0.3, 0.25]} position={[-3.9, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
      map={texture} 
      emissive={new THREE.Color(0xffffff)}
      emissiveIntensity={0.01}
      />
    </mesh>
  );
};

export default Venus;
