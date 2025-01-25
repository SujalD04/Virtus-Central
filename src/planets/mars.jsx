import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Mars = () => {
  const marsRef = useRef();

  const texture = useLoader(THREE.TextureLoader, 'mars.jpg'); 

  // Rotate Mars on its axis and orbit around the Sun
  useFrame(() => {
    if (marsRef.current) {
      // Rotate Mars on its axis
      marsRef.current.rotation.y += 0.01; 
    }
  });

  return (
    <mesh ref={marsRef} scale={[0.2, 0.2, 0.2]} position={[-1.4, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Mars;
