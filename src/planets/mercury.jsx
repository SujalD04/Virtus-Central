import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Mercury = () => {
  const mercuryRef = useRef();

  // Load Mercury's texture (optional)
  const texture = useLoader(THREE.TextureLoader, 'mercury.jpg');

  // Rotate Mercury on its axis
  useFrame(() => {
    if (mercuryRef.current) {
      mercuryRef.current.rotation.y += 0.01; // Rotate slowly on its axis
    }
  });

  return (
    <mesh ref={mercuryRef} scale={[0.15, 0.2, 0.15]} position={[-5.1, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Mercury;
