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
const { User } = require('./models/user.js');
const { Quiz, UserNotification } = require('./models/quiz');

const port = process.env.QUIZZIT_PORT || 8000;    // Port 3000 is already used by
const app = express();                            // React through npm start.

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

const STUDENT = "S", EDUCATOR = "E", ADMIN = "A";


// For those who want to run the server against React using npm start,
// turn on the Chrome extension Allow-Control-Allow-Origin*.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
    console.log(user);
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

// Set up a POST route to create a student
app.post('/api/quizzes', (req, res) => {
	log(req.body)

	// Create a new student
	const student = new Quiz({
		name: req.body.name,
		year: req.body.year
	})

	// save student to database
	student.save().then((result) => {
		// Save and send object that was saved
		res.send({result})
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})

})

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

app.get("/api/courseEvents/:userId",
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

function packageReportNotification(notification) {
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

  if (user.userType === "S") {
    // Get user's average on quiz, and questions they answered wrong.
    base.extra = {
      grade: 97.57,
      worstQuestions: [
        {
          id: 1,
          display: "Q1",
          text: "Which of the following is an example of a chemical change?",
          weight: 1,
          correct: [1],
          options: [
            {
              id: 1,
              display: "(a)",
              text: "Oil and water separate into layers after mixing."
            },
            {
              id: 2,
              display: "(b)",
              text: "A white powder emerges when two liquids are mixed."
            },
            {
              id: 3,
              display: "(c)",
              text: "Salt dissolves in water when stirred."
            },
            {
              id: 4,
              display: "(d)",
              text: "An electric current heats up metal in a lightbulb."
            }
          ]
        }
      ]
    }
  } else {
    // Get class average and questions with worst performance.
    base.extra = {
      average: 97.57,
      questions: [
        {
          name: "Q5",
          score: 24.31
        },
        {
          name: "Q2",
          score: 41.20
        }, {
          name: "Q3",
          score: 47.84
        }
      ]
    }
  }

  return base;
}

app.get("/api/notifications/:userId",
        passport.authenticate("jwt_all_users", { session: false }),
        (request, response) => {
  const id = request.params.userId;

  UserNotification.find({ "target._id": id }).then((notifications) => {
    const convertToReports = (notification) => {
      return notification.quiz.active
             ? packageEventNotification(notification)
             : packageReportNotification(notification);
    }

    const parsedNotifications = notifications.map(convertToReports);
    console.log(parsedNotifications);

    response.send({ notifications: parsedNotifications });
  })
});

// // serve the React SPA for all other routes
// app.get('/', function (req, res) {
// 	res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
});
