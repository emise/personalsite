import React, { Component } from 'react';

import { AllWords } from './allWords';
import Word from './Word';

class Home extends Component {
  render() {
    return (
      <div>
        <Word word={AllWords[0].htmlText}/>
      </div>
    ); 
  } 
} 

export default Home;
