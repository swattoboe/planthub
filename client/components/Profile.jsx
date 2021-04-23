import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PlantCard from './PlantCard.jsx';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      // currentUser: '',
      // fetchedUser: false,
      plantname: '',
      species: '',
      price: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getState = this.getState.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  componentDidMount(){
    this.getState();
  }

  getState(){
    console.log('propshistory in Mount',this.props.history);
    fetch(`/profile/user?username=${this.props.history.location.state.username}`)
      .then(res => res.json())
      .then((user)  => {
        // console.log(user);
        return this.setState({
          username: user.username,
          name: user.name,
          email: user.email,
          location: user.location,
          plants: user.plants,
          fetchedUser: true,
        });
      })
      .catch(err => console.log(`Error in componentDidMount fetching user: ${err}`));
    // console.log('this.state after mount',this.state);

  }
  handleClick(event){
    console.log('buttonclickevent', event.target.id)
    console.log('this.state', this.state.plants[0])
    let plantId;
    const plantsArr = this.state.plants;
    // console.log('plantsArr', plantsArr)
    for (let i = 0; i < plantsArr.length; i++){
      // console.log('plantsArr[i]_id',plantsArr[i]._id)
      if (plantsArr[i]._id === event.target.id)
        plantId = plantsArr[i]._id;
    }
    const body = {
      username: this.state.username,
      _id: plantId
      // plantname: 
    }
    console.log('req body in handleClick', body)
    event.preventDefault();
    fetch('/profile/deletePlant', {
      method: 'PUT', 
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(result => console.log(result))
    this.getState();
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value
    });
  }

  handleSubmit(event){
    event.preventDefault();
    const body =  {
      username: this.state.username,
      plantname: this.state.plantname,
      species: this.state.species,
      price: this.state.price
    };

    fetch('/profile/addPlant', {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(plantData => {
        this.setState({
          ...this.state,
          plants: plantData,
        });
        console.log('PlantData received:', plantData);
      });
    this.getState();
    this.setState({
      plantname: '',
      species: '',
      price: '',
    })
    // this.nameInput.value = '';
    // this.speciesInput.value = '';
    // this.priceInput.value = '';
  }

  render() {
    // if (!this.state.fetchedUser) return (
    //   <div>
    //     <h1>We appreciate your patience while data is loading...</h1>
    //   </div>
    // );
    // if (this.state.plants.length > 0) 
    let plantCardArray;
    if (this.state.plants){
      plantCardArray = this.state.plants.map((plant, ind) => {
        return (
          <div className="plantCardContainer">
          <PlantCard
            className="plantCard"
            key={`plant${ind}`} 
            id={ind}
            info={plant}
            handleClick={this.handleClick}
            username={this.state.username}
          />
          <button className="deleteButton" id={plant._id} onClick={this.handleClick}>Delete</button>
          </div>

        );
      });
    }
    else {
      plantCardArray = <div></div>; 
    }
    // 
    // if (!user) return null;
    // console.log('state in render', this.state)
    return (
      <div id="profileContainer">
        {/* <header className="profileUsername">
          <h2>{this.state.name}</h2>
        </header> */}
        <div id="profileDetails">
          <p>Seller Username: {this.state.username}</p>
          <p>Email: {this.state.email}</p>
          <p>Location: {this.state.location}</p>
        </div>
        <div className="forSale">
          <h2>For Sale: </h2>
          {plantCardArray}
        </div>
        <div className="formContainer">
        <form id="profilePlantForm" className="addPlantForm" onSubmit={this.handleSubmit}>
          <label>
            Plant Name:
            <input id="nameInput" className="inputs" name='plantname' type="text" value={this.state.plantname} onChange={this.handleChange} />
          </label>
          <label>
            Species:
            <input id="speciesInput" className="inputs" name='species'type="text" value={this.state.species} onChange={this.handleChange} />
          </label>
          <label>
            Price:
            <input id="priceInput" className="inputs" name='price'type="text" value={this.state.price} onChange={this.handleChange} />
          </label>
          <input type="submit" className="addPlantSubmit" value="Add Plant"/>
        </form>
        </div>
      </div>
    );
  }
}


export default withRouter(Profile);