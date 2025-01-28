import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import emailjs from "emailjs-com"; // Import EmailJS

const Uranus = ({ texture }) => {
  const uranusRef = useRef();

  // Rotate the Uranus model in each frame while keeping its position fixed
  useFrame(() => {
    if (uranusRef.current) {
      uranusRef.current.rotation.y += 0.001; // Rotate Uranus on its axis
    }
  });

  return (
    <mesh
      ref={uranusRef}
      scale={[2, 2, 2]} // Scale the planet
      position={[0, 0, 0]} // Keep Uranus fixed in its position
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={texture} // Uranus' texture
        emissive={new THREE.Color(0x000000)} // No glow for now
        emissiveIntensity={0.03} // Adjust the intensity of the glow
      />
    </mesh>
  );
};

const UranusPage = () => {
  const texture = useLoader(THREE.TextureLoader, 'uranus.webp');
  
  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  // Handle form submission with EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setSubmitStatus("");

    // Prepare the data to send to the template
    const formData = {
      from_name: name,
      from_email: email,
      message: message,
    };
    

    // Send the email using EmailJS
    emailjs
      .send("service_7mqvqpz", "template_r6jgt29", formData, "iXFTj6XhKdRBUBkst")
      .then(
        (response) => {
          console.log("Message sent successfully:", response);
          setSubmitStatus("Message sent successfully!");
          setIsSending(false);
          // Clear the form after submission
          setName("");
          setEmail("");
          setMessage("");
        },
        (error) => {
          console.log("Error sending message:", error);
          setSubmitStatus("Error sending message. Please try again.");
          setIsSending(false);
        }
      );
  };

  return (
    <div className="uranus-page" style={{ display: "flex" }}>
      {/* Left side: 3D Uranus model inside Canvas */}
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
          <Uranus texture={texture} />
        </Canvas>
      </div>

      {/* Right side: Message Form */}
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
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <h1>Contact Us</h1>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              style={{ ...inputStyle, height: "150px", resize: "none" }}
            />
            <button type="submit" style={buttonStyle} disabled={isSending}>
              {isSending ? "Sending..." : "Submit"}
            </button>
          </form>
          {submitStatus && <p style={{ color: "green", marginTop: "20px" }}>{submitStatus}</p>}
        </div>
      </div>
    </div>
  );
};

// Styling for form elements
const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #444",
  backgroundColor: "#222",
  color: "white",
  fontSize: "16px",
  outline: "none",
};

const buttonStyle = {
  padding: "12px 20px",
  backgroundColor: "#4CAF50",
  color: "white",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
};

export default UranusPage;
