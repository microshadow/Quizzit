# team53
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
# Create Quiz API
POST:
  create_quiz(title, course_code, description) => quiz object
  create_question(quiz_id, question_title, choices_array, correct_choice) => quiz object
  // use express-ws to notify students in realtime
  start_quiz(quiz_id) => quiz object # students can see the quiz after that
  end_quiz(quiz_id) => quiz object # will become unavailable for students

# Do Quiz API
POST:
  answer_question(quiz_id, question_id, answer_choice) => returns if correct
  next_question(quiz_id, question_id) => returns next question object

# Course API
POST:
  create_course(title, teacher_id) => course object
  add_student(course_id, username) => course object
  remove_student(course_id, username) => course object
DELETE:
  remove_course(course_id) => success code

# Auth API using Express and Passport.js
login(username, password) => returns JWT token, and user_type
register(username, password, user_type) => returns JWT token, and user_type
logout(JTW) => returns success code

# Dashboard/Data API # when you click open dashboard button or when you login or click refresh button
GET:
  get_notification(user_id) => returns notifications //define model somewhere
  get_quiz_results(quiz_id, user_id) => returns all completed questions
  get_quiz_class_results(quiz_id) => returns all completed questions
  get_quiz(quiz_id) => returns quiz object

# Models
Completed question: question_id, chosen_answer, correct_answer
Quiz: list of questions, title
