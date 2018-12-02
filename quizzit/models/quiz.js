const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    title: String,
    description: Number,
    choices: [String],
    correct_index: Number,
});

// Reservations will be embedded in the Restaurant model
const QuizSchema = new mongoose.Schema({
    title: String,
    description: String,
    questions: [QuestionSchema]
});

const Quiz = mongoose.model('Quiz', QuizSchema);


module.exports = { Quiz };
