const log = console.log;
const mongoose = require("mongoose");

// connection to database
mongoose.connect("mongodb://localhost:27017/quizmark", { useNewUrlParser: true });

// create schema
const quizMarkSchema = new mongoose.Schema({
    quizID:Number,
    mark:Number  // out of 10
});

// create models
const quiz = mongoose.model("quiz", quizMarkSchema);

const quiz1 = new quiz({
    quizID: 1,
    mark: 8
});

const quiz2 = new quiz({
    quizID: 2,
    mark: 9
});

const quiz3 = new quiz({
    quizID: 3,
    mark: 7
});

const quiz4 = new quiz({
    quizID: 4,
    mark: 4
});

const quiz5 = new quiz({
    quizID: 5,
    mark: 9
});

const quiz6 = new quiz({
    quizID: 6,
    mark: 10
});

const quiz7 = new quiz({
    quizID: 7,
    mark: 10
});

const quiz8 = new quiz({
    quizID: 8,
    mark: 8
});

const quiz9 = new quiz({
    quizID: 9,
    mark: 9
});

const quiz10 = new quiz({
    quizID: 10,
    mark: 10
});

const quizArray = [quiz1,quiz2,quiz3,quiz4,quiz5,quiz6,quiz7,quiz8,quiz9,quiz10];
quiz.insertMany(quizArray, err => {
    if(err){
        log(err);
    }else {
        log("quiz data insert successfully")
    }
});

