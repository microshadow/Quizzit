import React from 'react';
import ReactDOM from 'react-dom';

import Template from './mainTemplate.js';
import ProgressBar from './progressBar.js';
import { STUDENT } from './globals.js';

var rootElem = React.createElement(
  Template,
  { userType: STUDENT },
  React.createElement(
    ProgressBar,
    { percent: 97.57 },
    'Class Average'
  )
);
ReactDOM.render(rootElem, document.getElementById('root'));