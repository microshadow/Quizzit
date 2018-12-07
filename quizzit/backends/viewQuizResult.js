const log = console.log;
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongojs = require("mongojs");
const db = mongojs("classquiz", ["classquiz1"]);

const app = express();
const { classQuiz1 } = require("./models/quiz");

// view engine middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set static path
app.use(express.static(path.join(__dirname, "public")));

let temp = [];
app.get("/", (req, res) => {
    db.classquiz1.find((err,doc) => {
        if(err){
            log(err);
        }else {
            //log(doc);
            doc.forEach(document => {
                temp.push(document.correctAnswers);
            });
           // log(temp);
            res.send(temp);
        }
    });
});

app.get("/quiz", (req, res) => {
    db.classquiz1.find((err,doc) => {
        if(err){
            log(err);
        }else {
            doc.forEach(document => {
                temp.push(document.correctAnswers);
            });
            res.send(temp);
        }
    });
});

app.listen(3000, () => {log("listening on port 3000...")});