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

module.exports = {
  STUDENT: STUDENT,
  EDUCATOR: EDUCATOR,
  ADMIN: ADMIN,
  userType: translateUserType
};
