import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Template from './mainTemplate.js';
import { STUDENT } from './globals.js';

const rootElem = (
  <Template userType={STUDENT}/>
);
ReactDOM.render(rootElem, document.getElementById('root'));
