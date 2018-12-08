const schemas = require('./models/user');

const log = console.log;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/courses", {useNewUrlParser:true});

const createMockData = () => {

    // create models
    const course = mongoose.model("course", schemas.courseSchema);
    const prof = mongoose.model("prof", schemas.profSchema);

    // clear database before inserting mock data
    course.remove();
    prof.remove();
    // const course3 = mongoose.model("course3", courseSchema);
   
    const prof1 = new prof({
        name:"Daniela Rosu",
        course: "CSC343"
    });

    const prof2 = new prof({
        name:"Mark Kazakevich",
        course:"CSC309"
    });

    const prof3 = new prof({
        name:"Micheal Stumm",
        course:["ECE421", "ECE444"]
    });

    const prof4 = new prof({
        name:"Shokrollah-Timorabadi, Hamid",
        course:["ECE361", "ECE450"]
    });

    const prof5 = new prof({
        name:"Blinda Wang",
        course:["ECE110", "ECE231","ECE334"]
    });

    const course1 = new course({
        name: "Intro to databases",
        courseCode: "CSC343",
        instructor: prof1._id
    });

    const course2 = new course({
        name:"Programming on web",
        courseCode:"CSC309",
        instructor: prof5._id
    });

    const course3 = new course({
        name: "Machine Learning",
        courseCode:"ECE421",
        instructor:prof5._id
    });

    const course4 = new course({
        name:"Software engineering I",
        courseCode:"ECE444",
        instructor:prof4._id
    });

    const course5 = new course({
        name:"Software engineering II",
        courseCode:"ECE450",
        instructor:prof3._id
    });

    const course6 = new course({
        name:"Computer networks",
        courseCode:"ECE361",
        instructor:prof2._id
    });

    course.insertMany([course1, course2, course3,course4,course5,course6], err => {
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
}


module.exports = { createMockData };
