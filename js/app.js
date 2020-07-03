import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import Base from './Base';

const routes = <Router><Base /></Router>

render(routes, document.getElementById('app-root'));
