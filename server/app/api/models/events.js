'use strict';
const mongoose = require('mongoose');

// Define a schema

const Schema = mongoose.Schema;

const EventSchema = new Schema({

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  mentor: {
    type: Schema.Types.ObjectId,
    ref: 'mentors',
    required: true,
  },
  mentorName: {
    type: String,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Event', EventSchema);
