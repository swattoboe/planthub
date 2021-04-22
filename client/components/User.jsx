import React, { Component } from 'react';
import UserCard from './UserCard.jsx';
import { withRouter, Link } from 'react-router-dom';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedUsers : false,
      users: [],
    };
  }

  componentDidMount(){
    fetch('/api/')
      .then(res => res.json())
      .then((users)  => {
        // console.log(users);
        if(!Array.isArray(users))
          users = [];
        return this.setState({
          users,
          fetchedUsers : true
        });
      })
      .catch(err => console.log(`Error in componentDidMount fetching users: ${err}`));
  }

  render() {
    console.log(this.props.history)
    if (!this.state.fetchedUsers) return (
      <div>
        <h1>We appreciate your patience while data is loading...</h1>
      </div>
    );
    const { users } = this.state;

    if (!users) return null;

    if (!users.length) return (
      <div>Shockingly, there is no available user data</div>
    );

    const userData = users.map((user, i) => {
      return (
        <UserCard 
          key={`user${i}`}
          id={i}
          info={user}
        />
      );
    });
    
    return(
      <section className="mainSection">
        <header className="mainHeader">
          <Link className="profileLink" to={{
            pathname:'/profile',
            state: {
              username: this.props.history.location.state.username,
              password: this.props.history.location.state.password
            }
            }}>Profile</Link>
          <h2>Welcome to PlantHub!</h2>
          <h3>Current Sellers</h3>
        </header>
        <div className="userContainer">
          { userData }
        </div>
      </section>
    );
  }
}

export default withRouter(User);