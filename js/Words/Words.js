import React, { Component } from 'react';
import {
  Switch,
  Route,
  NavLink,
  withRouter
} from 'react-router-dom';

import { AllWords } from '../documents/allWords';
import Word from './Word';

class Words extends Component {
  render() {
    const titleArray = AllWords.map((item, i) =>
      <NavLink
        key={`${i}-${item.title.replace(/ /g, "_")}`}
        className="word-item link"
        activeClassName="active-word-item"
        to={`${this.props.match.path}/${item.title.replace(/ /g, "_")}`}
      >
        {item.title}
      </NavLink>
    );

    const switchArray = AllWords.map((item, i) => {
      return <Route
        key={`${i}-switch-${item.title.replace(/ /g, "_")}`}
        path={`${this.props.match.path}/${item.title.replace(/ /g, "_")}`}
        component={() => <Word word={item.htmlText} />}
      />
    }
    );

    return (
      <div>
        <div>
          <Switch>
            {switchArray}
          </Switch>
        </div>
        <div className="word-box">
          {titleArray}
        </div>
      </div>
    ); 
  } 
} 

export default withRouter(Words);
