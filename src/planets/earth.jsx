import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Earth = () => {
  const earthRef = useRef();

  const texture = useLoader(THREE.TextureLoader, 'earth.jpg'); // Replace with your texture

  // Rotate Earth on its axis and orbit around the Sun
  useFrame(() => {
    if (earthRef.current) {
      // Rotate Earth on its axis
      earthRef.current.rotation.y += 0.01; // Slightly faster rotation
    }
  });

  return (
    <mesh ref={earthRef} scale={[0.25, 0.27, 0.25]} position={[-2.6, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
      map={texture}
      emissive={new THREE.Color(0xffffff)}
      emissiveIntensity={0.012}
       />
    </mesh>
  );
};

export default Earth;
