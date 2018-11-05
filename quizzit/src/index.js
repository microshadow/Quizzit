import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Banner from './banner.js';
import { STUDENT } from './globals.js';

ReactDOM.render(<Banner userType={STUDENT}/>, document.getElementById('root'));
