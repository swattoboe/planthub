import React from 'react';
import {Link} from 'react-router-dom';
const UserCard = ({
  info
}) => {
  const {
    username, name, email, location, plants,
  } = info;

  const plantArray = plants.map((plant, i) => {
    <li key={i} className="plantListItem">
      -
      {' '}
      { plant.name }
      , $
      {plant.price}
    </li>;
  });

  return (
    <article className="userCard">
      <div className="userCardTitle">
        <h3 className="userName">{username}</h3>
      </div>
      <ul className="userDetailsList">
        <li className="userLocation">{name}</li>
        <li className="userLocation">{email}</li>
        <li className="userLocation">{location}</li>
        { plantArray }
      </ul>
      
    </article>
  );
};

export default UserCard;
