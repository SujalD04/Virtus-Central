import React, { useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

const Sun = () => {
  const sunRef = useRef();
  const { viewport } = useThree(); // Access viewport for responsive scaling

  // Load the texture (optional)
  const texture = useLoader(THREE.TextureLoader, 'sun.jpg');

  // Rotate the Sun
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002; // Slow rotation
    }
  });

  const sunPosition = [-6.7, 0, 0]; // Adjust the position to fit the viewport

  return (
    <mesh ref={sunRef} scale={[0.8, 0.9, 0.8]} position={sunPosition}>
      {/* Create the sphere geometry with 32 segments for smoothness */}
      <sphereGeometry args={[1, 32, 32]} />
      {/* Apply the texture and set emissive properties for the glowing effect */}
      <meshStandardMaterial 
        map={texture} 
        emissive={new THREE.Color(0xFF6600)} // Slight orange glow
        emissiveIntensity={0.1} // Low intensity for subtle light
      />
    </mesh>
  );
};

export default Sun;
