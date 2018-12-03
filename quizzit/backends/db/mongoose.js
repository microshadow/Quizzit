'use strict';

const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:57141/Quizzit';
mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true });

module.exports = {
	mongoose
}
