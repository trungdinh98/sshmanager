import React, { Component } from 'react';
import Home from './resources/Home';
import About from './resources/About';
import Dashboard from './resources/Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component{
   render(){
      return(
        <Router>
            <div>
                <h1>Welcome to SSH Manager</h1>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                </ul>

                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/about">
                    <About />
                  </Route>
                  <Route path="/dashboard">
                    <Dashboard />
                  </Route>
                </Switch>
            </div>
        </Router>
      );
   }
}
export default App;
