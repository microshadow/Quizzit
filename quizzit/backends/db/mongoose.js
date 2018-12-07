'use strict';

const mongoose = require('mongoose');

const mongoPort = 27017;
const mongoURILocal = `mongodb://localhost:${mongoPort}/Quizzit`;
const mongoURI = process.env.MONGODB_URI || mongoURILocal;
mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true });

module.exports = {
	mongoose
}
