import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Router from './router.js';
import './style/index.css';

const rootElem = (
  <Router />
);
ReactDOM.render(rootElem, document.getElementById('root'));
