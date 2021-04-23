import React from 'react';

const UserCard = ({
  info
}) => {
  const {
    username, name, email, location, plants,
  } = info;
console.log(plants)
  const plantArray = plants.map((plant, i) => {
    return (
    <div className={'plantArray'}>
     <p className="forSalePlant">For Sale:</p>
      <ul className="plantList">
    
        <li key={i} className="plantListItem">
         Type: { plant.name }
        </li>
        <li key={i} className="plantListItem">
         Species: { plant.species }
        </li>
        <li key={i} className="plantListItem">
         Price ${ plant.price }
        </li>
      </ul>
    </div>
    )
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
      </ul>
      {/* <h4 className="forSale">For Sale:</h4> */}
      { plantArray }
    </article>
  );
};

export default UserCard;
