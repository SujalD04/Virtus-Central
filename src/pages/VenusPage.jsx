import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import './VenusPage.css'

const Venus = ({ texture }) => {
  const venusRef = useRef();

  // Rotate the Venus model in each frame while keeping its position fixed
  useFrame(() => {
    if (venusRef.current) {
      venusRef.current.rotation.y += 0.001; // Rotate Venus on its axis
    }
  });

  return (
    <mesh
      ref={venusRef}
      scale={[2, 2, 2]} // Scale the planet
      position={[0, 0, 0]} // Keep Venus fixed in its position
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={texture} // Venus's texture
        emissive={new THREE.Color(0x000000)} // No glow for now
        emissiveIntensity={0.03} // Adjust the intensity of the glow
      />
    </mesh>
  );
};

const VenusPage = () => {
  const texture = useLoader(THREE.TextureLoader, 'venus.webp');

  return (
    <div className="venus-page" style={{ display: "flex", flexDirection: "column" }}>
      {/* Left side: 3D Venus model inside Canvas */}
      <div
        className="planet-3d"
        style={{
          width: "50%",
          height: "100vh",
          background: "#000",
          pointerEvents: "none",
        }}
      >
        <Canvas style={{ width: "100%", height: "100%" }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Venus texture={texture} />
        </Canvas>
      </div>

      {/* Right side: Welcome box */}
      <div
        className="server-info"
        style={{
          width: "50%",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          backgroundColor: "#111", // Dark background for contrast
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "30px",
            backgroundColor: "#333",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h1>About The Server</h1>
          <hr />
          <p className="text-xs">
            Founded by 2 guys, Virtus Central is a dynamic hub for enthusiasts of all kinds, where gamers, techies, and media lovers unite to explore a wide range of interests.
            Whether you're into the latest video games, cutting-edge technology, or diving into movies, anime, coding, books, art, and sports, there's a place for you here.
             With an inclusive and friendly environment, you can connect with like-minded individuals, share your passions, and be
            part of a diverse group that celebrates everything from gaming to culture and beyond.
            <br />
            <br />
            At Virtus Central, we believe in fostering a welcoming atmosphere where everyone can feel at home. Whether you're a seasoned gamer strategizing your next move,
            a tech enthusiast eager to discuss the latest innovations, a movie buff sharing your favorite film theories, or an artist showcasing your latest creation, this is
            the place for you. Our diverse channels and activities cater to a wide range of interests, allowing you to dive into meaningful conversations, participate in engaging
            events, and learn from others.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VenusPage;