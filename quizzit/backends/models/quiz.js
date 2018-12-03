const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { CourseSchema, User } = require('./user.js');

const QuestionSchema = new Schema({
    title: String,
    description: Number,
    choices: [String],
    correct_index: Number,
});

// Reservations will be embedded in the Restaurant model
const QuizSchema = new Schema({
    title: String,
    course: {
      type: String,
      ref: 'Course',
      required: true
    },
    series: Number,
    description: String,
    questions: [QuestionSchema],
    active: Boolean
});

const NotificationSchema = new Schema({
  type: {
    type: String,
    required: false
  },
  target: {
    type: String,
    ref: 'User',
    required: true
  },
  quiz: QuizSchema
})

const Quiz = mongoose.model('Quiz', QuizSchema);
const UserNotification = mongoose.model('Notification', NotificationSchema);

module.exports = { QuizSchema, Quiz, UserNotification };
