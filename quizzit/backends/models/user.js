'use strict'
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
const ObjectID = Schema.Types.ObjectId;

const courseSchema = new Schema({
  name: String,
  courseCode: { type: String, required: true },
  instructor: { type: ObjectID, ref: 'User', required: true },
});

const profSchema = new mongoose.Schema({
  profId: Number,
  name: String,
  course: String
});

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  first: { type: String, required: true },
  last: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  courses: [ { type: ObjectID, ref: 'Course' } ]
});

UserSchema.methods.checkPassword = function(password) {
  const user = this;

  return bcrypt.compareSync(password, user.password);
}

UserSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(user.password, salt, (error, hash) => {
        user.password = hash;
        next();
      })
    });
  }
});


const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', courseSchema);

module.exports = { Course, courseSchema, profSchema, User, UserSchema };
