var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import Banner from './banner.js';
import Sidebar from './sidebar.js';
import { STUDENT } from './globals.js';

var Template = function (_Component) {
  _inherits(Template, _Component);

  function Template(props) {
    _classCallCheck(this, Template);

    return _possibleConstructorReturn(this, (Template.__proto__ || Object.getPrototypeOf(Template)).call(this, props));
  }

  _createClass(Template, [{
    key: 'render',
    value: function render() {
      var userType = this.props.userType;

      return React.createElement(
        'div',
        { id: 'appContainer', className: 'd-flex flex-column' },
        React.createElement(Banner, { userType: userType }),
        React.createElement(
          'div',
          { id: 'pageContentRow', className: 'd-flex align-items-stretch flex-grow-1' },
          React.createElement(Sidebar, { userType: userType }),
          React.createElement(
            'div',
            { id: 'pageContentWrapper', className: 'flex-grow-1' },
            React.createElement(
              'div',
              { id: 'pageContent' },
              this.props.children
            ),
            React.createElement('div', { id: 'pageContentShadow' })
          )
        ),
        React.createElement('div', { id: 'footer' })
      );
    }
  }]);

  return Template;
}(Component);

export default Template;