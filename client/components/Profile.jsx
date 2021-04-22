import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: '',
      fetchedUser: false,
      plantname: '',
      planttype: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount(){
    console.log('Mount' + this.props.history.location.state.username);
    fetch(`/profile/user?username=${this.props.history.location.state.username}`)
      .then(res => res.json())
      .then((user)  => {
        console.log(user);
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
    console.log(this.props.history);
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
    fetch('/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Applicaton/JSON'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
  }

  render() {
    if (!this.state.fetchedUser) return (
      <div>
        <h1>We appreciate your patience while data is loading...</h1>
      </div>
    );
    // 
    // if (!user) return null;
    return (
      <div>
        <header>
          <h1 className="profileUsername">{this.state.username}</h1>
        </header>
        <div>
          <h2>{this.state.name}</h2>
          <h2>{this.state.email}</h2>
          <h2>{this.state.location}</h2>
        </div>
        <form>
          <label>
            Plant Name
            <input name='plantname' type="text" value={this.state.plantname} onChange={this.handleChange} />
          </label>
          <label>
            Plant Type
            <input name='planttype'type="text" value={this.state.planttype} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Add Plant"/>
        </form>
      </div>
    );
  }
}


export default withRouter(Profile);