import React, {Component} from 'react';

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


const Word = props => <p>{ReactHtmlParser(props.word)}</p>

export default Word;
