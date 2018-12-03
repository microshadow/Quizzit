const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectID = Schema.Types.ObjectId;
const { CourseSchema, User } = require('./user.js');


const QuestionOptionSchema = new Schema({
  display: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const QuestionSchema = new Schema({
    display: String,
    text: String,
    weight: Number,
    correct: [QuestionOptionSchema],
    options: [QuestionOptionSchema],
});

// Reservations will be embedded in the Restaurant model
const QuizSchema = new Schema({
    title: String,
    course: {
      type: ObjectID,
      ref: 'Course',
      required: true
    },
    series: Number,
    description: String,
    questions: [QuestionSchema],
    active: Boolean
});

const UserAnswerSchema = new Schema({
  student: {
    type: ObjectID,
    ref: 'User',
    required: true
  },
  question: {
    type: ObjectID,
    ref: 'Question',
    required: true
  },
  choice: {
    type: ObjectID,
    ref: 'Option',
    required: true
  }
})

const NotificationSchema = new Schema({
  type: {
    type: String,
    required: false
  },
  target: {
    type: ObjectID,
    ref: 'Course',
    required: true
  },
  quiz: QuizSchema
})

const Quiz = mongoose.model('Quiz', QuizSchema);
const Question = mongoose.model('Question', QuestionSchema);
const QuestionOption = mongoose.model('Option', QuestionOptionSchema);
const Answer = mongoose.model('Answer', UserAnswerSchema);
const UserNotification = mongoose.model('Notification', NotificationSchema);

module.exports = { Question, QuestionSchema, QuestionOption,
                   QuizSchema, Quiz, Answer, UserNotification };
