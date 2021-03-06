const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/courses", {useNewUrlParser:true});

const Schema = mongoose.Schema;
const ObjectID = Schema.Types.ObjectId;

const QuestionOptionSchema = new Schema({
  display: { type: String, required: true },
  text: { type: String, required: true },
  chosenBy: Number
});

const QuestionSchema = new Schema({
  display: String,
  text: String,
  weight: Number,
  correct_index: Number,
  choices: [String],
  classAverage: Number,
  correct: [ { type: ObjectID, ref: 'Option' } ],
  options: [ { type: ObjectID, ref: 'Option' } ]
});

const QuizSchema = new Schema({
  title: String,
  course: { type: ObjectID, ref: 'Course', required: true },
  series: Number,
  weight: Number,
  description: String,
  questions: [ { type: ObjectID, ref: 'Question' } ],
  participants: [ { type: ObjectID, ref: 'User' } ],
  active: Boolean,
  classAverage: Number
});

const UserAnswerSchema = new Schema({
  student: { type: ObjectID, ref: 'User', required: true },
  question: { type: ObjectID, ref: 'Question', required: true },
  choice: { type: ObjectID, ref: 'Option', required: true },
  score: Number
})

const NotificationSchema = new Schema({
  type: { type: String, required: false },
  target: { type: ObjectID, ref: 'Course', required: true },
  quiz: { type: ObjectID, ref: 'Quiz' }
})

const Quiz = mongoose.model('Quiz', QuizSchema);
const Question = mongoose.model('Question', QuestionSchema);
const QuestionOption = mongoose.model('Option', QuestionOptionSchema);
const Answer = mongoose.model('Answer', UserAnswerSchema);
const UserNotification = mongoose.model('Notification', NotificationSchema);

module.exports = { Question, QuestionSchema, QuestionOption,
                   QuizSchema, Quiz, Answer, UserNotification };
