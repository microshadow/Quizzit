import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Template from './mainTemplate.js';
import { STUDENT } from './globals.js';

ReactDOM.render(<Template userType={STUDENT}/>, document.getElementById('root'));
