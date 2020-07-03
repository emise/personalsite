import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <NavLink className="navlink" activeClassName="activeNavlink" exact to="/">
          <h2>Home</h2>
        </NavLink>
        <NavLink className="navlink" activeClassName="activeNavlink" to="/who">
          <h2>Who</h2>
        </NavLink>
        <NavLink className="navlink" activeClassName="activeNavlink" to="/photos">
          <h2>Photos</h2>
        </NavLink>
        <NavLink className="navlink" activeClassName="activeNavlink" exact to="/words">
          <h2>Words</h2>
        </NavLink>
      </div>
    ); 
  } 
} 

export default Nav;
