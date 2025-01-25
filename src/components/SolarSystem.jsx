import React, { useState } from "react";
import Sun from "../planets/sun";
import Mercury from "../planets/mercury";
import Venus from "../planets/venus";
import Earth from "../planets/earth";
import Mars from "../planets/mars";
import Jupiter from "../planets/jupiter";
import Saturn from "../planets/saturn";
import Uranus from "../planets/uranus";
import Neptune from "../planets/neptune";

const SolarSystem = () => {
  // State to keep track of the currently selected planet
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  // State to track which planet is being hovered
  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  const handlePlanetClick = (planetName) => {
    setSelectedPlanet(planetName); // Update the selected planet
  };

  const handlePlanetHover = (planetName) => {
    setHoveredPlanet(planetName); // Update the hovered planet
  };

  const handleHoverOut = () => {
    setHoveredPlanet(null); // Reset hover when pointer leaves planet
  };

  return (
    <React.Fragment>
      {/* Sun (Don't add click functionality for the sun as per your request) */}
      <Sun />

      {/* Mercury */}
      <Mercury
        onClick={() => handlePlanetClick("Mercury")}
        onPointerOver={() => handlePlanetHover("Mercury")}
        onPointerOut={handleHoverOut}
        highlight={hoveredPlanet === "Mercury" || selectedPlanet === "Mercury"}
      />

      {/* Venus */}
      <Venus
        onClick={() => handlePlanetClick("Venus")}
        onPointerOver={() => handlePlanetHover("Venus")}
        onPointerOut={handleHoverOut}
        highlight={hoveredPlanet === "Venus" || selectedPlanet === "Venus"}
      />

      {/* Earth */}
      <Earth
        onClick={() => handlePlanetClick("Earth")}
        onPointerOver={() => handlePlanetHover("Earth")}
        onPointerOut={handleHoverOut}
        highlight={hoveredPlanet === "Earth" || selectedPlanet === "Earth"}
      />

      {/* Mars */}
      <Mars
        onClick={() => handlePlanetClick("Mars")}
        onPointerOver={() => handlePlanetHover("Mars")}
        onPointerOut={handleHoverOut}
        highlight={hoveredPlanet === "Mars" || selectedPlanet === "Mars"}
      />

      {/* Jupiter */}
      <Jupiter
        onClick={() => handlePlanetClick("Jupiter")}
        onPointerOver={() => handlePlanetHover("Jupiter")}
        onPointerOut={handleHoverOut}
        highlight={hoveredPlanet === "Jupiter" || selectedPlanet === "Jupiter"}
      />

      {/* Saturn */}
      <Saturn
        onClick={() => handlePlanetClick("Saturn")}
        onPointerOver={() => handlePlanetHover("Saturn")}
        onPointerOut={handleHoverOut}
        highlight={hoveredPlanet === "Saturn" || selectedPlanet === "Saturn"}
      />

      {/* Uranus */}
      <Uranus
        onClick={() => handlePlanetClick("Uranus")}
        onPointerOver={() => handlePlanetHover("Uranus")}
        onPointerOut={handleHoverOut}
        highlight={hoveredPlanet === "Uranus" || selectedPlanet === "Uranus"}
      />

      {/* Neptune */}
      <Neptune
        onClick={() => handlePlanetClick("Neptune")}
        onPointerOver={() => handlePlanetHover("Neptune")}
        onPointerOut={handleHoverOut}
        highlight={hoveredPlanet === "Neptune" || selectedPlanet === "Neptune"}
      />
    </React.Fragment>
  );
};

export default SolarSystem;
