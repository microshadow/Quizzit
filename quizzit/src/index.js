import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { STUDENT } from './globals.js';
import Router from './router.js';

const rootElem = (
  <Router />
);
ReactDOM.render(rootElem, document.getElementById('root'));