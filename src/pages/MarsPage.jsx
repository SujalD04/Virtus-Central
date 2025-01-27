import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Mars = ({ texture }) => {
  const marsRef = useRef();

  // Rotate the Mars model in each frame while keeping its position fixed
  useFrame(() => {
    if (marsRef.current) {
      marsRef.current.rotation.y += 0.01; // Rotate Mars on its axis
    }
  });

  return (
    <mesh
      ref={marsRef}
      scale={[2, 2, 2]} // Scale the planet
      position={[0, 0, 0]} // Keep Mars fixed in its position
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={texture} // Mars's texture
        emissive={new THREE.Color(0x000000)} // No glow for now
        emissiveIntensity={0.03} // Adjust the intensity of the glow
      />
    </mesh>
  );
};

const MarsPage = () => {
  const texture = useLoader(THREE.TextureLoader, 'mars.jpg');

  return (
    <div className="mars-page" style={{ display: "flex", height: "100vh" }}>
      {/* Left side: 3D Mars model inside Canvas */}
      <div
        className="planet-3d"
        style={{
          width: "50%",
          height: "100vh",
          background: "#000",
          pointerEvents: "none", // Prevent interaction with the 3D canvas
        }}
      >
        <Canvas style={{ width: "100%", height: "100%" }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Mars texture={texture} />
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
            maxHeight: "90vh", // Ensure box is not too tall
            overflowY: "auto", // Allow scrolling if content overflows
          }}
        >
          <h1 className="underline text-2xl mb-4">Rules and Guidelines</h1>
          <ul className="list-disc list-inside space-y-3 text-left text-sm">
            <li>Respect All Members: Treat everyone with kindness and respect. Personal attacks, harassment, or hate speech will not be tolerated.</li>
            <li>No Spamming: Avoid sending repetitive messages, links, or images. Spamming clutters channels and disrupts conversations.</li>
            <li>Keep Content Safe for Work (SFW): All content must be appropriate for all ages. No NSFW, offensive, or illegal material.</li>
            <li>No Self-Promotion or Advertising: Do not promote your own content, server, or social media without prior permission from the server moderators.</li>
            <li>Stay Relevant: Keep discussions relevant to the channel topic. Off-topic conversations should be moved to appropriate channels.</li>
            <li>No Excessive Pinging: Avoid unnecessarily pinging members, especially moderators or admins, unless it is urgent.</li>
            <li>Use Appropriate Language: Keep language clean and avoid using excessive profanity. Respect others’ boundaries regarding sensitive topics.</li>
            <li>No Impersonation: Do not impersonate other members, moderators, or public figures. This includes using similar usernames or profile pictures.</li>
            <li>Respect Privacy: Do not share personal information about yourself or others. This includes real names, addresses, or private conversations without consent.</li>
            <li>Follow Discord’s Terms of Service: All server members must adhere to Discord’s Terms of Service and Community Guidelines.</li>
            <li><a className="text-blue-600" href="https://discord.com/terms">Discord's Terms</a> <a className="text-green-600" href="https://discord.com/guidelines">Discord's Guidelines</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MarsPage;
