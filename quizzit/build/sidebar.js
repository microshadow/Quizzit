var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import { STUDENT, EDUCATOR, ADMIN, createVerticalDivider } from './globals.js';

var Sidebar = function (_Component) {
  _inherits(Sidebar, _Component);

  function Sidebar(props) {
    _classCallCheck(this, Sidebar);

    var _this = _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));

    _this.getMyCourses = _this.getMyCourses.bind(_this);
    _this.constructCourseMenu = _this.constructCourseMenu.bind(_this);
    _this.getCourseDropdownLinks = _this.getCourseDropdownLinks.bind(_this);
    _this.getCourseListComponent = _this.getCourseListComponent.bind(_this);
    return _this;
  }

  _createClass(Sidebar, [{
    key: 'getMyCourses',
    value: function getMyCourses() {
      return [{
        "name": "CSC309",
        "quiz": null
      }, {
        "name": "CSC302",
        "quiz": null
      }, {
        "name": "CSC367",
        "quiz": "#"
      }];
    }
  }, {
    key: 'getCourseDropdownLinks',
    value: function getCourseDropdownLinks(course) {
      if (this.props.userType === STUDENT) {
        var links = [{
          "text": "View History",
          "href": "#"
        }];

        if (course.quiz != null) {
          links.push({
            "text": "Take Quiz",
            "href": course.quiz
          });
        }

        return links;
      } else if (this.props.userType === EDUCATOR) {
        var firstOp = {};
        if (course.quiz != null) {
          firstOp["text"] = "View Quiz";
          firstOp["href"] = course.quiz;
        } else {
          firstOp["text"] = "Create Quiz";
          firstOp["href"] = "#";
        }

        return [firstOp, {
          "text": "View History",
          "href": "#"
        }, {
          "text": "Enrolment",
          "href": "#"
        }];
      } else if (this.props.userType === ADMIN) {
        return [{
          "text": "Edit Staff",
          "href": "#"
        }, {
          "text": "View History",
          "href": "#"
        }, {
          "text": "Enrolment",
          "href": "#"
        }];
      }
    }
  }, {
    key: 'constructCourseMenu',
    value: function constructCourseMenu(course, parentID) {
      var controllerID = course.name + 'Ctrl';
      var targetID = course.name + 'Menu';
      var targetSelector = '#' + targetID;
      var parentSelector = '#' + parentID;

      var linkMeta = this.getCourseDropdownLinks(course);

      var createLink = function createLink(linkInfo) {
        return React.createElement(
          'li',
          null,
          React.createElement(
            'a',
            { href: linkInfo.href },
            React.createElement(
              'div',
              { className: 'qButton' },
              linkInfo.text
            )
          )
        );
      };
      var linkComponents = linkMeta.map(createLink);

      return React.createElement(
        'div',
        { id: controllerID, className: 'courseControl' },
        React.createElement(
          'div',
          { 'class': 'qButton courseLabel textshadow', type: 'button',
            'data-toggle': 'collapse', 'data-target': targetSelector,
            'aria-expanded': 'true', 'aria-controls': targetID
          },
          course.name
        ),
        React.createElement(
          'div',
          { id: targetID, 'class': 'courseMenu collapse',
            'aria-labelledby': controllerID, 'data-parent': parentSelector
          },
          React.createElement(
            'ul',
            null,
            linkComponents
          )
        )
      );
    }
  }, {
    key: 'getCourseListComponent',
    value: function getCourseListComponent() {
      var _this2 = this;

      var courses = this.getMyCourses();
      var parentID = "coursesMenu";

      var linkComponents = courses.map(function (course) {
        return _this2.constructCourseMenu(course, parentID);
      });

      console.log(linkComponents);
      return linkComponents;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { id: 'sidebarContainer', className: 'd-flex align-items-stretch' },
        createVerticalDivider(8, "detail-dark"),
        React.createElement(
          'div',
          { id: 'sidebar' },
          React.createElement(
            'div',
            { id: 'coursesMenu' },
            React.createElement(
              'div',
              { id: 'coursesHeader', className: 'textshadow' },
              'Courses'
            ),
            React.createElement(
              'div',
              { className: 'courseList accordion' },
              this.getCourseListComponent()
            )
          )
        )
      );
    }
  }]);

  return Sidebar;
}(Component);

export default Sidebar;