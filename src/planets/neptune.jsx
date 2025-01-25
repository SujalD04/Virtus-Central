import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Neptune = () => {
  const neptuneRef = useRef();

  // Load Neptune's texture
  const texture = useLoader(THREE.TextureLoader, 'neptune.jpg');

  // Rotate Neptune while keeping the axial tilt
  useFrame(() => {
    if (neptuneRef.current) {
    }
  });

  return (
    <mesh ref={neptuneRef} scale={[0.3, 0.6, 0.45]} position={[6, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Neptune;
