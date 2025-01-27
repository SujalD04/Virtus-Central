import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { Html, Text } from "@react-three/drei"; // To display HTML and 3D text above the planet
import Sun from "../planets/sun";
import Mercury from "../planets/mercury";
import Venus from "../planets/venus";
import Earth from "../planets/earth";
import Mars from "../planets/mars";
import Jupiter from "../planets/jupiter";
import Saturn from "../planets/saturn";
import Uranus from "../planets/uranus";
import Neptune from "../planets/neptune";
import '../components/SolarSystem.css';

const SolarSystem = () => {
  // State to keep track of the currently selected planet
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  // State to track which planet is being hovered
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  // Planet information to display when hovered
  const planetInfo = {
    Mercury: { name: "Mercury:", info: "Welcome to Virtus Central!" },
    Venus: { name: "Venus:", info: "Server Purpose: Hosting" },
    Earth: { name: "Earth:", info: "Check out the server!" },
    Mars: { name: "Mars:", info: "Rules and Guidelines" },
    Jupiter: { name: "Jupiter:", info: "Roles and Permissions" },
    Saturn: { name: "Saturn:", info: "How-to Guides" },
    Uranus: { name: "Uranus:", info: "Message the Developers" },
    Neptune: { name: "Neptune:", info: "Server Statistics" }
  };

  const handlePlanetClick = (planetName) => {
    setSelectedPlanet(planetName); // Update the selected planet
    navigate(`/${planetName}Page`); // Navigate to the respective planet page
  };

  const handlePlanetHover = (planetName) => {
    setHoveredPlanet(planetName); // Update the hovered planet
  };

  const handleHoverOut = () => {
    setHoveredPlanet(null); // Reset hover when pointer leaves planet
  };

  return (
    <React.Fragment>
      {/* Sun */}
      <Sun />

      {/* Mercury */}
      <Mercury
        onClick={() => handlePlanetClick("Mercury")}
        onPointerOver={() => handlePlanetHover("Mercury")}
        onPointerOut={handleHoverOut}
        highlight={hoveredPlanet === "Mercury" || selectedPlanet === "Mercury"}
      />
      {hoveredPlanet === "Mercury" && (
        <Html position={[-5.1, 1.5, 0]}>
          <div className="planet-info">
            <h2>{planetInfo.Mercury.name}</h2>
            <p>{planetInfo.Mercury.info}</p>
          </div>
        </Html>
      )}

      {/* Venus */}
      <Venus
        onClick={() => handlePlanetClick("Venus")}
        onPointerOver={() => handlePlanetHover("Venus")}
        onPointerOut={handleHoverOut}
        highlight={hoveredPlanet === "Venus" || selectedPlanet === "Venus"}
      />
      {hoveredPlanet === "Venus" && (
        <Html position={[-3.9, 1.5, 0]}>
          <div className="planet-info">
            <h2>{planetInfo.Venus.name}</h2>
            <p>{planetInfo.Venus.info}</p>
          </div>
        </Html>
      )}

      {/* Earth */}
      <Earth
        onClick={() => handlePlanetClick("Earth")}
        onPointerOver={() => handlePlanetHover("Earth")}
        onPointerOut={handleHoverOut}
        highlight={hoveredPlanet === "Earth" || selectedPlanet === "Earth"}
      />
      {hoveredPlanet === "Earth" && (
        <Html position={[-2.5, 1.5, 0]}>
          <div className="planet-info">
            <h2>{planetInfo.Earth.name}</h2>
            <p>{planetInfo.Earth.info}</p>
          </div>
        </Html>
      )}

      {/* Mars */}
      <Mars
        onClick={() => handlePlanetClick("Mars")}
        onPointerOver={() => handlePlanetHover("Mars")}
        onPointerOut={handleHoverOut}
        highlight={hoveredPlanet === "Mars" || selectedPlanet === "Mars"}
      />
      {hoveredPlanet === "Mars" && (
        <Html position={[-1.4, 1.5, 0]}>
          <div className="planet-info">
            <h2>{planetInfo.Mars.name}</h2>
            <p>{planetInfo.Mars.info}</p>
          </div>
        </Html>
      )}

      {/* Jupiter */}
      <Jupiter
        onClick={() => handlePlanetClick("Jupiter")}
        onPointerOver={() => handlePlanetHover("Jupiter")}
        onPointerOut={handleHoverOut}
        highlight={hoveredPlanet === "Jupiter" || selectedPlanet === "Jupiter"}
      />
      {hoveredPlanet === "Jupiter" && (
        <Html position={[0.4, 1.5, 0]}>
          <div className="planet-info">
            <h2>{planetInfo.Jupiter.name}</h2>
            <p>{planetInfo.Jupiter.info}</p>
          </div>
        </Html>
      )}

      {/* Saturn */}
      <Saturn
        onClick={() => handlePlanetClick("Saturn")}
        onPointerOver={() => handlePlanetHover("Saturn")}
        onPointerOut={handleHoverOut}
        highlight={hoveredPlanet === "Saturn" || selectedPlanet === "Saturn"}
      />
      {hoveredPlanet === "Saturn" && (
        <Html position={[2.3, 1.5, 0]}>
          <div className="planet-info">
            <h2>{planetInfo.Saturn.name}</h2>
            <p>{planetInfo.Saturn.info}</p>
          </div>
        </Html>
      )}

      {/* Uranus */}
      <Uranus
        onClick={() => handlePlanetClick("Uranus")}
        onPointerOver={() => handlePlanetHover("Uranus")}
        onPointerOut={handleHoverOut}
        highlight={hoveredPlanet === "Uranus" || selectedPlanet === "Uranus"}
      />
      {hoveredPlanet === "Uranus" && (
        <Html position={[4.5, 1.5, 0]}>
          <div className="planet-info">
            <h2>{planetInfo.Uranus.name}</h2>
            <p>{planetInfo.Uranus.info}</p>
          </div>
        </Html>
      )}

      {/* Neptune */}
      <Neptune
        onClick={() => handlePlanetClick("Neptune")}
        onPointerOver={() => handlePlanetHover("Neptune")}
        onPointerOut={handleHoverOut}
        highlight={hoveredPlanet === "Neptune" || selectedPlanet === "Neptune"}
      />
      {hoveredPlanet === "Neptune" && (
        <Html position={[6, 1.4, 0]}>
          <div className="planet-info">
            <h2>{planetInfo.Neptune.name}</h2>
            <p>{planetInfo.Neptune.info}</p>
          </div>
        </Html>
      )}

      {/* 3D Fixed Text */}
      <Text
        position={[-0, 4, -5]} // Adjust this position to place the text where you want
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Use your Mouse and WASD Keys to move around
      </Text>
    </React.Fragment>
  );
};

export default SolarSystem;
