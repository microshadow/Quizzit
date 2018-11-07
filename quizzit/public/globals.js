var STUDENT = "S";
var EDUCATOR = "T";
var ADMIN = "A";

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
  var colorVar = "var(--" + color + ")";
  return React.createElement("div", { className: "horDivider",
    style: { backgroundColor: colorVar, height: height } });
}

function createVerticalDivider(width, color) {
  var colorVar = "var(--" + color + ")";
  return React.createElement("div", { className: "vertDivider",
    style: { backgroundColor: colorVar, width: width } });
}

module.exports = {
  STUDENT: STUDENT,
  EDUCATOR: EDUCATOR,
  ADMIN: ADMIN,
  userType: translateUserType,
  createHorizontalDivider: createHorizontalDivider,
  createVerticalDivider: createVerticalDivider
};