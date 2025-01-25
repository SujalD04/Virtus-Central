import React from 'react';
import Sun from '../planets/sun';
import Mercury from '../planets/mercury';

const SolarSystem = () => {
  return (
    <React.Fragment> {/* Or use a <group> tag in the scene */}
      <Sun />
      <Mercury />
    </React.Fragment>
  );
};

export default SolarSystem;
