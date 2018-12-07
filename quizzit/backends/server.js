'use strict'

const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const path = require('path');

const { prepareToken, authorizeUserTypes } = require('./jwtauth.js');
const { mongoose } = require('./db/mongoose');

// Import the models
const { User, Course } = require('./models/user.js');
const { Quiz, Question, QuestionOption,
        Answer, UserNotification } = require('./models/quiz');
const { Foo, Bar } = require('./models/test.js');

const port = process.env.QUIZZIT_PORT || 8000;    // Port 3000 is already used by
const app = express();                            // React through npm start.

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

const STUDENT = "S", EDUCATOR = "E", ADMIN = "A";


// For those who want to run the server against React using npm start,
// turn on the Chrome extension Allow-Control-Allow-Origin*.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  next();
});


// Middleware for creating a new user.
passport.use('register', new LocalStrategy({
  passReqToCallback: true
}, (request, username, password, done) => {
  User.findOne({username: username}, (err, user) => {
    if (err) {
      return done(err);
    }

    if (user) {
      return done(null, false,
                  { message: `Username ${username} is already taken.` });
    }

    const newUser = User({
      username: username,
      first: request.body.firstname,
      last: request.body.lastname,
      password: password,
      userType: request.body.usertype,
    });

    newUser.save().then((result) => {
      return done(null, prepareToken(result))
    }, (error) => {
  		return done(error);
  	});
  });
}));

// Middleware for checking whether a user exists.
passport.use("login", new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (!user) {
      return done(null, false, `No user found with username ${username}.`);
    }

    if (!user.checkPassword(password)) {
      return done(null, false, "Incorrect username or password.");
    }

    done(null, prepareToken(user));
  });
}));

passport.use("jwt_all_users", authorizeUserTypes([STUDENT, EDUCATOR, ADMIN]));
passport.use("jwt_educator_and_above", authorizeUserTypes([EDUCATOR, ADMIN]));
passport.use("jwt_admin_only", authorizeUserTypes([ADMIN]));
passport.use("jwt_educator_only", authorizeUserTypes([EDUCATOR]));
passport.use("jwt_student_only", authorizeUserTypes([STUDENT]));

// Create a new user in the database, passing back a JSON Web Token in the meantime.
app.post("/register",
         passport.authenticate('register', { session: false }),
         (request, response) => {
  response.status(201).send(request.user);
});

// Authenticate a username and password, and generate a JSON Web Token.
app.post("/login",
        passport.authenticate("login", { session: false }),
        (request, response) => {
  response.status(200).send(request.user);
});


// GET all students
app.get('/api/quizzes', (req, res) => {
	Quiz.find().then((students) => {
		res.send({ students }) // put in object in case we want to add other properties
	}, (error) => {
		res.status(400).send(error)
	})
})

// GET student by id
app.get('/api/students/:id', (req, res) => {
	const id = req.params.id // the id is in the req.params object

	// Good practise is to validate the id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	// Otheriwse, findById
	Quiz.findById(id).then((student) => {
		if (!student) {
			res.status(404).send()
		} else {
			res.send({ student })
		}

	}).catch((error) => {
		res.status(400).send(error)
	})
})

// DELETE student route
app.delete('/api/students/:id', (req, res) => {
	const id = req.params.id

	// validate id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Quiz.findByIdAndRemove(id).then((student) => {
		if (!student) {
			res.status(404).send();
		} else {
			res.send({student})
		}
	}).catch((error) => {
		res.status(400).send()
	})
})

// PATCH for changing properties of resources
app.patch('/api/students/:id', (req, res) => {
	const id = req.params.id

	const { name, year } = req.body
	const body = { name, year }

	log(name, year)

	// validate id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	// edit student
	// $new: true gives back newest
	Quiz.findByIdAndUpdate(id, {$set: body}, {new: true}).then((student) => {
		if (!student) {
			res.status(404).send();
		} else {
			res.send({ student })
		}
	}).catch((error) => {
		res.status(400).send();
	})
})

app.post("/api/courses/",
         passport.authenticate("jwt_educator_and_above", { session: false }),
         (request, response) => {
  const courseCode = request.body.course;
  const instructor = request.body.instructor;

  const newEntry = new Course({ courseCode, instructor });
  newEntry.save().then((result) => {
    response.status(201).send(result);
  }).catch((error) => {
    response.status(400).send(error);
  })
})

app.post("/api/courses/:courseId",
         passport.authenticate("jwt_educator_and_above", { session: false }),
         (request, response) => {
  const uid = request.body.studentId;
  const courseId = request.params.courseId;

  Course.findById(courseId).then((course) => {
    if (!course) {
      response.status(404).send({ message: `Course ${courseId} does not exist.` });
    }

    User.findByIdAndUpdate(uid, { $push: { courses: course }},
                           { projection: { courses: 1, first: 1, last: 1, userType: 1 },
                             new: true })
        .then((newStudent) => {
      response.send(newStudent);
    });
  });
});

app.get("/api/courses/:userId",
        passport.authenticate("jwt_all_users", { session: false }),
        (request, response) => {
  const id = request.params.userId;

  User.findById(id).then((user) => {
    if (!user) {
      response.status(404).send({ message: `User ${id} not found.`});
    } else if (!user.courses.length) {
      response.send({ courses: [] });
    }
  });
});

function packageEventNotification(notification) {
  const quiz = notification.quiz;
  const numQuestions = quiz.questions.length;
  const numStudents  = 0;

  return {
    type: "event",
    data: {
      subject: quiz.course.courseCode,
      series: quiz.series,
      title: quiz.title,
      description: quiz.description,
      extra: {
        numQuestions: numQuestions,
        numStudents: numStudents
      }
    }
  };
}

async function packageReportNotification(notification) {
  const quiz = notification.quiz;
  const user = notification.target;

  const base = {
    type: "report",
    data: {
      subject: quiz.course.courseCode,
      series: quiz.series,
      title: quiz.title,
      description: quiz.description
    }
  }

  let query;
  let gradeFunc;
  if (user.userType === 'S') {
    query = { student: user._id, question: { $in: quiz.questions }};
    gradeFunc = gradeInQuiz;
  } else {
    query  = { question: { $in: quiz.questions }};
    gradeFunc = (answers) => quiz.classAverage;
  }

  await Answer.find(query)
              .sort({ score: 1 }).populate('options', { display: 1, text: 1 })
              .then((answers) => {
    const numSelections = min(answers.length, 3);
    const selections = answers.slice(0, numSelections);

    base.extra = {
      grade: gradeFunc(answers),
      worstQuestions: selections
    }
  });

  return base;
}

app.get("/api/notifications/:userId",
        passport.authenticate("jwt_all_users", { session: false }),
        (request, response) => {
  const id = request.params.userId;
  User.findById(id).then((user) => {
    if (!user) {
      return Promise.reject({ message: `User ID ${id} not found.` });
    } else {
      return UserNotification.find({ "target": { $in: user.courses }})
                             .populate({ path: 'quiz', populate: { path: 'course' }});
    }
  }).then((notifications) => {
    const convertToReports = (notification) => {
      return notification.quiz.active
             ? packageEventNotification(notification)
             : packageReportNotification(notification);
    }

    const parsedNotifications = notifications.map(convertToReports);
    response.send({ notifications: parsedNotifications });
  }).catch((error) => {
    console.log(error);
    response.status(400).send(error);
  })
});

app.get('/api/quizzes/:quizId',
        passport.authenticate("jwt_educator_and_above", { session: false }),
        (request, response) => {
  const quizId = request.params.quizId;

  Quiz.findById(quizId).populate('course').then((quiz) => {
    if (!quiz) {
      response.status(404).send({ message: "Quiz not found."});
    }

    // Incomplete. Next steps: populate questions and return.
    response.send(quiz);
  })
});

// Create a new quiz with no questions.
app.post("/api/quizzes/:course",
         passport.authenticate("jwt_educator_and_above", { session: false }),
         (request, response) => {
  const courseId = request.params.course;

  Quiz.findOne({ course: courseId, active: true }).then((match) => {
    if (match) {
      Promise.resolve(response.status(202).send(match));
    } else {
      return Quiz.find({}, { series: 1 }).sort({series: -1}).limit(1);
    }
  }).then((maxSeries) => {
    const newSeries = maxSeries.length ? maxSeries[0] + 1 : 1;
    const body = request.body;

    const quiz = new Quiz({
      course: courseId,
      series: newSeries,
      title: request.body.title,
      weight: request.body.weight,
      description: request.body.description,
      active: true,
      participants: [],
      classAverage: 0
    });

    return quiz.save();
  }).then((quiz) => {
    response.status(201).send(quiz);
  }).catch((error) => {
    console.log(error);
    response.status(400).send(error);
  });
});

app.patch("/api/quizzes/:course",
         passport.authenticate("jwt_educator_and_above", { session: false }),
         (request, response) => {
  const courseId = request.params.course;
  const newTitle = request.body.title;
  const newDescr = request.body.description;

  Quiz.findOneAndUpdate({ course: courseId, active: true },
                        { $set: { title: newTitle, description: newDescr}},
                        { new: true }).then((match) => {
    if (match) {
      response.send(match);
    } else {
      response.status(400).send({ message: "Quiz not found."});
    }
  });
});

app.post("/api/quiz/:quizId",
         passport.authenticate("jwt_educator_and_above", { session: false }),
         (request, response) => {
  const quizId = request.params.quizId;
  const questionMeta = request.body.question;
  const answersMeta  = request.body.answers.map((answer) => {
    return {
      display: answer.display,
      text: answer.text,
      chosenBy: 0
    };
  });

  QuestionOption.create(answersMeta, (error, options) => {
    if (error) {
      console.log(error);
      response.status(400).send(error);
    }

    const optionIds = options.map((option) => option._id);
    const correctIds = questionMeta.correct.map((index) => optionIds[index]);

    const question = new Question({
      display: questionMeta.display,
      text: questionMeta.text,
      weight: questionMeta.weight,
      options: optionIds,
      correct: correctIds,
      classAverage: 0
    });

    return question.save().then((question) => {
      if (!question) {
        response.status(400).send({ message: "Unable to create new question." });
      }

      Quiz.findById(quizId).then((quiz) => {
        if (quiz) {
          quiz.questions.push(question);
          return quiz.save();
        } else {
          return Promise.reject({ message: `Quiz with ID ${quizId} not found.`});
        }
      }).then((quiz) => {
        response.status(201).send(quiz);
      }).catch((error) => {
        console.log(error);
        response.status(400).send(error);
      });
    }).catch((error) => {
      console.log(error);
      response.status(400).send(error);
    });
  });
});

// Returns the question that comes after prevQuestion in quizId.
app.get("/api/quiz/:quizId/:prevQuestion",
        passport.authenticate("jwt_student_only", { session: false }),
        (request, response) => {
  const quizId = request.params.quizId;
  const prevId = request.params.prevQuestion;

  Quiz.findById(quizId).populate({ path: 'questions', populate: { path: 'options'}})
                       .then((quiz) => {
    if (!quiz) {
      return response.status(404).send({ message: `Quiz ${quizId} not found.`});
    }

    let nextQuestionIndex = -1;
    if (prevId === "null") {
      nextQuestionIndex = 0;
    } else {
      for (let i = 0; i < quiz.questions.length; i++) {
        if (quiz.questions[i]._id.toString() === prevId) {
          nextQuestionIndex = i + 1;
        }
      }
    }

    if (nextQuestionIndex === -1) {
      response.status(400).send({ message: `Question ID ${prevId} not found.`});
    } else if (nextQuestionIndex === quiz.questions.length) {
      response.send({ next: null });
    } else {
      const question = quiz.questions[nextQuestionIndex];

      // Remove correct answers from the question incase hackers try to cheat.
      const strippedQuestion = {
        _id: question._id,
        display: question.display,
        text: question.text,
        weight: question.weight,
        options: question.options
      };

      response.send({ next: strippedQuestion });
    }
  }).catch((error) => {
    console.log(error);
    response.status(400).send(error);
  });
});

app.patch("/api/quiz/:quizId/:question",
          passport.authenticate("jwt_educator_and_above", { session: false }),
          (request, response) => {
  const questionId = request.params.question;

  const newDisplay = request.body.display;
  const newText    = request.body.text;
  const newWeight  = request.body.weight;
  const newOptions = request.body.options;
  const newCorrect = request.body.correct;

  Question.findOneAndUpdate({ _id: questionId },
                            { $set: { display: newDisplay, text: newText,
                                      weight: newWeight, options: newOptions }},
                            { new: true }).then((match) => {
    if (!match) {
      return Promise.reject({ message: `Question ID ${questionID} not found.`});
    }

    const newCorrectObj = newCorrect.map((index) => match.options[index]);
    match.correct = newCorrectObj;

    return match.save();
  }).then((question) => {
    response.send(question);
  });
});

// Activate a quiz, and push notifications to all students in the class.
app.post("/api/quiz/:quizId/publish",
         passport.authenticate("jwt_educator_and_above", { session: false }),
         (request, response) => {
  const quizId = request.params.quizId;

  Quiz.findById(quizId).populate({ path: 'questions', populate: { path: 'options' }})
                       .then((quiz) => {
    if (!quiz) {
      return Promise.reject({ message: `Quiz with id ${quizId} not found.`});
    }

    const note = new UserNotification({
      type: "event",
      target: quiz.course,
      quiz: quiz._id
    });

    return note.save().then((notification) => {
      response.status(201).send(quiz);
    });
  }).catch((error) => {
    console.log(error);
    response.status(400).send(error);
  });
});

app.post("/api/quiz/:quizId/:studentId",
         passport.authenticate("jwt_student_only", { session: false }),
         (request, response) => {
  const questionId = request.params.question;
  const stuId  = request.params.studentId;
  const choice = request.body.answer;

  const answer = new Answer({
    student: stuId,
    question: questionId,
    choice: choice,
    score: 0
  });

  answer.save().then((newAnswer) => {
    newAnswer.populate({ path: 'question', populate: { path: 'options'}},
             (error, newerAnswer) => {
      if (error) {
        response.status(404).send({ message: `Failed to save answer.` });
      }

      const question = newerAnswer.question;
      const correctIds = question.correct.map((id) => id.toString());
      const score = correctIds.includes(choice) ? question.weight : 0

      newerAnswer.score = score;
      const isThisAnswer = (opt) => opt._id.toString() === choice;
      const chosen = question.options.filter(isThisAnswer)[0];

      chosen.chosenBy += 1;

      // TODO: Also update number of participants in tne quiz.
      Quiz.findOne({ questions: questionId }).then((quiz) => {
        if (!quiz.participants.includes(stuId)) {
          quiz.participants.push(stuId);
          quiz.save();
        }
      })

      chosen.save();
      newerAnswer.save();

      response.send({
        _id: question.id,
        display: question.display,
        text: question.text,
        weight: question.weight,
        correct: question.correct,
        options: question.options,
        score: score
      });
    });
  }).catch((error) => {
    console.log(error);
    response.status(400).send(error);
  })
})

// End a quiz, and remove all active quiz notifications from the students.
// Replace those notifications with complete event report notifications.
app.delete("/api/quiz/:quizId",
           passport.authenticate("jwt_educator_and_above", { session: false }),
           (request, response) => {
  const quizId = request.params.quizId;

  Quiz.findById(quizId).populate({ path: 'questions', populate: { path: 'options'}})
                       .then((quiz) => {
    quiz.active = false;
    return quiz.save();
  }).then((quiz) => {
    if (!quiz) {
      return Promise.reject({ message: `Quiz ID ${quizId} not found.` });
    }

    let quizTotalPercent = 0;
    const questions = quiz.questions;
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const correctIds = question.correct.map((id) => id.toString());

      let correctAnswers = 0;
      let overallAnswers = 0;
      for (let m = 0; m < question.options.length; m++) {
        const option = question.options[m];
        overallAnswers += option.chosenBy;

        if (correctIds.includes(option._id.toString())) {
          correctAnswers += option.chosenBy;
        }
      }

      const correctPercent = overallAnswers === 0 ? 0 : 100 * correctAnswers / overallAnswers;
      quizTotalPercent += correctPercent;
      question.classAverage = correctPercent;
    }

    quiz.classAverage = questions.length === 0 ? 0 : quizTotalPercent / questions.length;
    quiz.save();

    UserNotification.updateMany({ quiz : quizId },
                                { $set: { type: "report" }}).then((result) => {
      response.send(quiz);
    }).catch((error) => {
      console.log(error);
      response.status(400).send(error);
    });
  }).catch((error) => {
    console.log(error);
    response.status(400).send(error);
  });
});


const gradeInQuiz = (answers) => {
  let score = 0;
  let denominator = 0;
  for (let i = 0; i < answers.length; i++) {
    score += answers[i].score;
    denominator += answers[i].question.weight;
  }

  const grade = denominator === 0 ? 0 : 100 * score / denominator;
  return grade;
}


app.get("/api/performance/quiz/:studentId/:quizId/",
        passport.authenticate("jwt_all_users", { session: false }),
        (request, response) => {
  const uid = request.params.studentId;
  const quizId = request.params.quizId;

  Quiz.findById(quizId).populate({ path: 'questions', populate: { path: 'options'}})
                       .populate({ path: 'course'}).then((quiz) => {
    if (!quiz) {
      response.status(404).send({ message: `No quiz found with ID ${quizId}.` });
    } else if (quiz.active) {
      response.status(400).send({ message: `Cannot get performance for an active quiz.` })
    }

    const questions = quiz.questions;
    const questionIds = questions.map((question) => question._id);

    Answer.find({ student: uid, question: { $in: questionIds }},
                { question: 1, choice: 1, score: 1 })
                .populate('question').populate('choice')
                .then((answers) => {
      if (!answers) {
        response.status(404).send({});
      }

      const grade = gradeInQuiz(answers);

      const report = {
        quiz: quiz,
        performance: {
          answers: answers,
          grade: grade,
          classAverage: quiz.classAverage
        }
      };

      response.send(report);
    }).catch((error) => {
      console.log(error);
      response.status(400).send(error);
    });
  }).catch((error) => {
    console.log(error);
    response.status(400).send(error);
  });
})

app.get("/api/performance/subject/:studentId/:course/",
        passport.authenticate("jwt_all_users", { session: false }),
        (request, response) => {
  const uid = request.params.studentId;
  const courseId = request.params.course;

  Quiz.find({ course: courseId }, { display: 1, text: 1, weight: 1, correct: 1})
      .populate({ path: 'questions', populate: { path: 'options'}})
      .populate({ path: 'course'}).then(async function(quizzes) {
    if (!quizzes) {
      response.status(404).send({ message: `No quiz found with ID ${quizId}.` });
    }

    const history = [];
    let courseMark = 0;
    let denominator = 0;

    for (let i = 0; i < quizzes.length; i++) {
      const quiz = quizzes[i];
      if (quizzes.active) {
        continue;
      }

      const questions = quiz.questions;
      const questionIds = questions.map((question) => question._id);

      await Answer.find({ student: uid, question: { $in: questionIds }},
                  { question: 1, choice: 1, score: 1 })
                  .populate('question').populate('choice')
                  .then((answers) => {
        if (!answers) {
          response.status(404).send({});
        }

        const grade = gradeInQuiz(answers);
        history.push({
          _id: quiz._id,
          series: quiz.series,
          title: quiz.title,
          grade: grade,
          classAverage: quiz.classAverage
        });

        courseMark += grade * quiz.weight / 100;
        denominator += quiz.weight;
      }).catch((error) => {
        console.log(error);
        response.status(400).send(error);
      });
    }

    User.findById(uid, { first: 1, last: 1, username: 1 }).then((student) => {
      const courseAvg = denominator === 0 ? 0 : 100 * courseMark / denominator;

      response.send({
        student: student,
        performance: {
          average: courseAvg,
          history: history
        }
      });
    })
  }).catch((error) => {
    console.log(error);
    response.status(400).send(error);
  });
})


async function enrolment(course) {
  return User.find({ userType: 'S', courses: course })
}


app.get("/api/performance/quiz/:quizId/",
        passport.authenticate("jwt_educator_and_above", { session: false }),
        (request, response) => {
  const quizId = request.params.quizId;

  Quiz.findById(quizId).populate({ path: 'questions', populate: { path: 'options'}})
                       .populate({ path: 'course'})
                       .populate({ path: 'participants',
                                   select: { first: 1, last: 1, username: 1 }})
                       .then((quiz) => {
    if (!quiz) {
      response.status(404).send({ message: `No quiz found with ID ${quizId}.` });
    } else if (quiz.active) {
      response.status(400).send({ message: `Cannot get performance for an active quiz.` })
    }

    const questions = quiz.questions;
    const questionIds = questions.map((question) => question._id);

    const attendees = quiz.participants;
    const attendance = attendees.length;

    User.find({ userType: 'S', courses: quiz.course._id },
              { username: 1, first: 1, last: 1 })
        .then(async function(enrolled) {
      const enrolment = enrolled.length;
      const performance = [];
      let courseGrades = 0;

      for (let i = 0; i < enrolment; i++) {
        const student = enrolled[i];
        await Answer.find({ student: student, question: { $in: questionIds }},
                    { question: 1, choice: 1, score: 1 })
                    .populate('question').populate('choice')
                    .then((answers) => {

          const grade = answers ? gradeInQuiz(answers) : 0;
          performance.push({
            student: student,
            grade: grade,
            answers: answers.length ? answers : null
          });

          courseGrades += grade;
        }).catch((error) => {
          console.log(error);
          response.status(400).send(error);
        });
      }

      const classAverage = courseGrades / enrolment;
      const attendanceRate = 100 * attendance / enrolment;

      response.send({
        quiz: {
          _id: quiz._id,
          subject: quiz.course,
          series: quiz.series,
          title: quiz.title,
          description: quiz.description,
          questions: quiz.questions
        },
        stats: {
          average: classAverage,
          attendance: attendanceRate,
          performance: performance
        }
      });
    }).catch((error) => {
      console.log(error);
      response.status(400).send(error);
    });
  }).catch((error) => {
    console.log(error);
    response.status(400).send(error);
  });
})


// // serve the React SPA for all other routes
// app.get('/', function (req, res) {
// 	res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
});
