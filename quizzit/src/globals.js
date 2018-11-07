import React from 'react';

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

export {
  STUDENT,
  EDUCATOR,
  ADMIN,
  translateUserType as userType,
  createHorizontalDivider,
  createVerticalDivider
};
