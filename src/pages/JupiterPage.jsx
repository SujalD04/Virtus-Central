import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import './JupiterPage.css';

const Jupiter = ({ texture }) => {
  const jupiterRef = useRef();

  // Rotate the Jupiter model in each frame while keeping its position fixed
  useFrame(() => {
    if (jupiterRef.current) {
      jupiterRef.current.rotation.y += 0.001; // Rotate Jupiter on its axis
    }
  });

  return (
    <mesh
      ref={jupiterRef}
      scale={[2, 2, 2]} // Scale the planet
      position={[0, 0, 0]} // Keep Jupiter fixed in its position
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={texture} // Jupiter's texture
        emissive={new THREE.Color(0x000000)} // No glow for now
        emissiveIntensity={0.03} // Adjust the intensity of the glow
      />
    </mesh>
  );
};

const JupiterPage = () => {
  const texture = useLoader(THREE.TextureLoader, 'jupiter.jpg');

  return (
    <div className="jupiter-page" style={{ display: "flex" }}>
      {/* Left side: 3D Jupiter model inside Canvas */}
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

          <Jupiter texture={texture} />
        </Canvas>
      </div>

      {/* Right side: Roles and Descriptions */}
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
          height: "100vh", // Keep the right side the same height as the page
        }}
      >
        {/* Scrollable container for the roles */}
        <div
          style={{
            textAlign: "center",
            padding: "30px",
            backgroundColor: "#333",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            width: "100%",
            maxHeight: "100%", // Allow it to fill the available height
            overflowY: "auto", // Make the roles section scrollable
          }}
        >
          <h1 className="underline">Server Roles and Permissions</h1>

          {/* Roles and Descriptions */}
          <div className="role-info" style={{ marginTop: "20px" }}>
            <div>
              <h2 className="text-lg font-semibold text-red-500">Recruit 🟥</h2>
              <p className="text-sm">Permissions: External emojis</p>
              <p className="text-sm">
                Description: This role allows members to use external emojis from other servers. It's typically assigned to new or entry-level members as they start engaging with the server.
              </p>
            </div>

            <div style={{ marginTop: "10px" }}>
              <h2 className="text-lg font-semibold text-orange-500">Novice 🟧</h2>
              <p className="text-sm">Permissions: Reactions to messages</p>
              <p className="text-sm">
                Description: Novices can react to messages within the server, helping them participate in polls or express themselves with emojis.
              </p>
            </div>

            <div style={{ marginTop: "10px" }}>
              <h2 className="text-lg font-semibold text-yellow-500">Tactician 🟨</h2>
              <p className="text-sm">Permissions: Nicknames</p>
              <p className="text-sm">
                Description: Tacticians can customize their nicknames in the server. This role is often given to members who are actively involved in discussions and contributing to strategies or planning.
              </p>
            </div>

            <div style={{ marginTop: "10px" }}>
              <h2 className="text-lg font-semibold text-green-500">Strategist 🟩</h2>
              <p className="text-sm">Permissions: Voice Messages and Picture Permissions</p>
              <p className="text-sm">
                Description: Strategists are able to send voice messages and can share images. This role is suited for those who engage in more strategic conversations and share media related to the server’s activities.
              </p>
            </div>

            <div style={{ marginTop: "10px" }}>
              <h2 className="text-lg font-semibold text-blue-500">Playmaker 🟦</h2>
              <p className="text-sm">Permissions: Screenshare and Soundboard</p>
              <p className="text-sm">
                Description: Playmakers can share their screen and use the soundboard feature during voice calls. This role is ideal for members who want to enhance interactive sessions with visual and auditory elements, making it perfect for collaborative gaming or presentations.
              </p>
            </div>

            <div style={{ marginTop: "10px" }}>
              <h2 className="text-lg font-semibold text-purple-500">Master 🟪</h2>
              <p className="text-sm">Permissions: Public Polls</p>
              <p className="text-sm">
                Description: Masters can create and participate in public polls. This role is for experienced members who can help gather community opinions or make decisions.
              </p>
            </div>

            <div style={{ marginTop: "10px" }}>
              <h2 className="text-lg font-semibold text-gray-500">Grandmaster ⬜</h2>
              <p className="text-sm">Permissions: Create and own threads</p>
              <p className="text-sm">
                Description: Grandmasters can start and manage threads within channels, facilitating in-depth discussions or organizing content effectively.
              </p>
            </div>

            <div style={{ marginTop: "10px" }}>
              <h2 className="text-lg font-semibold text-teal-500">VIP ✔️</h2>
              <p className="text-sm">Permissions: Special status</p>
              <p className="text-sm">
                Description: The VIP role is reserved for selected members who are recognized for their active engagement. This role typically has no specific permissions but is a mark of distinction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JupiterPage;
