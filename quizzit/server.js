'use strict'

const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const path = require('path');

const { prepareToken } = require('./jwtauth.js');
const { mongoose } = require('./db/mongoose');

// Import the models
const { User } = require('./models/user.js');
const { Quiz } = require('./models/quiz');

const port = process.env.QUIZZIT_PORT || 8000;    // Port 3000 is already used by
const app = express();                            // React through npm start.

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));


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

// serve the React SPA for all other routes
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
});
