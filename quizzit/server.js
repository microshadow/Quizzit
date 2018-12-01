/* server.js nov19 - 3pm */
'use strict';
const log = console.log;

const express = require('express')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser') // middleware for parsing HTTP body from client
const { ObjectID } = require('mongodb')
const path = require('path');

// Import our mongoose connection
const { mongoose } = require('./db/mongoose');

// Import the models
const { Quiz } = require('./models/quiz')

// express
const app = express();
// body-parser middleware setup.  Will parse the JSON and convert to object
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

/// Routes go below
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
	log(`Listening on port ${port}...`)
});








