import React from 'react';
import ReactDOM from 'react-dom';
import { STUDENT } from './globals.js';
import WelcomeScreen from './welcomeScreen.js';

var rootElem = React.createElement(WelcomeScreen, null);
ReactDOM.render(rootElem, document.getElementById('root'));