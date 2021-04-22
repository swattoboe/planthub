import React, { Component } from 'react';
// import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';


class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: false
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
    console.log('User data:', this.state);
    event.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(this.state)
    })
      .then( res => res.json())
      .then(data => {
        if (data.username === this.state.username){
          this.setState({
            ...this.state,
            redirect: true
          });    
        }
      })
      .catch(err => console.log('Login error:' + err));
  }

  render(){
    if(this.state.redirect === true){

     return <Redirect to={{
        pathname: '/main',
        state: {
         username: this.state.username,
         password: this.state.password
        }
      }} />;
    }
 

    return (
      <div>
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
            <input type="submit" value="Submit" />
          </div>
        </form>
        No account? 
        <Link to="/signup">Sign up!</Link>
      </div>

    );
  }
}

export default withRouter(LoginForm);