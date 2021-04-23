import React from 'react';
import { withRouter, Link } from 'react-router-dom';
const PlantCard = ({
  info
}) => {
  const {
    name, species, price
  } = info;

  return (
    <div className="plantCardContainerInner">
      <h2 className="plantName">{name}</h2>
      <h3 className="species">{species}</h3>
      <h3 className="price">Price: {price}</h3>
    </div>
  );
};

export default withRouter(PlantCard);