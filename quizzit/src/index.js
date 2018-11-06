import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from './dashboard.js';
import { STUDENT } from './globals.js';

const rootElem = (
  <Dashboard userType={STUDENT}/>
);
ReactDOM.render(rootElem, document.getElementById('root'));
