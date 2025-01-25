import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Uranus = () => {
  const uranusRef = useRef();

  const texture = useLoader(THREE.TextureLoader, 'uranus.jpg');

  // Rotate Uranus while keeping the axial tilt
  useFrame(() => {
    if (uranusRef.current) {
      uranusRef.current.rotation.set(0.1, uranusRef.current.rotation.y + 0.002, 0.1);
    }
  });

  return (
    <mesh ref={uranusRef} scale={[0.5, 0.6, 0.5]} position={[4.3, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Uranus;
