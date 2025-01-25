import React from 'react';
import Sun from '../planets/sun';
import Mercury from '../planets/mercury';
import Venus from '../planets/venus';
import Earth from '../planets/earth';
import Mars from '../planets/mars';
import Jupiter from '../planets/jupiter';
import Saturn from '../planets/saturn';
import Uranus from '../planets/uranus';
import Neptune from '../planets/neptune';
const SolarSystem = () => {
  return (
    <React.Fragment> {/* Or use a <group> tag in the scene */}
      <Sun />
      <Mercury />
      <Venus />
      <Earth />
      <Mars />
      <Jupiter />
      <Saturn />
      <Uranus />
      <Neptune />
    </React.Fragment>
  );
};

export default SolarSystem;
