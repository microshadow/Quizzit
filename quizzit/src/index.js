import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { STUDENT } from './globals.js';
import Router from './router.js';
import './style/index.css';

const rootElem = (
  <Router />
);
ReactDOM.render(rootElem, document.getElementById('root'));