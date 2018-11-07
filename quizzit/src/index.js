import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//import Dashboard from './dashboard.js';
import { STUDENT } from './globals.js';
import WelcomeScreen from './welcomeScreen.js';

const rootElem = (
  <WelcomeScreen />
);
ReactDOM.render(rootElem, document.getElementById('root'));
