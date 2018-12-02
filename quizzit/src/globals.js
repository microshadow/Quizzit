import React from 'react';

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
quiz_data.data = [
  {
      title: "Quiz 1 - historical battles",
      questions: [
          {
              question: "Where was the battle of Culloden?",
              choices: ["England", "Scottland", "Canada", "USA"],
              correct_index: 1,
          },
          {
              question: "When was the battle of the Somme?",
              choices: ["1916", "2001", "1943", "1945"],
              correct_index: 0,
          },
      ]
  },
  {
      title: "Quiz 2 - famous people",
      questions: [
          {
              question: "Who invented the induction motor?",
              choices: ["Nikola Tesla", "Elon Musk", "Thomas Edison", "Bill Gates"],
              correct_index: 0,
          },
          {
              question: "Who was the 40th president of the US?",
              choices: ["Donald Trump", "Barack Obama", "Ronald Reagan", "Jimmy Carter"],
              correct_index: 2,
          },
      ]
  }
]

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

const STUDENT  = "S";
const EDUCATOR = "T";
const ADMIN    = "A";

function translateUserType(user) {
  if (user === STUDENT) {
    return "Student";
  } else if (user === EDUCATOR) {
    return "Teacher";
  } else if (user === ADMIN) {
    return "Admin";
  }
}

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
  STUDENT,
  EDUCATOR,
  ADMIN,
  translateUserType as userType,
  createHorizontalDivider,
  createVerticalDivider,
  toPercent,
  nRange
};
