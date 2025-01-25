import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Saturn = () => {
  const saturnRef = useRef();
  const ringRef = useRef();

  // Load Saturn's texture
  const texture = useLoader(THREE.TextureLoader, 'saturn.jpg');
  const ringTexture = useLoader(THREE.TextureLoader, 'saturn_ring.jpg');

  // Rotate Saturn left to right while keeping the axial tilt
  useFrame(() => {
    if (saturnRef.current) {
      // Apply axial tilt and rotation around Y-axis for left-right rotation
      saturnRef.current.rotation.set(0.1, saturnRef.current.rotation.y + 0.002, 0.1);
      saturnRef.current.rotation.y = 1.8;
      saturnRef.current.rotation.x = -0.9;
      saturnRef.current.rotation.z = 1.4;
    }

    if (ringRef.current) {
      // Orbiting the rings around Saturn
      ringRef.current.rotation.y += 0.1;
      ringRef.current.rotation.y = -0.7; // Orbiting around the Y-axis of Saturn (hula hoop style)
      ringRef.current.rotation.z = -1;
      ringRef.current.rotation.x = 1.4;
    }
  });

  return (
    <group>
      {/* Saturn */}
      <mesh ref={saturnRef} scale={[0.55, 0.58, 0.55]} position={[2.1, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Saturn's Rings */}
      <mesh ref={ringRef} scale={[0.28, 0.35, 0.28]} position={[2.09, 0, 0]}>
        <ringGeometry args={[2, 3, 64]} />  {/* Wider, more detailed ring */}
        <meshStandardMaterial map={ringTexture} transparent />
      </mesh>
    </group>
  );
};

export default Saturn;
