const log = console.log;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/courses", {useNewUrlParser:true});

// create schema
const courseSchema = new mongoose.Schema({
    name:String,
    courseCode:String,
    instructor:String
});

const profSchema = new mongoose.Schema({
    profId:Number,
    name:String,
    course:String
});

// create model
const course = mongoose.model("course", courseSchema);
const prof = mongoose.model("prof", profSchema);
// const course3 = mongoose.model("course3", courseSchema);

// create document for collection course
const course1 = new course({
    name: "intro to database",
    courseCode: "CSC343",
    instructor: "daniela rosu"
});

const course2 = new course({
    name:"programming on web",
    courseCode:"CSC309",
    instructor:"Mark Kazakevich"
});

const course3 = new course({
    name: "Machine Learning",
    courseCode:"ECE421",
    instructor:"Micheal Stumm"
});

const course4 = new course({
    name:"software engineering I",
    courseCode:"ECE444",
    instructor:"Micheal Stumm"
});

const course5 = new course({
    name:"software engineering II",
    courseCode:"ECE450",
    instructor:"Shokrollah-Timorabadi, Hamid"
});

const course6 = new course({
    name:"computer network",
    courseCode:"ECE361",
    instructor:"Shokrollah-Timorabadi, Hamid"
});

const course7 = new course({
    name:"electronic analog",
    courseCode:"ECE334",
    instructor:"Blinda Wang"
});

const prof1 = new prof({
    profId:1,
    name:"daniela rosu",
    course: "CSC343"
});

const prof2 = new prof({
    profId:2,
    name:"Mark Kazakevich",
    course:"CSC309"
});

const prof3 = new prof({
    profId:3,
    name:"Micheal Stumm",
    course:["ECE421", "ECE444"]
});

const prof4 = new prof({
    profId:4,
    name:"Shokrollah-Timorabadi, Hamid",
    course:["ECE361", "ECE450"]
});

const prof5 = new prof({
    profId:5,
    name:"Blinda Wang",
    course:["ECE110", "ECE231","ECE334"]
});

course.insertMany([course1, course2, course3,course4,course5,course6,course7], err => {
    if(err){
        log(err)
    }else {
        log("course data inserted successfully...")
    }
});

prof.insertMany([prof1, prof2, prof3,prof4, prof5], err => {
    if(err){
        log(err);
    }else {
        log("prof data inserted successfully...")
    }
});
/***/
