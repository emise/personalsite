import React, { Component } from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import ScrollToTop from "./utils/ScrollToTop";
import Nav from './Nav';
import Home from "./Home";
import About from "./About";
import Photos from "./Photos/Photos";
import Words from "./Words/Words";

class Base extends Component {
  render() {
    return (
      <div>
        <ScrollToTop />
        <div className="wrapper">
          <div className="wrapper-inner">
            <h1>angela liu</h1>
            <Nav />
            <div className="content-padding">
              <Switch>
                <Route path="/who" component={About} />
                <Route path="/photos" component={Photos} />
                <Route path="/words" component={Words} />
                <Route path="/" exact component={Home} />
              </Switch>
            </div>
          </div>
        </div>
        <div className="text-center footer">
          Copyright &copy; Angela Liu. All Rights Reserved.
        </div>
      </div>
    ); 
  } 
} 

export default Base;
