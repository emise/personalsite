import React, { Component } from 'react';

import { AllWords } from './documents/allWords';
import Word from './Words/Word';

class Home extends Component {
  render() {
    return (
      <div>
        <Word word={AllWords[6].htmlText}/>
      </div>
    ); 
  } 
} 

export default Home;
