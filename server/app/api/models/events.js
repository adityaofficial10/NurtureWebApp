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
  mentee: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  menteeName: {
    type: String,
  },
  sessions: {
    type: Number,
    required: true,
  },
});

module.exports = EventSchema;
