import React from 'react';
import { Switch, Route } from 'react-router-dom';
import User from './User.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Profile from './Profile.jsx'
import '../stylesheets/styles.css';

const App = () => {
  return (
    <div className="router">
      <h1 id="headerTitle">PlantHub</h1>
      <main>
        <Switch>
          <Route
            exact
            path ="/"
            component={Login}
          />
          <Route 
            exact
            path="/main"
            component={User}
          />
          <Route
            exact
            path ="/signup"
            component={SignUp}
          />
          <Route
            exact
            path ="/profile"
            component={Profile}
          />
        </Switch>
      </main>
    
    </div>
  );
};

export default App;