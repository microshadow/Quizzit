This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

# API specification
DAO pattern
class backend (usage: e.g. backend.create_quiz) -- Jonathan
# Create Quiz API -- Jonathan
POST:
  create_quiz(title, course_code, description) => quiz object
  create_question(quiz_id, question_title, choices_array, correct_choice) => quiz object
  // use express-ws to notify students in realtime
  start_quiz(quiz_id) => quiz object # students can see the quiz after that
  end_quiz(quiz_id) => quiz object # will become unavailable for students

# Do Quiz API -- Jonathan
POST:
  answer_question(quiz_id, question_id, answer_choice) => returns if correct
  next_question(quiz_id, question_id) => returns next question object

# Course API -- Jonathan
POST:
  create_course(title, teacher_id) => course object
  add_student(course_id, username) => course object
  remove_student(course_id, username) => course object
DELETE:
  remove_course(course_id) => success code

# Auth API using Express and Passport.js -- Alex
login(username, password) => returns JWT token, and user_type
register(username, password, user_type) => returns JWT token, and user_type
logout(JTW) => returns success code

# Dashboard/Data API # when you click open dashboard button or when you login or click refresh button -- Alex
GET:
  get_notification(user_id) => returns notifications //define model somewhere
  get_quiz_results(quiz_id, user_id) => returns all completed questions
  get_quiz_class_results(quiz_id) => returns all completed questions
  get_quiz(quiz_id) => returns quiz object

## Model Specifications
Completed question: question_id, chosen_answer, correct_answer
Quiz: list of questions, title

### Notifications:
{
  type: event | report   // Notification type: ongoing event or finished event report.
  id: id                 // Auto-generated ID field
  data: {
    subject: string,     // Course code
    series: 2,           // Quiz number
    title: string,       // Quiz title
    description: string  // Quiz description (may be null or omitted?)
    other: {
      ...                // Additional data for the notification, see dashboard.js
    }
  }
}

### Quiz Answers:
{
  id: id                 // Auto-generated ID field
  display: string        // Short display for answer, e.g. (a)
  text: string           // The full text describing the answer
}

### Quiz Questions:
{
  id: id                 // Auto-generated ID field
  display: string        // Short display for question, e.g. Q1
  text: string           // The full question being asked
  weight: number         // How many marks the question is worth
                            // (we may just auto-set to 1 and ignore)
  correct: [index]       // List of correct answer indices
  options: [answer]      // List of answer objects
}

### Quiz:
{
  id: id                 // Auto-generated ID field
  subject: string        // Course in which the quiz is involved, e.g. SNC1D3
  series: number         // Quiz number: n if this is the n'th quiz in the course
  title: string          // Quiz title
  description: string    // Quiz description (may be null or omitted?)
  questions: [question]  // List of quiz questions
}

### Student:
{
  id: id                 // Auto-generated in-database student ID
  first: string          // First name
  last: string           // Last name
  passHash: string       // bcrypt'ed password for authentication
  userType: S | E | A    // S for student, E for educator, A for admin
  courses: [courseId]    // List of IDs of courses enrolled in
}

### Performance:
// Report of a student's performance on a quiz.
{
  id: id,                // Auto-generate ID field
  quizId: id,            // ID of the quiz being reported
  student: {             // Pull out ID, first and last name from student object
    id: id,
    first: string,
    last: string
  },
  performance: {
    grade: number,       // Grade earned on quiz
    classAverage: number // Class average for the whole quiz.
    answers: [
    {
      qId: id            // Id of the question being answered
      choice: index      // The index of the answer selected by the student,
                            // omitted or set null if the student did not answer.
      classAverage: number  // Percent of students in the class who got a right answer.
    }
  ]
}
