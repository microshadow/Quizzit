const log = console.log;
const express = require("express");
const mongoose = require("mongoose");
const assert = require("assert");

const app = express();
const url = "mongodb://localhost:27017/classquiz";
// connection to database
mongoose.connect("mongodb://localhost:27017/classquiz", { useNewUrlParser: true });

// create schema, try to store data in an array
//const questionIdArray = [];
const classQuizSchema = new mongoose.Schema({
    questionId: Number,
    correctAnswers:Number
});

// create model
const classQuiz1 = mongoose.model("classQuiz1", classQuizSchema);
const classQuiz2 = mongoose.model("classQuiz2", classQuizSchema);
const classQuiz3 = mongoose.model("classQuiz3", classQuizSchema);

// insert document for in-class quiz#1
const question1 = new classQuiz1({
    questionId:1,
    correctAnswers: 72
});

const question2 = new classQuiz1({
    questionId:2,
    correctAnswers: 70
});

const question3 = new classQuiz1({
    questionId:3,
    correctAnswers: 80
});

const question4 = new classQuiz1({
    questionId:4,
    correctAnswers: 23
});

const question5 = new classQuiz1({
    questionId:5,
    correctAnswers: 54
});
/****************************************/
// insert documents for in-class quiz#2
const question6 = new classQuiz2({
    questionId:1,
    correctAnswers: 78
});

const question7 = new classQuiz2({
    questionId:2,
    correctAnswers: 80
});

const question8 = new classQuiz2({
    questionId:3,
    correctAnswers: 54
});

const question9 = new classQuiz2({
    questionId:4,
    correctAnswers: 61
});

const question10 = new classQuiz2({
    questionId:5,
    correctAnswers: 19
});

/********************************************************/
// insert document for in-class quiz#3
// there is no need to hard code too much data to test, create just 3 quizzes to test functionality.
const question11 = new classQuiz3({
    questionId:1,
    correctAnswers: 66
});

const question12 = new classQuiz3({
    questionId:2,
    correctAnswers: 55
});

const question13 = new classQuiz3({
    questionId:3,
    correctAnswers: 44
});

const question14 = new classQuiz3({
    questionId:4,
    correctAnswers: 69
});

const question15 = new classQuiz3({
    questionId:5,
    correctAnswers: 70
});

// classQuiz1.insertMany([question1,question2,question3,question4, question5], err => {
//     if(err){
//         log(err);
//     }else {
//         log("data inserted");
//     }
// });

// classQuiz2.insertMany([question6,question7,question8,question9, question10], err => {
//     if(err){
//         log(err);
//     }else {
//         log("data inserted");
//     }
// });

// classQuiz3.insertMany([question11,question12,question13,question14, question15], err => {
//     if(err){
//         log(err);
//     }else {
//         log("data inserted");
//     }
// });

// app.get(url, (req, res) => {
//     classQuiz1.find({}, (err, result) => {
//         if(err){
//             log(err)
//         }else {
//             log(result);
//         }
//     });
//
//     //res.sendFile(__dirname + "")
// });

// retrieve every correct answers for each question as an array!
 var temp = [];
classQuiz1.find({}, (err, result) => {
    if(err){
        log(err);
    }else {
        //log(result);
        result.forEach(document => {
            //assert.equal(null,err);
            temp.push(document.correctAnswers);
        });
        log(temp);  // correct result here, 2nd print out
        return temp;
    }
});
//log(temp); // incorrect here, 1st print out, empty array

//app.listen(3000,()=>{log("listening on port 3000...")});
module.exports = {classQuiz1, classQuiz2, classQuiz3, mongoose};