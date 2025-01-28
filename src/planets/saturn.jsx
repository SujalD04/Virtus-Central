import React, { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Saturn = ({ highlight, onClick, onPointerOver, onPointerOut }) => {
  const saturnRef = useRef();
  const ringRef = useRef();

  const texture = useLoader(THREE.TextureLoader, 'saturn.webp');
  const ringTexture = useLoader(THREE.TextureLoader, 'saturn_ring.webp');

  const [planetEmissiveColor, setPlanetEmissiveColor] = useState(new THREE.Color(0x000000)); // Default emissive color for planet
  const [ringEmissiveColor, setRingEmissiveColor] = useState(new THREE.Color(0x000000)); // Default emissive color for rings

  useEffect(() => {
    if (highlight) {
      setPlanetEmissiveColor(new THREE.Color(0xffffff)); // Set white glow for planet when highlighted
      setRingEmissiveColor(new THREE.Color(0xffffff)); // Set white glow for rings when highlighted
    } else {
      setPlanetEmissiveColor(new THREE.Color(0x000000)); // No glow for planet when not highlighted
      setRingEmissiveColor(new THREE.Color(0x000000)); // No glow for rings when not highlighted
    }
  }, [highlight]); // Run when the highlight state changes

  // Rotate Saturn and its rings
  useFrame(() => {
    if (saturnRef.current) {
      saturnRef.current.rotation.set(0.1, saturnRef.current.rotation.y + 0.002, 0.1);
      saturnRef.current.rotation.y += 0.01;
      saturnRef.current.rotation.y = 1.8;
      saturnRef.current.rotation.x = -0.9;
      saturnRef.current.rotation.z = 1.4;
    }

    if (ringRef.current) {
      ringRef.current.rotation.y += 0.1;
      ringRef.current.rotation.y = -0.7;
      ringRef.current.rotation.z = -1;
      ringRef.current.rotation.x = 1.4;
    }
  });

  return (
    <group>
      {/* Saturn Planet */}
      <mesh
        ref={saturnRef}
        scale={[0.55, 0.55, 0.55]}
        position={[2.3, 0, 0]}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation(); // Prevent event propagation to other objects
          onPointerOver && onPointerOver();
          document.body.style.cursor = "pointer"; // Change cursor to pointer
        }}
        onPointerOut={(e) => {
          e.stopPropagation(); // Prevent event propagation to other objects
          onPointerOut && onPointerOut();
          document.body.style.cursor = "default"; // Reset cursor when mouse leaves
        }}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          emissive={planetEmissiveColor}
          emissiveIntensity={highlight ? 0.1 : 0.02} // Increase emissive intensity on hover
        />
      </mesh>

      {/* Saturn Rings */}
      <mesh
        ref={ringRef}
        scale={[0.28, 0.35, 0.28]}
        position={[2.3, 0, 0]}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation(); // Prevent event propagation to other objects
          onPointerOver && onPointerOver();
          document.body.style.cursor = "pointer"; // Change cursor to pointer
        }}
        onPointerOut={(e) => {
          e.stopPropagation(); // Prevent event propagation to other objects
          onPointerOut && onPointerOut();
          document.body.style.cursor = "default"; // Reset cursor when mouse leaves
        }}
      >
        <ringGeometry args={[2, 3, 64]} />
        <meshStandardMaterial
          map={ringTexture}
          transparent
          side={THREE.DoubleSide}
          emissive={ringEmissiveColor}
          emissiveIntensity={highlight ? 0.1 : 0.02} // Increase emissive intensity on hover
        />
      </mesh>
    </group>
  );
};

export default Saturn;
