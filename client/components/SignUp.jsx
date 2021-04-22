import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      name: '',
      email: '',
      location: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(this.state)
    })
      .then( res => res.json())
      .then(data => {
        if (data.username === this.state.username){
          console.log(data);
          this.setState({
            redirect: true
          });    
        }
      })
      .catch(err => console.log('Login error:' + err));
  }

  render(){
    if(this.state.redirect === true)
      return <Redirect to="/main" />;

    return (
      <div>
        <h1>Signup</h1>
        <form  onSubmit={this.handleSubmit}>
          <div>
            <label>
          Username:
              <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
            </label>
          </div>
          <div>
            <label>
          Password:
              <input  name="password" type="password" value={this.state.password} onChange={this.handleChange} />
            </label>
          </div>
          <div>
            <label>
          Name:
              <input name="name" type="text" value={this.state.name} onChange={this.handleChange}/>
            </label>
          </div>
          <div>
            <label>
          Email:
              <input name="email" type="email" value={this.state.email} onChange={this.handleChange}/>
            </label>
          </div>
          <div>
            <label>
          Location:
              <input name="location" type="text" value={this.state.location} onChange={this.handleChange}/>
            </label>
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
     
    );
  }
}

export default withRouter(SignUp);