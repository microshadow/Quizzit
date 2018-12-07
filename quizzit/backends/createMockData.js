const log = console.log;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/courses", {useNewUrlParser:true});

// create schema
const courseSchema = new mongoose.Schema({
    name:{typ: String, required:true},
    courseCode:{typ: String, required:true},
    instructor:{typ: String, required:true}
});

// create model
const course = mongoose.model("course", courseSchema);
// const course2 = mongoose.model("course2", courseSchema);
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

course.insertMany([course1, course2, course3], err => {
    if(err){
        log(err)
    }else {
        log("data inserted successfully...")
    }
});
