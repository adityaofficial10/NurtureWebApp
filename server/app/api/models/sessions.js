'use strict';
const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

const SessionSchema = new Schema({

  mentor: {
    type: Schema.Types.ObjectId,
    ref: 'mentors',
    required: true,
  },
  mentorName: {
    type: String,
    required: true,
  },
  mentee: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  menteeName: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  link: {
    type: String,
    default: '',
  },
  endTime: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  sessionNumber: {
    type: Schema.Types.Number,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = SessionSchema;
