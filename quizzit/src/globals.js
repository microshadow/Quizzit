import React from 'react';
import axios from 'axios';

function QuizData() {
  Object.defineProperty(this, 'data', {
    get: function() {
      return quiz_data;
    },
    set: function(value) {
      quiz_data = value;
    }
  });
}
var quiz_data = new QuizData();
quiz_data.data = [];

function ScoreData() {
  Object.defineProperty(this, 'data', {
    get: function() {
      return score_data;
    },
    set: function(value) {
      score_data = value;
    }
  });
}
var score_data = new ScoreData();
score_data.data = []

function CourseData() {
  Object.defineProperty(this, 'data', {
    get: function() {
      return course_data;
    },
    set: function(value) {
      course_data = value;
    }
  });
}
var course_data = new CourseData();
course_data.data = []

const STUDENT  = "S";
const EDUCATOR = "T";
const ADMIN    = "A";

axios.defaults.baseURL = "http://localhost:8000";

function registerAuthToken(token, user) {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
  axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
}

function getAuthorizedUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function trashAuthToken() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  delete axios.defaults.headers.common['Authorization'];
}

// Automatically try to load in JWT token from a previous session, without
// polluting the namespace.
(function reloadAuthHeaders() {
  const token = localStorage.getItem("token");

  if (token) {
    axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
  }
})();

function createHorizontalDivider(height, color) {
  const colorVar = `var(--${color})`;
  return (
    <div className="horDivider"
         style={{backgroundColor: colorVar, height: height}}>
    </div>
  )
}

function createVerticalDivider(width, color) {
  const colorVar = `var(--${color})`;
  return (
    <div className="vertDivider"
         style={{backgroundColor: colorVar, width: width}}>
    </div>
  )
}

function nRange(n) {
  return [...Array(n).keys()];
}

function toPercent(num, digits) {
  return `${num.toFixed(digits)}%`;
}

export {
  quiz_data,
  score_data,
  course_data,
  STUDENT,
  EDUCATOR,
  ADMIN,
  registerAuthToken,
  getAuthorizedUser,
  trashAuthToken,
  createHorizontalDivider,
  createVerticalDivider,
  toPercent,
  nRange
};
