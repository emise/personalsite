import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  toggleMenu = (menuState) => {
    this.setState({ expanded: menuState === null ? !this.state.expanded : menuState});
  }

  render() {
    const { expanded } = this.state;

    const menuItems = (
      <div className="nav">
        <NavLink
          className="navlink"
          activeClassName="active-navlink"
          exact
          to="/"
          onClick={() => this.toggleMenu(false)}
        >
          <h2>Home</h2>
        </NavLink>
        <NavLink
          className="navlink"
          activeClassName="active-navlink"
          to="/who"
          onClick={() => this.toggleMenu(false)}
        >
          <h2>Who</h2>
        </NavLink>
        <NavLink
          className="navlink"
          activeClassName="active-navlink" 
          to="/photos"
          onClick={() => this.toggleMenu(false)}
        >
          <h2>Photos</h2>
        </NavLink>
        <NavLink
          className="navlink"
          activeClassName="active-navlink"
          to="/words"
          onClick={() => this.toggleMenu(false)}
        >
          <h2>Words</h2>
        </NavLink>
      </div>
      )

    return (
      <div className="nav-container">
        <MediaQuery maxWidth={768}>
          <div className="nav-icon" onClick={() => this.toggleMenu(null)}>
            <FontAwesomeIcon icon={expanded ? faTimes : faBars} />
          </div>
          {expanded ? menuItems : null}
        </MediaQuery>
        <MediaQuery minWidth={769}>
          {menuItems}
        </MediaQuery>
      </div>
    ); 
  } 
} 

export default Nav;
