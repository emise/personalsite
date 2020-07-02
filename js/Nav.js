import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import Home from "./Home";
import About from "./About";
import Photos from "./Photos";
import Words from "./Words";

class Nav extends Component {
  render() {
    return (
      <Router>
        <div class="nav">
          <NavLink className="navlink" activeClassName="activeNavlink" to="/">
            <h2>Home</h2>
          </NavLink>
          <NavLink className="navlink" activeClassName="activeNavlink"  to="/who">
            <h2>Who</h2>
          </NavLink>
          <NavLink className="navlink" activeClassName="activeNavlink"  to="/photos">
            <h2>Photos</h2>
          </NavLink>
          <NavLink className="navlink" activeClassName="activeNavlink"  to="/words">
            <h2>Words</h2>
          </NavLink>
        </div>

        <Switch>
          <Route path="/who" component={About} />
          <Route path="/photos">
            <Photos />
          </Route>
          <Route path="/words">
            <Words />
          </Route>
          {/* If none of the previous routes render anything,
            this route acts as a fallback.

            Important: A route with path="/" will *always* match
            the URL because all URLs begin with a /. So that's
            why we put this one last of all */}
          <Route path="/" component={Home} />
        </Switch>

      </Router>
    ); 
  } 
} 

export default Nav;
