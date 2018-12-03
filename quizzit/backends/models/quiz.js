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
    description: Number,
    weight: Number,
    correct: {
      type: ObjectID,
      ref: 'QuestionOption',
      required: true
    },
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

const NotificationSchema = new Schema({
  type: {
    type: String,
    required: false
  },
  target: {
    type: ObjectID,
    ref: 'User',
    required: true
  },
  quiz: QuizSchema
})

const Quiz = mongoose.model('Quiz', QuizSchema);
const QuestionOption = mongoose.model('QuestionOption', QuestionOptionSchema);
const UserNotification = mongoose.model('Notification', NotificationSchema);

module.exports = { QuizSchema, Quiz, UserNotification };
