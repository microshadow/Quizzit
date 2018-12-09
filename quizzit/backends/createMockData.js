
const log = console.log;

const createMockData = () => {

    const mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost:27017/courses", {useNewUrlParser:true});

    const schemas = require('./models/user');
    const schemas2 = require('./models/quiz');

    // create models
    const course = mongoose.model("course", schemas.courseSchema);
    const user = mongoose.model("user", schemas.userSchema);
    const quiz = mongoose.model("quiz", schemas2.QuizSchema);
    const question = mongoose.model("question", schemas2.QuestionSchema);

    const course2 = new course({
        name:"Programming on web",
        courseCode:"CSC309",
    });

    const course5 = new course({
        name:"Software engineering II",
        courseCode:"ECE450",
    });

    const course7 = new course({
        name:"History 101",
        courseCode:"Hist101",
    });

    const prof1 = new user({
        username:"Mark",
        first: "Mark",
        last: "Kazakevich",
        userType: "T",
        courses: [course2._id, course5._id, course7._id],
        password: "123456"
    });

    const student1 = new user({
        username:"Michael",
        first: "Michael",
        last: "Smith",
        userType: "S",
        courses: [course2._id, course7._id],
        password: "123456",
    });

    const question1 = new question({
        question: "Where was the battle of Culloden?",
        choices: ["England", "Scottland", "Canada", "USA"],
        correct_index: 1,
    });

    const question2 = new question({
        question: "When was the battle of the Somme?",
        choices: ["1916", "2001", "1943", "1945"],
        correct_index: 0,
    });

    const question3 = new question({
        question: "Who invented the induction motor?",
        choices: ["Nikola Tesla", "Elon Musk", "Thomas Edison", "Bill Gates"],
        correct_index: 0,
    });

    const question4 = new question({
        question: "Who was the 40th president of the US?",
        choices: ["Donald Trump", "Barack Obama", "Ronald Reagan", "Jimmy Carter"],
        correct_index: 2,
    });

    const quiz1 = new quiz({
        title: "Quiz 1 - historical battles",
        course: course7._id,
        questions: [question1, question2]
    });
    
    const quiz2 = new quiz({
        title: "Quiz 2 - famous people",
        course: course7._id,
        questions: [question3, question4]
    });

    var db = mongoose.connection;
    console.log(db);
    db.once('open', () => {

        // clear database before inserting mock data
        console.log("cleaning database");
        course.remove();
        user.remove();
        quiz.remove();
        question.remove();

        course.insertMany([course2, course5, course7], err => {
            if(err){
                log(err)
            } else {
                log("course data inserted successfully...")
            }
        });

        user.insertMany([prof1, student1], err => {
            if(err){
                log(err);
            } else {
                log("prof data inserted successfully...")
            }
        });

        question.insertMany([question1, question2, question3, question4], err => {
            if(err){
                log(err);
            } else {
                log("question data inserted successfully...")
            }
        });

        quiz.insertMany([quiz1, quiz2], err => {
            if(err){
                log(err);
            } else {
                log("quiz data inserted successfully...")
            }
        });

    });
}


module.exports = { createMockData };
