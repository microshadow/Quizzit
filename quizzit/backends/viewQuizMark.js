const log = console.log;
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongojs = require("mongojs");
const db = mongojs("quizmark", ["quizzes"]);

const app = express();

// view engine middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set static path
app.use(express.static(path.join(__dirname, "gradePieChart")));

let temp = [];
app.get("/quizmark", (req, res) => {
    db.quizzes.find((err,doc) => {
        if(err){
            log(err);
        }else {
            //log(doc);
            doc.forEach(document => {
                temp.push(document.mark);
            });
           // log(temp);
            res.send(temp);
        }
    });
});

app.listen(3000, () => {log("listening on port 3000...")});